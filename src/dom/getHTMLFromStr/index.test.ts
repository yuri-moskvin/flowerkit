import assert from "node:assert";
import { describe, test } from "node:test";
import { getHTMLFromStr } from "./index.ts";

describe(getHTMLFromStr.name, () => {

  test("Checks for invalid args", () => {
    assert.rejects(() =>
      // @ts-expect-error testing invalid str argument
      getHTMLFromStr(false)
    );
    assert.rejects(() => getHTMLFromStr(""));
    assert.rejects(() =>
      // @ts-expect-error testing invalid str argument
      getHTMLFromStr(null)
    );
    assert.rejects(() =>
      getHTMLFromStr(
        "<p>Hello world!</p>",
        // @ts-expect-error testing invalid type argument
        "bad/type"
      )
    );
  });

  test("Checks for correct HTML parsing", async () => {
    const nodeList = await getHTMLFromStr(`<p>Hello world!</p><p>Hello world!</p>`);
    assert.strictEqual(nodeList.length, 2);
  });
});
