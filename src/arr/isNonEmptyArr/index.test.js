import { isNonEmptyArr } from "./index.js";

describe(isNonEmptyArr.name, () => {

  test("Checks for non-empty array", () => {
    expect(isNonEmptyArr([ 1 ])).toBe(true);
    expect(isNonEmptyArr([])).toBe(false);
    expect(isNonEmptyArr(undefined)).toBe(false);
    expect(isNonEmptyArr({})).toBe(false);
    expect(isNonEmptyArr(null)).toBe(false);
    expect(isNonEmptyArr(new Set())).toBe(false);
  });

});
