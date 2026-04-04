import assert from "node:assert";
import { describe, test } from "node:test";
import { isMobileDevice } from "./index.ts";

describe(isMobileDevice.name, () => {

  test("Checks if function returns Boolean", () => {
    assert.strictEqual(typeof isMobileDevice(), "boolean");
  });

});
