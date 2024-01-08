
import { getStrWithCapitalized } from "./index.js";

describe(getStrWithCapitalized.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrWithCapitalized(1)).toThrow();
    expect(() => getStrWithCapitalized(null)).toThrow();
  });

  test("Checks for strings", () => {
    expect(getStrWithCapitalized("hello world")).toBe("Hello world");
    expect(getStrWithCapitalized("1")).toBe("1");
    expect(getStrWithCapitalized("")).toBe("");
    expect(getStrWithCapitalized("aB")).toBe("AB");
    expect(getStrWithCapitalized(" abc")).toBe("Abc");
  });

});
