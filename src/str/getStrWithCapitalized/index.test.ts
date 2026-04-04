import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithCapitalized } from "./index.ts";

describe(getStrWithCapitalized.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getStrWithCapitalized(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getStrWithCapitalized(null)
    );
  });

  test("Checks for strings", () => {
    assert.strictEqual(getStrWithCapitalized("hello world"), "Hello world");
    assert.strictEqual(getStrWithCapitalized("1"), "1");
    assert.strictEqual(getStrWithCapitalized(""), "");
    assert.strictEqual(getStrWithCapitalized("aB"), "AB");
    assert.strictEqual(getStrWithCapitalized(" abc"), "Abc");
  });

});
