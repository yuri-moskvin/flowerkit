import { getMaxFromArr } from "./index.js";

describe(getMaxFromArr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getMaxFromArr("1")).toThrow();
    expect(() => getMaxFromArr([])).toThrow();
    expect(() => getMaxFromArr([ "10", "20", "30" ])).toThrow();
    expect(() => getMaxFromArr([ 1, null ])).toThrow();
  });

  test("Checks for arrays of numbers", () => {
    expect(getMaxFromArr([ 10, 20, 30 ])).toBe(30);
    expect(getMaxFromArr([ 10, Infinity, 30 ])).toBe(Infinity);
  });

});
