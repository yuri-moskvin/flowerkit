import assert from "node:assert";
import { describe, test } from "node:test";
import { getHTMLFromStr } from "./index.ts";

describe(getHTMLFromStr.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getHTMLFromStr(false)
    );
    assert.throws(() => getHTMLFromStr(""));
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getHTMLFromStr(null)
    );
    assert.throws(() =>
      getHTMLFromStr(
        "<p>Hello world!</p>",
        // @ts-expect-error testing invalid type argument
        "bad/type"
      )
    );
  });

  test("Checks for correct HTML parsing", () => {
    assert.strictEqual(getHTMLFromStr(`<p>Hello world!</p><p>Hello world!</p>`).length, 2);
  });
});
