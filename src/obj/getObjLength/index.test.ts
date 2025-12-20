import { getObjLength } from "./index.ts";

describe(getObjLength.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getObjLength("moo" as any)).toThrow();
    expect(() => getObjLength(null as any)).toThrow();
  });

  test("Checks for non-empty object", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
    };
    expect(getObjLength(obj)).toBe(2);
  });

  test("Checks for Arrays", () => {
    const arr = [ 1, 2 ];
    expect(getObjLength(arr as any)).toBe(2);
  });

  test("Checks for empty object", () => {
    const obj = {};
    expect(getObjLength(obj)).toBe(0);
  });

});
