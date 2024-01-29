/**
 * Evaluating functions with multiple arguments and decomposing them into a sequence of functions with a specific number of arguments
 * @param fn{Function} - source function
 * @param arity{Number=} - arity of function
 * @return {Function}
 * @example
 * // How to curry a function?
 *
 * function getSum(a, b) {
 *   return a + b;
 * }
 *
 * const getCurriedSum = getCurryFn(getSum);
 * curriedSum(1)(2) // 3
 */
export function getCurryFn(fn: Function, arity?: number | undefined): Function;
//# sourceMappingURL=index.d.ts.map