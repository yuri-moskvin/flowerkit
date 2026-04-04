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
});
