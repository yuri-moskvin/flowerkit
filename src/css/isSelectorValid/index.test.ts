import { isSelectorValid } from "./index.ts";

describe(isSelectorValid.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isSelectorValid(0 as any)).toThrow();
    expect(() => isSelectorValid(null as any)).toThrow();
  });

  test("Checks for wrong selectors", () => {
    expect(isSelectorValid("0el")).toBe(false);
    expect(isSelectorValid("..el")).toBe(false);
  });

  test("Checks for valid CSS selectors", () => {
    expect(isSelectorValid("el")).toBe(true);
    expect(isSelectorValid("[data-attr]")).toBe(true);
    expect(isSelectorValid("#id")).toBe(true);
    expect(isSelectorValid("div.test")).toBe(true);
    expect(isSelectorValid("div + div")).toBe(true);
    expect(isSelectorValid("p.class[data-test-attr='value']")).toBe(true);
  });

});
