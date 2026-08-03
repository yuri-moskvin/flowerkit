import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithNormalizedSpaces } from "./index.ts";

describe(getStrWithNormalizedSpaces.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid string argument
    assert.throws(() => getStrWithNormalizedSpaces(null), TypeError);
  });

  test("Normalizes whitespace", () => {
    assert.strictEqual(getStrWithNormalizedSpaces("  hello\n\tworld  "), "hello world");
  });
});
