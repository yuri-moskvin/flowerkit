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
export declare const getMergedObj: <TTarget extends Record<string, any> = Record<string, any>, TSource extends Record<string, any> = Record<string, any>>(target?: TTarget, source?: TSource, options?: {
    isMergeArrays?: boolean;
    arrayStrategy?: "concat" | "target" | "replace" | "unique";
}) => TTarget & TSource;
