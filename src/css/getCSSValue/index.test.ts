import { getCSSValue } from "./index.ts";

describe(getCSSValue.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCSSValue("moo" as any, "test")).toThrow();
    expect(() => getCSSValue(document as any, true as any)).toThrow();
  });

  test("Checks for prop values", () => {
    expect(getCSSValue(document.body, "font-size")).toBe("");
    document.body.style.textAlign = "center";
    expect(getCSSValue(document.body, "text-align")).toBe("center");
  });

});
