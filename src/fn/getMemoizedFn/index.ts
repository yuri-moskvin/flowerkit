type TCacheNode = {
  children: Map<unknown, TCacheNode>;
  hasValue: boolean;
  value?: unknown;
};

export type TMemoizedFn<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T>) & {
  clear: () => void;
};

export type TGetMemoizedFnArgs = Parameters<typeof getMemoizedFn>;

export type TGetMemoizedFnReturn = ReturnType<typeof getMemoizedFn>;

const getCacheNode = (): TCacheNode => ({
  children: new Map(),
  hasValue: false,
});

/**
 * Memoizes a function by receiver and argument identity and exposes a cache reset method.
 * @template T
 * @param {T} fn Source function
 * @returns {TMemoizedFn<T>} Memoized function
 * @throws {TypeError} getMemoizedFn: fn must be a function
 * @example
 * const doubled = getMemoizedFn((value: number) => value * 2);
 * doubled(2); // 4
 * doubled.clear();
 * @example
 * // Cache an expensive product filter until its argument identities change
 * const filterProducts = getMemoizedFn((items, filters) => {
 *   return items.filter((item) => filters.includes(item.category));
 * });
 */
export const getMemoizedFn = <T extends (...args: any[]) => any>(fn: T): TMemoizedFn<T> => {
  if (typeof fn !== "function") {
    throw new TypeError("getMemoizedFn: fn must be a function");
  }

  let root = getCacheNode();
  const memoized = function memoizedFunction(
    this: unknown,
    ...args: Parameters<T>
  ): ReturnType<T> {
    let node = root;
    [ this, ...args ].forEach((cacheKey) => {
      let child = node.children.get(cacheKey);
      if (!child) {
        child = getCacheNode();
        node.children.set(cacheKey, child);
      }
      node = child;
    });
    if (!node.hasValue) {
      node.value = fn.apply(this, args);
      node.hasValue = true;
    }
    return node.value as ReturnType<T>;
  } as TMemoizedFn<T>;

  memoized.clear = (): void => {
    root = getCacheNode();
  };
  return memoized;
};
