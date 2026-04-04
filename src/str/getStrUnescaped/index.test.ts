import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrUnescaped } from "./index.ts";

describe(getStrUnescaped.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getStrUnescaped(null)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getStrUnescaped(1)
    );
  });

  test("Checks for HTML string with special chars", () => {
    assert.strictEqual(getStrUnescaped("&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;"), `<b>Hello world & underworld!</b>`);
  });

});
