/**
 * Curries a function, transforming it into a sequence of unary functions.
 * Collects arguments one by one until `arity` is reached, then invokes `fn`.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} fn Function to curry
 * @param {number} [arity=fn.length] Number of arguments to collect before invoking
 * @returns {((arg: Parameters<T>[0]) => ReturnType<T> | any) & ((...args: Parameters<T>) => ReturnType<T>)}
 * @throws {TypeError} getCurryFn: fn must be a function
 * @throws {TypeError} getCurryFn: arity must be a non-negative integer
 *
 * @example
 * function sum(a: number, b: number) { return a + b; }
 * const curried = getCurryFn(sum);
 * curried(1)(2); // 3
 */
export const getCurryFn = <T extends (...args: any[]) => any>(
  fn: T,
  arity: number = fn.length
): ((arg: Parameters<T>[0]) => ReturnType<T> | any) & ((...args: Parameters<T>) => ReturnType<T>) => {
  if (typeof fn !== "function") {
    throw new TypeError("getCurryFn: fn must be a function");
  }
  if (typeof arity !== "number" || !Number.isFinite(arity) || arity < 0 || Math.floor(arity) !== arity) {
    throw new TypeError("getCurryFn: arity must be a non-negative integer");
  }

  type TArg = Parameters<T>[number];

  const nextCurry = (prev: TArg[]): any => {
    return function curried(nextArg: TArg): any {
      const args = [ ...prev, nextArg ] as unknown as Parameters<T>;
      if (args.length >= arity) {
        return fn(...args);
      }
      return nextCurry(args as unknown as TArg[]);
    };
  };

  const entry = (...args: Parameters<T>): ReturnType<T> | any => {
    if (args.length >= arity) {
      return fn(...(args as Parameters<T>));
    }
    return nextCurry(args as unknown as TArg[]);
  };

  return entry as any;
};
