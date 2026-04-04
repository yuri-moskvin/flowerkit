import assert from "node:assert";
import { describe, test } from "node:test";
import { isJSON } from "./index.ts";

describe(isJSON.name, () => {

  test("Checks for invalid args", () => {
    assert.strictEqual(isJSON(1 as any), false);
    assert.strictEqual(isJSON(null as any), false);
  });

  test("Checks for strings", () => {
    const str = '{ "hello": "world" }';
    const brokenStr = "{ hello }";
    assert.strictEqual(isJSON(str), true);
    assert.strictEqual(isJSON(brokenStr), false);
  });
});
