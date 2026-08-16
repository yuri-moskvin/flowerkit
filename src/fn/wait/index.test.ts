import assert from "node:assert";
import { describe, test, mock } from "node:test";
import { wait } from "./index.ts";

describe(wait.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid delay argument
      wait(null)
    );
    assert.throws(() => wait(Infinity));
    // @ts-expect-error testing invalid options argument
    assert.throws(() => wait(0, null));
    // @ts-expect-error testing invalid signal argument
    assert.throws(() => wait(0, { signal: {} }));
  });

  test("Checks for calling of fn with 1000ms delay", async () => {
    const callback = mock.fn();
    const delay = 100;
    const promise = wait(delay).finally(() => {
      callback();
    });
    assert.strictEqual(callback.mock.callCount(), 0);
    await promise;
    assert.strictEqual(callback.mock.callCount(), 1);
  });

  test("Rejects when cancellation is already requested", async () => {
    const controller = new AbortController();
    const reason = new Error("already stopped");
    controller.abort(reason);

    await assert.rejects(wait(100, { signal: controller.signal }), reason);
  });

  test("Cancels a pending delay and preserves the abort reason", async () => {
    const controller = new AbortController();
    const reason = new Error("component disposed");
    const promise = wait(100, { signal: controller.signal });

    controller.abort(reason);

    await assert.rejects(promise, reason);
  });

});
