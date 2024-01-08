import { getStrWithThousandSeparator } from "./index.js";

describe(getStrWithThousandSeparator.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrWithThousandSeparator("moo")).toThrow();
    expect(() => getStrWithThousandSeparator(null)).toThrow();
  });

  test("Checks for large numbers", () => {
    expect(getStrWithThousandSeparator(1_000_000)).toBe("1 000 000");
    expect(getStrWithThousandSeparator(1_000_000_000)).toBe("1 000 000 000");
  });

  test("Checks for custom separator", () => {
    expect(getStrWithThousandSeparator(1000, ",")).toBe("1,000");
  });

});
