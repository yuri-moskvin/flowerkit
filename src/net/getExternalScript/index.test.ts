import assert from "node:assert";
import { describe, test } from "node:test";
import { getExternalScript } from "./index.ts";

describe(getExternalScript.name, () => {

  test("Checks for invalid args", async () => {
    await assert.rejects(() =>
      getExternalScript({
        // @ts-expect-error (testing invalid src argument)
        src: false,
      })
    );
    await assert.rejects(() =>
      getExternalScript({
        // @ts-expect-error testing (invalid crossorigin argument)
        crossorigin: 1,
      })
    );
    await assert.rejects(() =>
      getExternalScript({
        // @ts-expect-error (testing invalid appendTo argument)
        appendTo: null,
      })
    );
  });

  test("Checks for script appending", () => {
    getExternalScript({
      src: "https://ajax.googleapis.com/ajax/libs/d3js/7.8.5/d3.min.js",
      id: "d3",
    });
    assert.strictEqual((document.getElementById("d3") as HTMLElement).tagName, "SCRIPT");
  });

});
