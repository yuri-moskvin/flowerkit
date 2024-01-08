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
const getMergedObj = (target = {}, source = {}) => {

  target = ((obj) => {
    let cloneObj;
    try {
      cloneObj = JSON.parse(JSON.stringify(obj));
    } catch (err) {
      cloneObj = Object.assign({}, obj);
    }
    return cloneObj;
  })(target);

  const isObject = (obj) => obj && typeof obj === "object";

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    switch (true) {
      case Array.isArray(targetValue) && Array.isArray(sourceValue): {
        target[key] = targetValue.concat(sourceValue);
        break;
      }
      case isObject(targetValue) && isObject(sourceValue): {
        target[key] = getMergedObj(Object.assign({}, targetValue), sourceValue);
        break;
      }
      default:
        target[key] = sourceValue;
    }
  });

  return target;
};

export {
  getMergedObj
};
