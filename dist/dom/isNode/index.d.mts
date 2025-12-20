/**
 * Checks whether the specified object is a DOM element
 * @param el{any} source object
 * @returns {boolean}
 * @example
 * // How to check if an object is dom node?
 * const isMyElNode = isNode(document.getElementById("test"));
 * console.log(isMyElNode) // => boolean
 */
export declare const isNode: (el: any) => boolean;
