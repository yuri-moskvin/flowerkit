import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { isIterable } from "./index.ts";

describe(isIterable.name, () => {

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("Checks for iterator", () => {
    assert.strictEqual(isIterable(12 as any), false);
    assert.strictEqual(isIterable([]), true);
    assert.strictEqual(isIterable(new Map()), true);
    assert.strictEqual(isIterable({}), false);

    // Setup DOM for HTMLFormControlsCollection test
    if (typeof document !== "undefined") {
      document.body.innerHTML = '<form><input name="test" /></form>';
      assert.strictEqual(isIterable(document.forms), true);
    }
  });
});
