import { JSDOM } from "jsdom";
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { getElSiblings } from "./index.ts";

describe(getElSiblings.name, () => {
  test("Checks for invalid args", () => {
    // Using assert.throws to verify that the function throws on invalid input
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      getElSiblings("moo")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      getElSiblings(null)
    );
  });

  test("Checks for el siblings length", () => {
    // Create a fresh DOM for this test to isolate changes
    const dom = new JSDOM(`
      <ul>
        Text 0
        <li id="item1">One</li>
        Text 1
        <li id="item2">Two</li>
        Text 2
        <li id="item3">Three</li>
        Text 3
      </ul>
    `);
    const document = dom.window.document;

    // Get the middle element and verify sibling count
    const item2 = document.getElementById("item2");
    assert.strictEqual(getElSiblings(item2!).length, 2);

    // Verify that the result for a non-element (like the <ul>) is an array
    const ul = document.querySelector("ul");
    assert.ok(Array.isArray(getElSiblings(ul!)));
  });
});
