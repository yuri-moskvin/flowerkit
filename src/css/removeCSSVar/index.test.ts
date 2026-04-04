import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { removeCSSVar } from "./index.ts";
import { getCSSVar } from "../getCSSVar/index.ts";

describe(removeCSSVar.name, () => {
  // Reset the DOM before each test
  beforeEach(() => {
    if (typeof document !== "undefined") {
      document.body.innerHTML = "";
    }
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      removeCSSVar(
        // @ts-expect-error testing invalid el argument
        "",
        true
      )
    );
    assert.throws(() =>
      removeCSSVar(
        // @ts-expect-error testing invalid el argument
        document,
        true
      )
    );
  });

  test("Checks for variable value", () => {
    document.body.innerHTML = `<div id="block" style="--foo: 1"></div>`;
    const div = document.getElementById("block") as HTMLElement;

    assert.strictEqual(getCSSVar(div, "foo"), "1");

    removeCSSVar(div, "foo");

    assert.strictEqual(getCSSVar(div, "foo"), "");
  });
});
