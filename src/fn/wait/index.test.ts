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

});
