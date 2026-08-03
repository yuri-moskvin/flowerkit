import assert from "node:assert";
import { describe, test, mock } from "node:test";
import { getDebouncedFn } from "./index.ts";

describe(getDebouncedFn.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid fn argument
      getDebouncedFn("")
    );
    assert.throws(() =>
      getDebouncedFn(
        () => {},
        // @ts-expect-error testing invalid delay argument
        null
      )
    );
  });

  test("Checks for calling of debounced fn with 1000ms delay", async () => {
    const fn = mock.fn();
    const debouncedFn = getDebouncedFn(fn, 100);

    debouncedFn();

    await new Promise((resolve) => setTimeout(resolve, 50));
    debouncedFn();
    assert.strictEqual(fn.mock.callCount(), 0);

    await new Promise((resolve) => setTimeout(resolve, 150));
    assert.strictEqual(fn.mock.callCount(), 1);
  });

  test("Cancels and flushes pending calls", () => {
    const fn = mock.fn((value: number) => value * 2);
    const debouncedFn = getDebouncedFn(fn, 100);

    debouncedFn(2);
    assert.strictEqual(debouncedFn.pending(), true);
    assert.strictEqual(debouncedFn.flush(), 4);
    assert.strictEqual(debouncedFn.pending(), false);
    assert.strictEqual(fn.mock.callCount(), 1);

    debouncedFn(3);
    debouncedFn.cancel();
    assert.strictEqual(debouncedFn.pending(), false);
    assert.strictEqual(fn.mock.callCount(), 1);
  });

  test("Preserves context and returns the immediate result", () => {
    const source = {
      factor: 3,
      fn: getDebouncedFn(function (this: { factor: number; }, value: number) {
        return this.factor * value;
      }, 100, true),
    };
    assert.strictEqual(source.fn(2), 6);
    source.fn.cancel();
  });
});
