import assert from "node:assert";
import { describe, test } from "node:test";
import { getLatestAsyncFn } from "./index.ts";
import { wait } from "../wait/index.ts";

describe(getLatestAsyncFn.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid function argument
    assert.throws(() => getLatestAsyncFn(null), TypeError);
    // @ts-expect-error testing invalid options argument
    assert.throws(() => getLatestAsyncFn(async () => 1, null), TypeError);
    // @ts-expect-error testing invalid signal argument
    assert.throws(() => getLatestAsyncFn(async () => 1, { signal: {} }), TypeError);
  });

  test("Aborts a superseded call and resolves the latest call", async () => {
    const latest = getLatestAsyncFn(async (
      signal,
      value: string,
      delay: number
    ) => {
      await wait(delay, { signal });
      return value;
    });

    const first = latest("first", 50);
    await Promise.resolve();
    const second = latest("second", 0);

    await assert.rejects(first, (error: DOMException) => error.name === "AbortError");
    assert.strictEqual(await second, "second");
    assert.strictEqual(latest.pending(), false);
  });

  test("Rejects a superseded call even when the source ignores its signal", async () => {
    let resolveFirst: ((value: string) => void) | undefined;
    const latest = getLatestAsyncFn(async (signal, value: string) => {
      assert.strictEqual(signal instanceof AbortSignal, true);
      if (value === "first") {
        return await new Promise<string>((resolve) => {
          resolveFirst = resolve;
        });
      }
      return value;
    });

    const first = latest("first");
    await Promise.resolve();
    const second = latest("second");

    await assert.rejects(first, (error: DOMException) => error.name === "AbortError");
    assert.strictEqual(await second, "second");
    resolveFirst?.("ignored result");
  });

  test("Honors a lifecycle signal and manual cancellation", async () => {
    const lifecycle = new AbortController();
    const latest = getLatestAsyncFn(
      async (signal) => await wait(50, { signal }),
      { signal: lifecycle.signal }
    );
    const lifecycleCall = latest();
    const lifecycleReason = new Error("unmounted");
    lifecycle.abort(lifecycleReason);
    await assert.rejects(lifecycleCall, lifecycleReason);

    const manual = getLatestAsyncFn(async (signal) => await wait(50, { signal }));
    const manualCall = manual();
    const manualReason = new Error("stopped");
    manual.cancel(manualReason);
    await assert.rejects(manualCall, manualReason);
    assert.strictEqual(manual.pending(), false);
  });

  test("Preserves the source function context", async () => {
    const source = {
      prefix: "item",
      load: getLatestAsyncFn(function (
        this: { prefix: string; },
        signal,
        id: number
      ) {
        assert.strictEqual(signal.aborted, false);
        return `${this.prefix}-${id}`;
      }),
    };

    assert.strictEqual(await source.load(3), "item-3");
  });
});
