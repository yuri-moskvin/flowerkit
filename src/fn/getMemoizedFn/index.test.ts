import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { getMemoizedFn } from "./index.ts";

describe(getMemoizedFn.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid function argument
    assert.throws(() => getMemoizedFn(null), TypeError);
  });

  test("Caches by all argument identities and clears", () => {
    const fn = mock.fn((left: number, right: number) => left + right);
    const memoized = getMemoizedFn(fn);
    assert.strictEqual(memoized(1, 2), 3);
    assert.strictEqual(memoized(1, 2), 3);
    assert.strictEqual(memoized(1, 3), 4);
    assert.strictEqual(fn.mock.callCount(), 2);
    memoized.clear();
    assert.strictEqual(memoized(1, 2), 3);
    assert.strictEqual(fn.mock.callCount(), 3);
  });

  test("Keeps separate cache entries for different receivers", () => {
    const memoized = getMemoizedFn(function (this: { value: number; }) {
      return this.value;
    });
    const first = { value: 1, memoized };
    const second = { value: 2, memoized };

    assert.strictEqual(first.memoized(), 1);
    assert.strictEqual(second.memoized(), 2);
  });
});
