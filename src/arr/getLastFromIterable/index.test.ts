import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { getLastFromIterable } from "./index.ts";

describe(getLastFromIterable.name, () => {

  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.className = "";
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid iterable argument
      getLastFromIterable(null)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid iterable argument
      getLastFromIterable({})
    );
  });

  test("Checks for NodeList", () => {
    // Set up DOM for this test
    document.body.innerHTML = `
      <ul>
        <li id="item1">One</li>
        text 1
        <li id="item2">Two</li>
        text 2
        <li id="item3">Three</li>
        text 3
      <ul>
    `;

    const elements = document.querySelectorAll("li");
    const result = getLastFromIterable(elements);
    assert.strictEqual(result?.textContent, "Three");
  });

  test("Checks for ClassList", () => {
    document.body.classList.add("class1", "class2", "class3");
    assert.strictEqual(getLastFromIterable(document.body.classList), "class3");
  });

  test("Checks for Arrays", () => {
    const arr = [ 1, 2, 3, null, 5 ];
    assert.strictEqual(getLastFromIterable(arr), 5);
  });

  test("Checks for empty Arrays", () => {
    const emptyArr: any[] = [];
    assert.strictEqual(getLastFromIterable(emptyArr), null);
  });
});
