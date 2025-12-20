Object.defineProperty(exports,"__esModule",{value:true});
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
 */const getCurryFn=(fn,arity=fn.length)=>{if(typeof fn!=="function")throw new TypeError("getCurryFn: fn must be a function");if(typeof arity!=="number"||!Number.isFinite(arity)||arity<0||Math.floor(arity)!==arity)throw new TypeError("getCurryFn: arity must be a non-negative integer");const nextCurry=prev=>function curried(nextArg){const args=[...prev,nextArg];if(args.length>=arity)return fn(...args);return nextCurry(args)};const entry=(...args)=>{if(args.length>=arity)return fn(...args);return nextCurry(args)};return entry};exports.getCurryFn=getCurryFn;
//# sourceMappingURL=index.cjs.map
