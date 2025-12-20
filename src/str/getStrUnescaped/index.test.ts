import { getStrUnescaped } from "./index.ts";

describe(getStrUnescaped.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrUnescaped(null as any)).toThrow();
    expect(() => getStrUnescaped(1 as any)).toThrow();
  });

  test("Checks for HTML string with special chars", () => {
    expect(getStrUnescaped("&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;")).toBe(`<b>Hello world & underworld!</b>`);
  });

});
