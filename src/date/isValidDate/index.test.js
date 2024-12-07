import { isValidDate } from "./index.js";

describe(isValidDate.name, () => {

  test("Checks for valid date", () => {
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(""))).toBe(false);
    expect(isValidDate(new Date(1))).toBe(true);
  });

});
