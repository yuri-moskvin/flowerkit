import { getStrEscaped } from "./index.js";

describe(getStrEscaped.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrEscaped(null)).toThrow();
    expect(() => getStrEscaped(1)).toThrow();
  });

  test("Checks for HTML string with special chars", () => {
    expect(getStrEscaped("<b>Hello world & underworld!</b>")).toBe("&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;");
  });

});
