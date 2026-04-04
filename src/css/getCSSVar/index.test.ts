import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { getCSSVar } from "./index.ts";
import { setCSSVar } from "../setCSSVar/index.ts";

describe(getCSSVar.name, () => {
  // Reset the DOM before each test
  beforeEach(() => {
    if (typeof document !== "undefined") {
      // Clear any CSS variables that might have been set
      const style = document.body.style;
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        if (prop.startsWith("--")) {
          style.removeProperty(prop);
        }
      }
    }
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getCSSVar(
        // @ts-expect-error testing invalid el argument
        "moo", "test"
      )
    );
    assert.throws(() =>
      getCSSVar(
        // @ts-expect-error testing invalid el argument
        document,
        true
      )
    );
  });

  test("Checks for variable value", () => {
    assert.strictEqual(getCSSVar(document.body, "name"), "");

    setCSSVar(document.body, "prop1", "100");
    assert.strictEqual(getCSSVar(document.body, "prop1", true), 100);
    assert.strictEqual(getCSSVar(document.body, "prop1", false), "100");

    setCSSVar(document.body, "--prop2", "abc");
    assert.strictEqual(Number.isNaN(getCSSVar(document.body, "prop2", true) as number), true);
    assert.strictEqual(getCSSVar(document.body, "prop2", false), "abc");
  });
});
