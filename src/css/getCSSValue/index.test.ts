import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { getCSSValue } from "./index.ts";

describe(getCSSValue.name, () => {
  // Reset the DOM before each test
  beforeEach(() => {
    if (typeof document !== "undefined") {
      document.body.style.textAlign = "";
    }
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getCSSValue(
        // @ts-expect-error testing invalid el argument
        "moo", "test"
      )
    );
    assert.throws(() =>
      getCSSValue(
        // @ts-expect-error testing invalid el argument
        document,
        true
      )
    );
  });

  test("Checks for prop values", () => {
    assert.strictEqual(getCSSValue(document.body, "font-size"), "medium");

    document.body.style.textAlign = "center";
    assert.strictEqual(getCSSValue(document.body, "text-align"), "center");
  });
});
