/**
 * Gets a function that is executed no more than once in a specified period of time
 * @param cb{Function} - source function
 * @param wait{Number=} - interval of execution
 * @param isImmediate{Boolean=} - immediate execution
 * @return {function}
 * @example
 * // How to execute function no more than once per second?
 * const fn = getDebouncedFn(alert, 1000);
 *
 * fn(1); // calls immediately
 * fn(2); // ignored
 *
 * setTimeout(() => fn(3), 100); // ignored
 * setTimeout(() => fn(4), 1100); // calls
 * setTimeout(() => fn(5), 1500); // ignored
 */
export function getDebouncedFn(cb: Function, wait?: number | undefined, isImmediate?: boolean | undefined): Function;
//# sourceMappingURL=index.d.ts.map