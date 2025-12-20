import { setCSSVar } from "./index.ts";
import { getCSSVar } from "../getCSSVar/index.ts";

describe(setCSSVar.name, () => {

  test("Checks for invalid args", () => {
    expect(() => setCSSVar("" as any, "1", "")).toThrow();
    expect(() => setCSSVar(document as any, true as any)).toThrow();
    expect(() => setCSSVar(document as any, "1", [] as any)).toThrow();
  });

  test("Checks for variable value", () => {
    setCSSVar(document.body, "name", 123);
    expect(getCSSVar(document.body, "name")).toBe("123");
    expect(getCSSVar(document.body, "undefinedVar")).toBe("");
  });

});
