import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithSlug } from "./index.ts";

describe(getStrWithSlug.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid string argument
    assert.throws(() => getStrWithSlug(null), TypeError);
    assert.throws(() => getStrWithSlug("x", { separator: "" }), TypeError);
  });

  test("Creates Unicode slugs", () => {
    assert.strictEqual(getStrWithSlug("Café: Привет мир!"), "cafe-привет-мир");
    assert.strictEqual(getStrWithSlug("one / two", { separator: "_" }), "one_two");
  });
});
