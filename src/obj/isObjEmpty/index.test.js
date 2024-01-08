
import { isObjEmpty } from "./index.js";

describe(isObjEmpty.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isObjEmpty("moo")).toThrow();
    expect(() => isObjEmpty(1)).toThrow();
    expect(() => isObjEmpty(null)).toThrow();
  });

  test("Checks for plain objects", () => {
    const obj1 = {
      key1: "value1",
      key2: "value2"
    };
    const obj2 = {};
    expect(isObjEmpty(obj1)).toBe(false);
    expect(isObjEmpty(obj2)).toBe(true);
  });

  test("Checks for arrays", () => {
    const arr1 = [ 1, 2 ];
    const arr2 = [];
    expect(isObjEmpty(arr1)).toBe(false);
    expect(isObjEmpty(arr2)).toBe(true);
  });


});
