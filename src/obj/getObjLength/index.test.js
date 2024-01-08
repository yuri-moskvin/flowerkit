import { getObjLength } from "./index.js";

describe(getObjLength.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getObjLength("moo")).toThrow();
    expect(() => getObjLength(null)).toThrow();
  });

  test("Checks for non-empty object", () => {
    const obj = {
      key1: "value1",
      key2: "value2"
    };
    expect(getObjLength(obj)).toBe(2);
  });

  test("Checks for Arrays", () => {
    const arr = [ 1, 2 ];
    expect(getObjLength(arr)).toBe(2);
  });

  test("Checks for empty object", () => {
    const obj = {};
    expect(getObjLength(obj)).toBe(0);
  });

});
