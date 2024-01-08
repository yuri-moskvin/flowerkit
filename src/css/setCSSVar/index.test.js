import { getCSSVar } from "../getCSSVar/index.js";
import { setCSSVar } from "./index.js";

describe(setCSSVar.name, () => {

  test("Checks for invalid args", () => {
    expect(() => setCSSVar("")).toThrow();
    expect(() => setCSSVar(document, true)).toThrow();
    expect(() => setCSSVar(document, "1", [])).toThrow();
  });

  test("Checks for variable value", () => {
    setCSSVar(document.body, "name", 123);
    expect(getCSSVar(document.body, "name")).toBe("123");
    expect(getCSSVar(document.body, "undefinedVar")).toBe("");
  });

});
