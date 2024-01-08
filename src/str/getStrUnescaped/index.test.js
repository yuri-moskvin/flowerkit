import { getStrUnescaped } from "./index.js";

describe(getStrUnescaped.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrUnescaped(null)).toThrow();
    expect(() => getStrUnescaped(1)).toThrow();
  });

  test("Checks for HTML string with special chars", () => {
    expect(getStrUnescaped("&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;")).toBe(`<b>Hello world & underworld!</b>`);
  });

});
