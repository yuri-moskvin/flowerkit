/**
 * Gets one deeply merged object from two objects
 * @param target{Object=} - target object
 * @param source{Object=} - source object
 * @return {Object}
 * @example
 * // How to deeply merge two objects?
 * const targetObj = {
 *   first: [ "foo" ],
 * }
 * const sourceObj = {
 *   first: [ "moo" ],
 *   boo: 12
 * }
 * getMergedObj(targetObj, sourceObj) // => { first: [ "foo", "moo" ], boo: 12 }
 */
export function getMergedObj(target?: any | undefined, source?: any | undefined): any;
//# sourceMappingURL=index.d.ts.map