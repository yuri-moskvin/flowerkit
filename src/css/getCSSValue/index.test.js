import { getCSSValue } from "./index.js";

describe(getCSSValue.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCSSValue("moo", "test")).toThrow();
    expect(() => getCSSValue(document, true)).toThrow();
  });

  test("Checks for prop values", () => {
    expect(getCSSValue(document.body, "font-size")).toBe("");
    document.body.style.textAlign = "center";
    expect(getCSSValue(document.body, "text-align")).toBe("center");
  });

});
