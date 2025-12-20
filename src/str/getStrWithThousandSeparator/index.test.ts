import { getStrWithThousandSeparator } from "./index.ts";

describe(getStrWithThousandSeparator.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrWithThousandSeparator("moo" as any)).toThrow();
    expect(() => getStrWithThousandSeparator(null as any)).toThrow();
  });

  test("Checks for large numbers", () => {
    expect(getStrWithThousandSeparator(1_000_000)).toBe("1 000 000");
    expect(getStrWithThousandSeparator(1_000_000_000)).toBe("1 000 000 000");
  });

  test("Checks for custom separator", () => {
    expect(getStrWithThousandSeparator(1000, ",")).toBe("1,000");
  });

});
