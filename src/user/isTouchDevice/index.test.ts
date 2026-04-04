import assert from "node:assert";
import { describe, test } from "node:test";
import { isTouchDevice } from "./index.ts";

describe(isTouchDevice.name, () => {

  test("Checks if function return boolean", () => {
    assert.strictEqual(typeof isTouchDevice(), "boolean");
  });

});
