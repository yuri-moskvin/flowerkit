import ow from "ow";
import { isIterable } from "../isIterable/index.js";

/**
 * Gets last element of iterable object such as Array, NodeList, HTMLCollection, etc.
 * @param obj{*}
 * @return {*|null}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @example
 * // How to get last element from NodeList of `div`?
 * const lastDiv = getLastFromIterable(document.querySelectorAll("div"));
 * console.log(lastDiv) // => Node or null
 */
const getLastFromIterable = (obj) => {

  ow(obj, ow.object.validate(value => ({
    validator: isIterable(value),
    message: () => `The object must be iterable`
  })));

  const { length } = obj;
  return length ? obj[length - 1] : null;

};

export {
  getLastFromIterable,
};
