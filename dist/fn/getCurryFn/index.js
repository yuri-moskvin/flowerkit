import ow from"ow";
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
 */const getCurryFn=(fn,arity=fn.length)=>{ow(fn,ow.function);ow(arity,ow.number);return function nextCurry(previousArguments){return function curried(nextArgument){const args=[...previousArguments,nextArgument];if(args.length>=arity)return fn(...args);else return nextCurry(args)}}([])};export{getCurryFn};
//# sourceMappingURL=index.js.map
