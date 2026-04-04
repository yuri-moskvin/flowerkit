import assert from "node:assert";
import { describe, test } from "node:test";
import { removeChildNodes } from "./index.ts";

describe(removeChildNodes.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      removeChildNodes("str")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      removeChildNodes(null)
    );
  });

  test("Checks for correct removing of child nodes", () => {
    document.body.innerHTML = `<div id="myBlock"><div>Block with child nodes</div></div>`;
    const myDiv = document.getElementById("myBlock") as HTMLElement;
    assert.strictEqual(Array.from(myDiv.children).length, 1);
    removeChildNodes(myDiv);
    assert.strictEqual(Array.from(myDiv.children).length, 0);
  });

});
