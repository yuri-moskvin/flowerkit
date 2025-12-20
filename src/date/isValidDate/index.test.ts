import { isValidDate } from "./index.ts";

describe(isValidDate.name, () => {

  test("Checks for valid date", () => {
    expect(isValidDate(undefined as any)).toBe(false);
    expect(isValidDate(null as any)).toBe(false);
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(""))).toBe(false);
    expect(isValidDate(new Date(1))).toBe(true);
  });

});
