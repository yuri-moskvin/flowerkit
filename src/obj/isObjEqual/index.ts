export type TIsObjEqualArgs = Parameters<typeof isObjEqual>;

export type TIsObjEqualReturn = ReturnType<typeof isObjEqual>;

/**
 * Checks if two objects are deeply equal by keys and values (not by reference)
 * @param {unknown} obj1 First object
 * @param {unknown} obj2 Second object
 * @returns {boolean} True if objects are deeply equal
 * @throws {TypeError} isObjEqual: obj1 must be an object
 * @throws {TypeError} isObjEqual: obj2 must be an object
 * @example
 * // How to compare two objects by content?
 * const a = { foo: { bar: 1 } };
 * const b = { foo: { bar: 1 } };
 * const isEqual = isObjEqual(a, b);
 * console.log(isEqual); // => true
 */
export const isObjEqual = (obj1: unknown, obj2: unknown): boolean => {
  const isObject = (obj: unknown): obj is object => obj !== null && typeof obj === "object";

  if (!isObject(obj1)) {
    throw new TypeError("isObjEqual: obj1 must be an object");
  }
  if (!isObject(obj2)) {
    throw new TypeError("isObjEqual: obj2 must be an object");
  }

  const deepCompare = (
    value1: unknown,
    value2: unknown,
    visitedValue1: WeakMap<object, object>,
    visitedValue2: WeakMap<object, object>
  ): boolean => {
    if (Object.is(value1, value2)) {
      return true;
    }
    if (!isObject(value1) || !isObject(value2)) {
      return false;
    }

    if (visitedValue1.has(value1) || visitedValue2.has(value2)) {
      return visitedValue1.get(value1) === value2 && visitedValue2.get(value2) === value1;
    }

    visitedValue1.set(value1, value2);
    visitedValue2.set(value2, value1);

    if (Array.isArray(value1) || Array.isArray(value2)) {
      if (!Array.isArray(value1) || !Array.isArray(value2) || value1.length !== value2.length) {
        return false;
      }
      for (let i = 0; i < value1.length; i += 1) {
        if (!deepCompare(value1[i], value2[i], visitedValue1, visitedValue2)) {
          return false;
        }
      }
      return true;
    }

    if (value1 instanceof Date || value2 instanceof Date) {
      return value1 instanceof Date && value2 instanceof Date && Object.is(value1.getTime(), value2.getTime());
    }

    if (value1 instanceof RegExp || value2 instanceof RegExp) {
      return value1 instanceof RegExp
        && value2 instanceof RegExp
        && value1.source === value2.source
        && value1.flags === value2.flags;
    }

    const value1Keys = Reflect.ownKeys(value1);
    const value2Keys = Reflect.ownKeys(value2);

    if (value1Keys.length !== value2Keys.length) {
      return false;
    }

    const value1Record = value1 as Record<PropertyKey, unknown>;
    const value2Record = value2 as Record<PropertyKey, unknown>;

    return value1Keys.every((key) => {
      if (!Object.prototype.hasOwnProperty.call(value2Record, key)) {
        return false;
      }
      return deepCompare(value1Record[key], value2Record[key], visitedValue1, visitedValue2);
    });
  };

  return deepCompare(obj1, obj2, new WeakMap<object, object>(), new WeakMap<object, object>());
};
