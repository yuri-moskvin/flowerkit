import assert from "node:assert";
import { describe, test } from "node:test";
import { getDateAdded } from "./index.ts";

describe(getDateAdded.name, () => {
  test("Checks validation", () => {
    assert.throws(() => getDateAdded("invalid", 1), TypeError);
    assert.throws(() => getDateAdded(0, 1.5), TypeError);
    // @ts-expect-error testing invalid unit argument
    assert.throws(() => getDateAdded(0, 1, "century"), TypeError);
  });

  test("Adds elapsed units without mutation", () => {
    const source = new Date("2024-01-01T00:00:00Z");
    assert.strictEqual(getDateAdded(source, 2, "day").toISOString(), "2024-01-03T00:00:00.000Z");
    assert.strictEqual(source.toISOString(), "2024-01-01T00:00:00.000Z");
  });

  test("Clamps calendar additions to the target month", () => {
    const result = getDateAdded(new Date(2024, 0, 31, 12), 1, "month");
    assert.strictEqual(result.getFullYear(), 2024);
    assert.strictEqual(result.getMonth(), 1);
    assert.strictEqual(result.getDate(), 29);
  });
});
