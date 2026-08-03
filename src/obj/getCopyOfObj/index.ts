export type TGetCopyOfObjArgs = Parameters<typeof getCopyOfObj>;

export type TGetCopyOfObjReturn = ReturnType<typeof getCopyOfObj>;

/**
 * Gets a deep copy/clone of an object/array without a reference to the original object.
 * Supports common built-ins including dates, URLs, collections, and binary views.
 * @param obj{Object|Array} source object (array)
 * @returns {Object|Array}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
 * @example
 * // How to make a deep clone of an object?
 * const originalObject = {
 *   value: 1,
 * }
 * const copy = getCopyOfObj(originalObject);
 * copy.value = 2;
 * console.log(originalObject.value === copy.value) // false
 * @example
 * // Create an editable form draft without mutating the saved profile
 * const profileDraft = getCopyOfObj(savedProfile);
 * profileDraft.contacts.email = "new@example.com";
 */
export const getCopyOfObj = <T>(obj: T): T => {
  const clone = (value: unknown, visited: WeakMap<object, unknown>): unknown => {
    if (value === null || typeof value !== "object") {
      return value;
    }
    if (visited.has(value)) {
      return visited.get(value);
    }
    if (value instanceof Date) {
      const result = new Date(value.getTime());
      visited.set(value, result);
      return result;
    }
    if (value instanceof RegExp) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const result = new RegExp(value.source, value.flags);
      result.lastIndex = value.lastIndex;
      visited.set(value, result);
      return result;
    }
    if (value instanceof URL) {
      const result = new URL(value.href);
      visited.set(value, result);
      return result;
    }
    if (value instanceof URLSearchParams) {
      const result = new URLSearchParams(value);
      visited.set(value, result);
      return result;
    }
    if (value instanceof Map) {
      const result = new Map<unknown, unknown>();
      visited.set(value, result);
      value.forEach((mapValue, key) => {
        result.set(clone(key, visited), clone(mapValue, visited));
      });
      return result;
    }
    if (value instanceof Set) {
      const result = new Set<unknown>();
      visited.set(value, result);
      value.forEach((setValue) => {
        result.add(clone(setValue, visited));
      });
      return result;
    }
    if (value instanceof ArrayBuffer) {
      const result = value.slice(0);
      visited.set(value, result);
      return result;
    }
    if (ArrayBuffer.isView(value)) {
      const result = value instanceof DataView
        ? new DataView(value.buffer.slice(0), value.byteOffset, value.byteLength)
        : new (value.constructor as new (source: ArrayLike<number>) => ArrayBufferView)(value as unknown as ArrayLike<number>);
      visited.set(value, result);
      return result;
    }

    const result: Record<PropertyKey, unknown> = Array.isArray(value)
      ? []
      : Object.create(Object.getPrototypeOf(value));
    visited.set(value, result);
    Reflect.ownKeys(value).forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor) {
        return;
      }
      if ("value" in descriptor) {
        descriptor.value = clone(descriptor.value, visited);
      }
      Object.defineProperty(result, key, descriptor);
    });
    return result;
  };

  return clone(obj, new WeakMap<object, unknown>()) as T;
};
