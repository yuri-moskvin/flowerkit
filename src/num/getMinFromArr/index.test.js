import { getMinFromArr } from "./index.js";

describe(getMinFromArr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getMinFromArr("1")).toThrow();
    expect(() => getMinFromArr([])).toThrow();
    expect(() => getMinFromArr([ "10", "20", "30" ])).toThrow();
    expect(() => getMinFromArr([ 1, null ])).toThrow();
  });

  test("Checks for arrays of numbers", () => {
    expect(getMinFromArr([ 10, 20, 30 ])).toBe(10);
    expect(getMinFromArr([ 10, Infinity, 30 ])).toBe(10);
  });

});
