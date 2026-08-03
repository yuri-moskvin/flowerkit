import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { once } from "./index.ts";

describe(once.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid function argument
    assert.throws(() => once(null), TypeError);
  });

  test("Calls once and reuses the first result", () => {
    const fn = mock.fn((value: number) => ({ value }));
    const wrapped = once(fn);
    const first = wrapped(1);
    const second = wrapped(2);
    assert.strictEqual(fn.mock.callCount(), 1);
    assert.strictEqual(first, second);
    assert.deepStrictEqual(second, { value: 1 });
  });

  test("Calls once and rethrows the first error", () => {
    const error = new Error("Initialization failed");
    const fn = mock.fn(() => {
      throw error;
    });
    const wrapped = once(fn);

    assert.throws(() => wrapped(), (caught) => caught === error);
    assert.throws(() => wrapped(), (caught) => caught === error);
    assert.strictEqual(fn.mock.callCount(), 1);
  });
});
