import assert from "node:assert";
import { describe, test } from "node:test";
import { getId } from "./index.ts";

describe(getId.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getId(0)
    );
    assert.throws(() => getId(Infinity));
  });

  test("Checks for 1000 cases", () => {
    const count = 1000;
    const storageIds = new Set<string>();
    for (let i = 0; i < count; i++) {
      storageIds.add(getId());
    }
    assert.strictEqual(storageIds.size === count, true);
    assert.strictEqual(getId(16).length, 16);
    assert.strictEqual(getId() !== getId(), true);
  });

});
