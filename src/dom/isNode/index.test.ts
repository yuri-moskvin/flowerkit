import assert from "node:assert";
import { describe, test } from "node:test";
import { isNode } from "./index.ts";

describe(isNode.name, () => {

  test("Checks for correct detection of Element instance", () => {
    assert.strictEqual(isNode(null as any), false);
    assert.strictEqual(isNode(document as any), true);
    assert.strictEqual(isNode("foo" as any), false);
    assert.strictEqual(isNode(document.body as any), true);
  });

});
