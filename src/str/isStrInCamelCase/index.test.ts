import { isStrInCamelCase } from "./index.ts";

describe(isStrInCamelCase.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isStrInCamelCase(1 as any)).toThrow();
    expect(() => isStrInCamelCase(null as any)).toThrow();
  });

  test("Checks strings in different cases", () => {
    expect(isStrInCamelCase("not_Camel")).toBe(false);
    expect(isStrInCamelCase(".class")).toBe(false);
    expect(isStrInCamelCase("000")).toBe(false);
    expect(isStrInCamelCase("camel Case test")).toBe(false);
    expect(isStrInCamelCase("word")).toBe(false);
    expect(isStrInCamelCase("Word")).toBe(false);
    expect(isStrInCamelCase("WORD")).toBe(false);
  });

  test("Check valid camelCase", () => {
    expect(isStrInCamelCase("abcDef")).toBe(true);
  });

});
