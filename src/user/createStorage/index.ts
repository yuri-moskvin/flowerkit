import { getStorage } from "../getStorage/index.ts";

export type TStorageController<TSchema extends Record<string, unknown>> = {
  clear: () => boolean;
  get: <TKey extends Extract<keyof TSchema, string>>(
    key: TKey,
    fallback?: TSchema[TKey]
  ) => TSchema[TKey] | undefined;
  has: (key: Extract<keyof TSchema, string>) => boolean;
  remove: (key: Extract<keyof TSchema, string>) => boolean;
  set: <TKey extends Extract<keyof TSchema, string>>(key: TKey, value: TSchema[TKey]) => boolean;
};

export type TCreateStorageArgs = Parameters<typeof createStorage>;

export type TCreateStorageReturn = ReturnType<typeof createStorage>;

/**
 * Creates a typed, JSON-backed and SSR-safe storage namespace.
 * Operations return fallbacks or `false` when storage is unavailable.
 * @template TSchema
 * @param {{ namespace?: string; storage?: Storage|null; onError?: (error: unknown) => void; }} [options={}] Options; namespace defaults to "flowerkit"
 * @returns {TStorageController<TSchema>} Storage controller
 * @throws {TypeError} createStorage: options are invalid
 * @example
 * const settings = createStorage<{ theme: "light"|"dark" }>({ namespace: "app" });
 * settings.set("theme", "dark");
 * @example
 * // Persist a typed shopping cart and restore it with a fallback
 * const cartStorage = createStorage<{ items: Array<{ id: string; quantity: number; }> }>({
 *   namespace: "shop",
 * });
 * cartStorage.set("items", cartItems);
 * const savedItems = cartStorage.get("items", []);
 */
export const createStorage = <TSchema extends Record<string, unknown> = Record<string, unknown>>(
  options: {
    namespace?: string;
    onError?: (error: unknown) => void;
    storage?: Storage | null;
  } = {}
): TStorageController<TSchema> => {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("createStorage: options must be a plain object");
  }
  const {
    namespace = "flowerkit",
    onError,
    storage = getStorage(),
  } = options;
  if (typeof namespace !== "string" || namespace.trim().length === 0) {
    throw new TypeError("createStorage: namespace must be a non-empty string");
  }
  if (onError !== undefined && typeof onError !== "function") {
    throw new TypeError("createStorage: onError must be a function if provided");
  }
  const prefix = `${namespace}:`;
  const getKey = (key: string): string => `${prefix}${key}`;
  const fail = (error: unknown): false => {
    onError?.(error);
    return false;
  };

  return {
    clear: (): boolean => {
      if (!storage) {
        return false;
      }
      try {
        const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index))
          .filter((key): key is string => Boolean(key?.startsWith(prefix)));
        keys.forEach((key) => storage.removeItem(key));
        return true;
      } catch (error) {
        return fail(error);
      }
    },
    get: (key, fallback) => {
      if (!storage) {
        return fallback;
      }
      try {
        const value = storage.getItem(getKey(key));
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        fail(error);
        return fallback;
      }
    },
    has: (key): boolean => {
      if (!storage) {
        return false;
      }
      try {
        return storage.getItem(getKey(key)) !== null;
      } catch (error) {
        return fail(error);
      }
    },
    remove: (key): boolean => {
      if (!storage) {
        return false;
      }
      try {
        storage.removeItem(getKey(key));
        return true;
      } catch (error) {
        return fail(error);
      }
    },
    set: (key, value): boolean => {
      if (!storage) {
        return false;
      }
      try {
        const serialized = JSON.stringify(value);
        if (serialized === undefined) {
          throw new TypeError("createStorage: value must be JSON-serializable");
        }
        storage.setItem(getKey(key), serialized);
        return true;
      } catch (error) {
        return fail(error);
      }
    },
  };
};
