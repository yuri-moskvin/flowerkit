export type TStorageController<TSchema extends Record<string, unknown>> = {
    clear: () => boolean;
    get: <TKey extends Extract<keyof TSchema, string>>(key: TKey, fallback?: TSchema[TKey]) => TSchema[TKey] | undefined;
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
export declare const createStorage: <TSchema extends Record<string, unknown> = Record<string, unknown>>(options?: {
    namespace?: string;
    onError?: (error: unknown) => void;
    storage?: Storage | null;
}) => TStorageController<TSchema>;
