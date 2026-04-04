import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrEscaped } from "./index.ts";

describe(getStrEscaped.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getStrEscaped(null)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getStrEscaped(1)
    );
  });

  test("Checks for HTML string with special chars", () => {
    assert.strictEqual(getStrEscaped("<b>Hello world & underworld!</b>"), "&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;");
  });

});
