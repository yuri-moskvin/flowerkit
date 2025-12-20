import { removeCSSVar } from "./index.ts";
import { getCSSVar } from "../getCSSVar/index.ts";

describe(removeCSSVar.name, () => {

  test("Checks for invalid args", () => {
    expect(() => removeCSSVar("" as any, true as any)).toThrow();
    expect(() => removeCSSVar(document as any, true as any)).toThrow();
  });

  test("Checks for variable value", () => {

    document.body.innerHTML = `<div id="block" style="--foo: 1"></div>`;
    const div = document.getElementById("block") as HTMLElement;

    expect(getCSSVar(div, "foo")).toBe("1");

    removeCSSVar(div, "foo");

    expect(getCSSVar(div, "foo")).toBe("");

  });

});
