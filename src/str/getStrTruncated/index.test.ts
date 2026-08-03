import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrTruncated } from "./index.ts";

describe(getStrTruncated.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid string argument
    assert.throws(() => getStrTruncated(null, 2), TypeError);
    assert.throws(() => getStrTruncated("x", -1), TypeError);
    // @ts-expect-error testing invalid suffix argument
    assert.throws(() => getStrTruncated("x", 1, null), TypeError);
  });

  test("Keeps the maximum length including the suffix", () => {
    assert.strictEqual(getStrTruncated("Hello world", 8), "Hello w…");
    assert.strictEqual(getStrTruncated("short", 8), "short");
    assert.strictEqual(getStrTruncated("😀😀😀", 2), "😀…");
    assert.strictEqual(getStrTruncated("abc", 0), "");
  });
});
