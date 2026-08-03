export type TGetMergedObjArgs = Parameters<typeof getMergedObj>;

export type TGetMergedObjReturn = ReturnType<typeof getMergedObj>;

/**
 * Gets one deeply merged object from two objects while preserving circular references.
 * @template TTarget,TSource
 * @param {TTarget} [target={}] Target object (cloned internally)
 * @param {TSource} [source={}] Source object
 * @param {{ isMergeArrays?: boolean; arrayStrategy?: "concat" | "target" | "replace" | "unique"; }} [options={}] Merge options
 * @param {boolean} [options.isMergeArrays=true] Concat nested arrays or keep target arrays (deprecated; use arrayStrategy)
 * @param {"concat"|"target"|"replace"|"unique"} [options.arrayStrategy="concat"] Array merge strategy
 * @returns {TTarget & TSource} Deeply merged object
 * @example
 * // How to deeply merge two objects?
 * const targetObj = { first: [ "foo" ] };
 * const sourceObj = { first: [ "moo" ], boo: 12 };
 * getMergedObj(targetObj, sourceObj) // => { first: [ "foo", "moo" ], boo: 12 }
 * @example
 * // Merge user preferences with defaults and replace inherited arrays
 * const settings = getMergedObj(defaultSettings, userSettings, {
 *   arrayStrategy: "replace",
 * });
 */
export const getMergedObj = <
  TTarget extends Record<string, any> = Record<string, any>,
  TSource extends Record<string, any> = Record<string, any>
>(
  target: TTarget = {} as TTarget,
  source: TSource = {} as TSource,
  options: { isMergeArrays?: boolean; arrayStrategy?: "concat" | "target" | "replace" | "unique"; } = {}
): TTarget & TSource => {

  const settings = {
    arrayStrategy: "concat" as const,
    ...options,
  };

  if (options?.isMergeArrays !== undefined) {
    settings.arrayStrategy = options.isMergeArrays ? "concat" : "target";
  }

  const isPlainObject = (obj: unknown): obj is Record<string, unknown> => {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    const proto = Object.getPrototypeOf(obj);
    return (proto === Object.prototype || proto === null) && !Array.isArray(obj);
  };

  const deepClone = (val: any, visited: WeakMap<object, any>): any => {
    if (val && typeof val === "object") {
      if (visited.has(val)) {
        return visited.get(val);
      }

      if (val instanceof Date) {
        const result = new Date(val);
        visited.set(val, result);
        return result;
      }
      if (val instanceof RegExp) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        const result = new RegExp(val.source, val.flags);
        result.lastIndex = val.lastIndex;
        visited.set(val, result);
        return result;
      }
      if (val instanceof Map) {
        const result = new Map();
        visited.set(val, result);
        val.forEach((v, k) => result.set(deepClone(k, visited), deepClone(v, visited)));
        return result;
      }
      if (val instanceof Set) {
        const result = new Set();
        visited.set(val, result);
        val.forEach((v) => result.add(deepClone(v, visited)));
        return result;
      }
      if (val instanceof ArrayBuffer) {
        const result = val.slice(0);
        visited.set(val, result);
        return result;
      }
      if (ArrayBuffer.isView(val)) {
        const result = val instanceof DataView
          ? new DataView(val.buffer.slice(0), val.byteOffset, val.byteLength)
          : new (val.constructor as new (source: ArrayLike<number>) => ArrayBufferView)(
            val as unknown as ArrayLike<number>
          );
        visited.set(val, result);
        return result;
      }
      if (Array.isArray(val) || isPlainObject(val)) {
        const result: Record<PropertyKey, unknown> | any[] = Array.isArray(val)
          ? []
          : Object.create(Object.getPrototypeOf(val));
        visited.set(val, result);
        Reflect.ownKeys(val).forEach((key) => {
          const descriptor = Object.getOwnPropertyDescriptor(val, key);
          if (!descriptor) {
            return;
          }
          if ("value" in descriptor) {
            descriptor.value = deepClone(descriptor.value, visited);
          }
          Object.defineProperty(result, key, descriptor);
        });
        return result;
      }

      return val;
    }

    return val;
  };

  const mergeArrays = (
    a: any[],
    b: any[],
    targetClones: WeakMap<object, any>,
    sourceClones: WeakMap<object, any>
  ): any[] => {
    switch (settings.arrayStrategy) {
      case "target": return deepClone(a, targetClones);
      case "replace": return deepClone(b, sourceClones);
      case "unique": {
        if (sourceClones.has(b)) {
          return sourceClones.get(b);
        }
        const targetItems = deepClone(a, targetClones) as any[];
        const out = targetItems;
        sourceClones.set(b, out);
        const seen = new Set<any>();
        const items = [ ...out ];
        out.length = 0;

        const addToOut = (item: any, clones: WeakMap<object, any>) => {
          const cloned = deepClone(item, clones);
          const key = typeof cloned === "object" && cloned !== null
            ? JSON.stringify(cloned)
            : cloned;
          if (!seen.has(key)) {
            seen.add(key);
            out.push(cloned);
          }
        };

        items.forEach((item) => addToOut(item, targetClones));
        b.forEach((item) => addToOut(item, sourceClones));
        return out;
      }
      case "concat": {
        if (sourceClones.has(b)) {
          return sourceClones.get(b);
        }
        const out = deepClone(a, targetClones) as any[];
        sourceClones.set(b, out);
        b.forEach((item) => out.push(deepClone(item, sourceClones)));
        return out;
      }
      default: return deepClone(b, sourceClones);
    }
  };

  const merge = (
    t: any,
    s: any,
    targetClones: WeakMap<object, any>,
    sourceClones: WeakMap<object, any>
  ): any => {
    if (Array.isArray(t) && Array.isArray(s)) {
      return mergeArrays(t, s, targetClones, sourceClones);
    }

    if (!isPlainObject(t) || !isPlainObject(s)) {
      return deepClone(s, sourceClones);
    }

    if (sourceClones.has(s)) {
      return sourceClones.get(s);
    }

    const out = deepClone(t, targetClones) as Record<PropertyKey, any>;
    sourceClones.set(s, out);

    Reflect.ownKeys(s).forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(s, key);
      if (!descriptor?.enumerable) {
        return;
      }
      if (!("value" in descriptor)) {
        Object.defineProperty(out, key, descriptor);
        return;
      }

      const tv = (t as Record<PropertyKey, any>)[key];
      const sv = descriptor.value;
      if (Array.isArray(tv) && Array.isArray(sv)) {
        descriptor.value = mergeArrays(tv, sv, targetClones, sourceClones);
      } else if (isPlainObject(tv) && isPlainObject(sv)) {
        descriptor.value = merge(tv, sv, targetClones, sourceClones);
      } else {
        descriptor.value = deepClone(sv, sourceClones);
      }
      Object.defineProperty(out, key, descriptor);
    });

    return out;
  };

  return merge(target, source, new WeakMap(), new WeakMap());
};
