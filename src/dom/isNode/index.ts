export type TIsNodeArgs = Parameters<typeof isNode>;

export type TIsNodeReturn = ReturnType<typeof isNode>;

/**
 * Checks whether the specified object is a DOM element
 * @param el{any} source object
 * @returns {boolean}
 * @example
 * // How to check if an object is dom node?
 * const isMyElNode = isNode(document.getElementById("test"));
 * console.log(isMyElNode) // => boolean
 * @example
 * // Guard an event target before using DOM Node methods
 * if (isNode(event.target) && container.contains(event.target)) {
 *   console.log("The event came from inside the container");
 * }
 */
export const isNode = (el: any): boolean => {
  if (typeof Element === "undefined" || typeof Document === "undefined") {
    return el !== null && typeof el === "object" && el.nodeType === 1 && typeof el.style === "object" && typeof el.ownerDocument === "object";
  } else {
    return el instanceof Element || el instanceof Document;
  }
};
