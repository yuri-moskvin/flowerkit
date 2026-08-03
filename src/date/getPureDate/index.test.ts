import assert from "node:assert";
import { describe, test } from "node:test";
import { getPureDate } from "./index.ts";

describe(getPureDate.name, () => {
  test("Gets pure date", () => {
    const stamp = new Date();
    const originalTime = stamp.getTime();
    const pureDate = getPureDate(stamp);

    assert.notStrictEqual(pureDate, stamp);
    assert.strictEqual(stamp.getTime(), originalTime);
    assert.strictEqual(pureDate?.getHours(), 0);
    assert.strictEqual(pureDate?.getSeconds(), 0);
    assert.strictEqual(pureDate?.getMinutes(), 0);
    assert.strictEqual(pureDate?.getMilliseconds(), 0);

    const wrongStamp = new Date("");
    assert.strictEqual(getPureDate(wrongStamp), null);

    const toDate = new Date().getTime();
    const pureDateFromTimestamp = getPureDate(toDate);

    assert.strictEqual(pureDateFromTimestamp?.getHours(), 0);
    assert.strictEqual(pureDateFromTimestamp?.getSeconds(), 0);
    assert.strictEqual(pureDateFromTimestamp?.getMinutes(), 0);
    assert.strictEqual(pureDateFromTimestamp?.getMilliseconds(), 0);
  });
});
