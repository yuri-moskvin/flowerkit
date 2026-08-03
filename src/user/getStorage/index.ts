export type TStorageType = "local" | "session";

export type TGetStorageArgs = Parameters<typeof getStorage>;

export type TGetStorageReturn = ReturnType<typeof getStorage>;

/**
 * Safely gets browser local or session storage.
 * Returns `null` during SSR or when storage access is blocked.
 * @param {TStorageType} [type="local"] Storage type
 * @returns {Storage|null} Browser storage when available
 * @throws {TypeError} getStorage: type must be "local" or "session"
 * @example
 * const storage = getStorage("session");
 * @example
 * // Read a saved preference only when localStorage is available
 * const storage = getStorage();
 * const theme = storage?.getItem("theme") ?? "system";
 */
export const getStorage = (type: TStorageType = "local"): Storage | null => {
  if (type !== "local" && type !== "session") {
    throw new TypeError('getStorage: type must be "local" or "session"');
  }
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    const key = `__flowerkit_storage_test__${Date.now()}`;
    storage.setItem(key, key);
    storage.removeItem(key);
    return storage;
  } catch {
    return null;
  }
};
