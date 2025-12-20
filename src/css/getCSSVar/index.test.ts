import { getCSSVar } from "./index.ts";
import { setCSSVar } from "../setCSSVar/index.ts";

describe(getCSSVar.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCSSVar("moo" as any, "test")).toThrow();
    expect(() => getCSSVar(document as any, true as any)).toThrow();
  });

  test("Checks for variable value", () => {
    expect(getCSSVar(document.body, "name")).toBe("");

    setCSSVar(document.body, "prop1", "100");
    expect(getCSSVar(document.body, "prop1", true)).toBe(100);
    expect(getCSSVar(document.body, "prop1", false)).toBe("100");

    setCSSVar(document.body, "--prop2", "abc");
    expect(Number.isNaN(getCSSVar(document.body, "prop2", true) as number)).toBe(true);
    expect(getCSSVar(document.body, "prop2", false)).toBe("abc");
  });

});
