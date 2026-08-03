import assert from "node:assert";
import { describe, test, mock } from "node:test";
import { getThrottledFn } from "./index.ts";

describe(getThrottledFn.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid fn argument
      getThrottledFn("")
    );
    assert.throws(() =>
      getThrottledFn(
        () => {},
        // @ts-expect-error testing invalid delay argument
        null
      )
    );
  });

  test("Checks for throttling with 2000ms delay", () => {
    const delay = 2000;
    const setTimeoutMock = mock.fn(global.setTimeout);
    mock.method(global, "setTimeout", setTimeoutMock);

    const fn = mock.fn();
    const throttledFn = getThrottledFn(fn, delay);
    throttledFn();
    assert.strictEqual(setTimeoutMock.mock.callCount(), 1);
    assert.strictEqual(setTimeoutMock.mock.calls[0].arguments[1], delay);

    throttledFn.cancel();
    setTimeoutMock.mock.restore();
  });

  test("Cancels and flushes suppressed calls", () => {
    const fn = mock.fn((value: number) => value * 2);
    const throttledFn = getThrottledFn(fn, 100);
    assert.strictEqual(throttledFn(1), 2);
    assert.strictEqual(throttledFn(2), 2);
    assert.strictEqual(throttledFn.pending(), true);
    assert.strictEqual(throttledFn.flush(), 4);
    assert.strictEqual(fn.mock.callCount(), 2);
    assert.strictEqual(throttledFn.pending(), false);

    throttledFn(3);
    throttledFn.cancel();
    assert.strictEqual(throttledFn.pending(), false);
  });

  test("Preserves context", () => {
    const source = {
      factor: 4,
      fn: getThrottledFn(function (this: { factor: number; }, value: number) {
        return this.factor * value;
      }, 100),
    };
    assert.strictEqual(source.fn(2), 8);
    source.fn.cancel();
  });
});
