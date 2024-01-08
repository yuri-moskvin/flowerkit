import { isItemsEqual } from "./index.js";

describe(isItemsEqual.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isItemsEqual({})).toThrow();
    expect(() => isItemsEqual(null)).toThrow();
  });

  test("Checks for equivalency", () => {
    expect(isItemsEqual([ 1, 2, 3 ])).toBe(false);
    expect(isItemsEqual([ 1, 1, 1 ])).toBe(true);
    expect(isItemsEqual([ {}, {} ])).toBe(false);
    expect(isItemsEqual([ null, undefined ])).toBe(false);
  });

  test("Checks for empty arr", () => {
    expect(isItemsEqual([])).toBe(true);
  });

});
