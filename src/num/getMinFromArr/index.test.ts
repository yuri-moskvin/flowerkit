import { getMinFromArr } from "./index.ts";

describe(getMinFromArr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getMinFromArr("1" as any)).toThrow();
    expect(() => getMinFromArr([] as any)).toThrow();
    expect(() => getMinFromArr([ "10", "20", "30" ] as any)).toThrow();
    expect(() => getMinFromArr([ 1, null ] as any)).toThrow();
  });

  test("Checks for arrays of numbers", () => {
    expect(getMinFromArr([ 10, 20, 30 ])).toBe(10);
    expect(getMinFromArr([ 10, Infinity, 30 ])).toBe(10);
  });

});
