import assert from "node:assert";
import { describe, test } from "node:test";
import { isValidDate } from "./index.ts";

describe(isValidDate.name, () => {
  test("Checks for valid date", () => {
    assert.strictEqual(isValidDate(undefined as any), false);
    assert.strictEqual(isValidDate(null as any), false);
    assert.strictEqual(isValidDate(new Date()), true);
    assert.strictEqual(isValidDate(new Date("")), false);
    assert.strictEqual(isValidDate(new Date(1)), true);
  });
});
