
import { isStrInKebabCase } from "./index.js";

describe(isStrInKebabCase.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isStrInKebabCase(1)).toThrow();
    expect(() => isStrInKebabCase(null)).toThrow();
  });

  test("Checks strings in different cases", () => {
    expect(isStrInKebabCase("not_kebab")).toBe(false);
    expect(isStrInKebabCase(".class")).toBe(false);
    expect(isStrInKebabCase("000")).toBe(false);
    expect(isStrInKebabCase("kebab-Case-test")).toBe(false);
    expect(isStrInKebabCase("KEBAB-CASE-TEST")).toBe(false);
    expect(isStrInKebabCase("---")).toBe(false);
    expect(isStrInKebabCase("-wrong-kebab")).toBe(false);
  });

  test("Check valid kebab-case", () => {
    expect(isStrInKebabCase("good-kebab")).toBe(true);
  });

});
