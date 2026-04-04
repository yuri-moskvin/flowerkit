import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { setCSSVar } from "./index.ts";
import { getCSSVar } from "../getCSSVar/index.ts";

describe(setCSSVar.name, () => {
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
      setCSSVar(
        // @ts-expect-error testing invalid el argument
        "", "1", ""
      )
    );
    assert.throws(() =>
      setCSSVar(
        // @ts-expect-error testing invalid el argument
        document,
        true,
        "value"
      )
    );
    assert.throws(() =>
      setCSSVar(
        // @ts-expect-error testing invalid el argument
        document,
        "1",
        []
      )
    );
  });

  test("Checks for variable value", () => {
    setCSSVar(document.body, "name", 123);
    assert.strictEqual(getCSSVar(document.body, "name"), "123");
    assert.strictEqual(getCSSVar(document.body, "undefinedVar"), "");
  });
});
