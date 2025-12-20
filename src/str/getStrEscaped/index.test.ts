import { getStrEscaped } from "./index.ts";

describe(getStrEscaped.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrEscaped(null as any)).toThrow();
    expect(() => getStrEscaped(1 as any)).toThrow();
  });

  test("Checks for HTML string with special chars", () => {
    expect(getStrEscaped("<b>Hello world & underworld!</b>")).toBe("&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;");
  });

});
