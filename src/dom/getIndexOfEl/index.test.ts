import assert from "node:assert";
import { describe, test } from "node:test";
import { getIndexOfEl } from "./index.ts";

describe(getIndexOfEl.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      getIndexOfEl("moo")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      getIndexOfEl(null)
    );
  });

  test("Checks for correct el index", () => {
    document.body.innerHTML = `
     <ul>
       Test 0 
       <li id="item1">One</li>
       Text 1
       <li id="item2">Two</li>
       Text 2
       <li id="item3">Three</li>
       Text 3
     <ul>
  `;
    assert.strictEqual(getIndexOfEl(document.querySelector("#item3")!), 2);
  });

});
