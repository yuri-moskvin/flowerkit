import { setCSSVar } from "../setCSSVar/index.js";
import { getCSSVar } from "./index.js";

describe(getCSSVar.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCSSVar("moo", "test")).toThrow();
    expect(() => getCSSVar(document, true)).toThrow();
  });

  test("Checks for variable value", () => {
    expect(getCSSVar(document.body, "name")).toBe("");

    setCSSVar(document.body, "prop1", "100");
    expect(getCSSVar(document.body, "prop1", true)).toBe(100);
    expect(getCSSVar(document.body, "prop1", false)).toBe("100");

    setCSSVar(document.body, "--prop2", "abc");
    expect(getCSSVar(document.body, "prop2", true)).toBe(NaN);
    expect(getCSSVar(document.body, "prop2", false)).toBe("abc");
  });

});
