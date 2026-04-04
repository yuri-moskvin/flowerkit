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
    getThrottledFn(fn, delay)();
    assert.strictEqual(setTimeoutMock.mock.callCount(), 1);
    assert.strictEqual(setTimeoutMock.mock.calls[0].arguments[1], delay);

    setTimeoutMock.mock.restore();
  });
});
