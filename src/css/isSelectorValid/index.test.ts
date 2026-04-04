import assert from "node:assert";
import { describe, test } from "node:test";
import { isSelectorValid } from "./index.ts";

describe(isSelectorValid.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid selector argument
      isSelectorValid(0)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid selector argument
      isSelectorValid(null)
    );
  });

  test("Checks for wrong selectors", () => {
    assert.strictEqual(isSelectorValid("0el"), false);
    assert.strictEqual(isSelectorValid("..el"), false);
  });

  test("Checks for valid CSS selectors", () => {
    assert.strictEqual(isSelectorValid("el"), true);
    assert.strictEqual(isSelectorValid("[data-attr]"), true);
    assert.strictEqual(isSelectorValid("#id"), true);
    assert.strictEqual(isSelectorValid("div.test"), true);
    assert.strictEqual(isSelectorValid("div + div"), true);
    assert.strictEqual(isSelectorValid("p.class[data-test-attr='value']"), true);
  });
});
