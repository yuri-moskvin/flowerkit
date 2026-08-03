import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { getRetriedFn } from "./index.ts";

describe(getRetriedFn.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid function argument
    assert.throws(() => getRetriedFn(null), TypeError);
    assert.throws(() => getRetriedFn(async () => 1, { maxRetries: -1 }), TypeError);
  });

  test("Retries and returns the eventual result", async () => {
    let attempt = 0;
    const onRetry = mock.fn();
    const wrapped = getRetriedFn(async () => {
      attempt += 1;
      if (attempt < 3) {
        throw new Error("temporary");
      }
      return "ok";
    }, { maxRetries: 2, onRetry });
    assert.strictEqual(await wrapped(), "ok");
    assert.strictEqual(attempt, 3);
    assert.strictEqual(onRetry.mock.callCount(), 2);
  });

  test("Stops when the retry predicate returns false", async () => {
    const wrapped = getRetriedFn(
      async () => await Promise.reject(new Error("permanent")),
      { maxRetries: 5, shouldRetry: () => false }
    );
    await assert.rejects(wrapped(), /permanent/);
  });

  test("Honors an aborted signal", async () => {
    const controller = new AbortController();
    controller.abort(new Error("stopped"));
    const wrapped = getRetriedFn(async () => 1, { signal: controller.signal });
    await assert.rejects(wrapped(), /stopped/);
  });
});
