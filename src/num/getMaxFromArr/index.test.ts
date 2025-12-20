import { getMaxFromArr } from "./index.ts";

describe(getMaxFromArr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getMaxFromArr("1" as any)).toThrow();
    expect(() => getMaxFromArr([] as any)).toThrow();
    expect(() => getMaxFromArr([ "10", "20", "30" ] as any)).toThrow();
    expect(() => getMaxFromArr([ 1, null ] as any)).toThrow();
  });

  test("Checks for arrays of numbers", () => {
    expect(getMaxFromArr([ 10, 20, 30 ])).toBe(30);
    expect(getMaxFromArr([ 10, Infinity, 30 ])).toBe(Infinity);
  });

});
