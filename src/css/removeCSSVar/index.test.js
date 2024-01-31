import { getCSSVar } from "../getCSSVar/index.js";
import { removeCSSVar } from "./index.js";

describe(removeCSSVar.name, () => {

  test("Checks for invalid args", () => {
    expect(() => removeCSSVar("")).toThrow();
    expect(() => removeCSSVar(document, true)).toThrow();
  });

  test("Checks for variable value", () => {

    document.body.innerHTML = `<div id="block" style="--foo: 1"></div>`;
    const div = document.getElementById("block");

    expect(getCSSVar(div, "foo")).toBe("1");

    removeCSSVar(div, "foo");

    expect(getCSSVar(div, "foo")).toBe("");

  });

});
