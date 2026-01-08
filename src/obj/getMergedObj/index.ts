import { isObjHasOwnProp } from "../isObjHasOwnProp/index.ts";

export type TGetMergedObjArgs = Parameters<typeof getMergedObj>;

export type TGetMergedObjReturn = ReturnType<typeof getMergedObj>;

/**
 * Gets one deeply merged object from two objects
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

  const deepClone = (val: any, visited = new Map()): any => {
    if (val && typeof val === "object") {
      if (visited.has(val)) {
        return visited.get(val);
      }

      if (Array.isArray(val)) {
        visited.set(val, []);
        const result = val.map((item) => deepClone(item, visited));
        visited.set(val, result);
        return result;
      }

      if (isPlainObject(val)) {
        visited.set(val, {});
        const result = Object.fromEntries(
          Object.entries(val).map(([ k, v ]) => [ k, deepClone(v, visited) ])
        );
        visited.set(val, result);
        return result;
      }

      if (val instanceof Date) {
        return new Date(val);
      }
      if (val instanceof Map) {
        const result = new Map();
        visited.set(val, result);
        val.forEach((v, k) => result.set(k, deepClone(v, visited)));
        return result;
      }
      if (val instanceof Set) {
        const result = new Set();
        visited.set(val, result);
        val.forEach((v) => result.add(deepClone(v, visited)));
        return result;
      }

      return val;
    }

    return val;
  };

  const mergeArrays = (a: any[], b: any[]): any[] => {
    switch (settings.arrayStrategy) {
      case "target": return deepClone(a);
      case "replace": return deepClone(b);
      case "unique": {
        const seen = new Set<any>();
        const out: any[] = [];

        const addToOut = (item: any) => {
          const cloned = deepClone(item);
          const key = typeof cloned === "object" && cloned !== null
            ? JSON.stringify(cloned)
            : cloned;
          if (!seen.has(key)) {
            seen.add(key);
            out.push(cloned);
          }
        };

        a.forEach(addToOut);
        b.forEach(addToOut);
        return out;
      }
      case "concat":
      default:
        return [ ...deepClone(a), ...deepClone(b) ];
    }
  };

  const merge = (t: any, s: any, visited = new Map()): any => {
    if (t && typeof t === "object" && s && typeof s === "object") {
      if (visited.has(t) && visited.get(t) === s) {
        return visited.get(t);
      }
      visited.set(t, s);
    }

    if (Array.isArray(t) && Array.isArray(s)) {
      return mergeArrays(t, s);
    }

    if (!isPlainObject(t) || !isPlainObject(s)) {
      return deepClone(s);
    }

    const out: Record<string, any> = deepClone(t);

    for (const k in s) {
      if (isObjHasOwnProp(s, k)) {
        const tv = out[k];
        const sv = s[k];

        if (Array.isArray(tv) && Array.isArray(sv)) {
          out[k] = mergeArrays(tv, sv);
        } else if (isPlainObject(tv) && isPlainObject(sv)) {
          out[k] = merge(tv, sv, visited);
        } else {
          out[k] = deepClone(sv);
        }
      }
    }

    const sourceSymbols = Object.getOwnPropertySymbols(s);
    for (const sym of sourceSymbols) {
      const tv = out[sym as any];
      const sv = s[sym as any];

      if (Array.isArray(tv) && Array.isArray(sv)) {
        out[sym as any] = mergeArrays(tv, sv);
      } else if (isPlainObject(tv) && isPlainObject(sv)) {
        out[sym as any] = merge(tv, sv, visited);
      } else {
        out[sym as any] = deepClone(sv);
      }
    }

    return out;
  };

  return merge(target, source);
};
