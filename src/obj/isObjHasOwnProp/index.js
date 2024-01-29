import ow from "ow";

/**
 * Checks if object has own property
 * @param obj{Object} - source object
 * @param prop{String} - property name
 * @see https://eslint.org/docs/latest/rules/no-prototype-builtins
 * @return {boolean}
 * @example
 * // How to check if object has property without calling method directly?
 * const obj = {
 *   foo: "bar"
 * };
 * const isHasOwnProp = isObjHasOwnProp(obj, "foo");
 * console.log(isHasOwnProp); // => true
 */
const isObjHasOwnProp = (obj, prop) => {

  ow(obj, ow.object);
  ow(prop, ow.string);

  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export {
  isObjHasOwnProp,
};
