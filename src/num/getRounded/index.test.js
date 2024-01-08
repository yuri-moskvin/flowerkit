import { getRounded } from "./index.js";

describe(getRounded.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getRounded(NaN)).toThrow();
    expect(() => getRounded(10, -1)).toThrow();
    expect(() => getRounded(10, Infinity)).toThrow();
  });

  test("Checks for problematic rounding cases", () => {
    expect(getRounded(10.999, 1)).toBe(11);
    expect(getRounded(10.0999, 2)).toBe(10.1);
    expect(getRounded(10.0999, 0)).toBe(10);
    expect(getRounded(-10.005, 1)).toBe(-10);
    expect(getRounded(0.00025, 4)).toBe(0.0003);
    expect(getRounded(10.299999, 3)).toBe(10.3);
  });

});
