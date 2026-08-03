import assert from "node:assert";
import { describe, test } from "node:test";
import { getDateDiff } from "./index.ts";

describe(getDateDiff.name, () => {
  test("Checks validation", () => {
    assert.throws(() => getDateDiff("invalid", 0), TypeError);
    // @ts-expect-error testing invalid unit argument
    assert.throws(() => getDateDiff(0, 0, "month"), TypeError);
  });

  test("Returns a signed elapsed difference", () => {
    assert.strictEqual(getDateDiff("2024-01-03T00:00:00Z", "2024-01-01T00:00:00Z", "day"), 2);
    assert.strictEqual(getDateDiff(0, 1_500, "second"), -1.5);
  });
});
