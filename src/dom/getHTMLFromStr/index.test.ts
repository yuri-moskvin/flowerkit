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
    const nodeList = await getHTMLFromStr("<div>Hello <span>world</span></div>tail");
    assert.strictEqual(nodeList.length, 2);
    assert.strictEqual(nodeList[0].nodeName, "DIV");
    assert.strictEqual(nodeList[1].nodeType, 3);
    assert.strictEqual(nodeList[1].textContent, "tail");
  });

  test("Returns the same top-level structure in the SSR fallback", async () => {
    const originalDOMParser = globalThis.DOMParser;
    Object.defineProperty(globalThis, "DOMParser", {
      configurable: true,
      value: undefined,
    });
    try {
      const nodeList = await getHTMLFromStr("<div>Hello <span>world</span></div>tail");
      assert.strictEqual(nodeList.length, 2);
      assert.strictEqual(nodeList[0].nodeType, 1);
      assert.strictEqual(nodeList[1].nodeType, 3);
      assert.strictEqual(nodeList[1].textContent, "tail");
    } finally {
      Object.defineProperty(globalThis, "DOMParser", {
        configurable: true,
        value: originalDOMParser,
      });
    }
  });

  test("Parses supported XML document types", async () => {
    const nodeList = await getHTMLFromStr("<root><item /></root>", "application/xml");
    assert.strictEqual(nodeList.length, 1);
    assert.strictEqual(nodeList[0].nodeName, "root");
  });
});
