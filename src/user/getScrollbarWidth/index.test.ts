import assert from "node:assert";
import { describe, test } from "node:test";
import { getScrollbarWidth } from "./index.ts";

describe(getScrollbarWidth.name, () => {

  test("Checks if function returns Number", () => {
    assert.strictEqual(typeof getScrollbarWidth(), "number");
  });

});
