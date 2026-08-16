import assert from "node:assert";
import { describe, test } from "node:test";
import { getAsyncPool } from "./index.ts";
import { wait } from "../wait/index.ts";

describe(getAsyncPool.name, () => {
  test("Checks validation", async () => {
    // @ts-expect-error testing invalid array argument
    await assert.rejects(getAsyncPool(null, async () => 0), TypeError);
    // @ts-expect-error testing invalid callback argument
    await assert.rejects(getAsyncPool([], null), TypeError);
    await assert.rejects(getAsyncPool([], async () => 0, 0), TypeError);
    // @ts-expect-error testing invalid options argument
    await assert.rejects(getAsyncPool([], async () => 0, null), TypeError);
    await assert.rejects(
      // @ts-expect-error testing invalid settle option
      getAsyncPool([], async () => 0, { settle: "yes" }),
      TypeError
    );
    await assert.rejects(
      // @ts-expect-error testing invalid signal option
      getAsyncPool([], async () => 0, { signal: {} }),
      TypeError
    );
  });

  test("Limits concurrency and preserves result order", async () => {
    let active = 0;
    let peak = 0;
    const result: number[] = await getAsyncPool([ 30, 5, 10, 1 ], async (delay, index) => {
      active += 1;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, delay));
      active -= 1;
      return index;
    }, 2);
    assert.deepStrictEqual(result, [ 0, 1, 2, 3 ]);
    assert.strictEqual(peak, 2);
  });

  test("Uses defaults for omitted and undefined options", async () => {
    const configured: number[] = await getAsyncPool([ 1 ], async (value) => value, {
      concurrency: 1,
    });
    const undefinedOptions = await getAsyncPool([ 1 ], async (value) => value, {
      concurrency: undefined,
      settle: undefined,
      signal: undefined,
    });

    assert.deepStrictEqual(configured, [ 1 ]);
    assert.deepStrictEqual(undefinedOptions, [ 1 ]);
  });

  test("Collects fulfilled and rejected results in settle mode", async () => {
    const result: PromiseSettledResult<number>[] = await getAsyncPool([ 1, 2, 3 ], async (value) => {
      if (value === 2) {
        throw new Error("invalid item");
      }
      return value * 2;
    }, { concurrency: 2, settle: true });

    assert.deepStrictEqual(result, [
      { status: "fulfilled", value: 2 },
      { reason: new Error("invalid item"), status: "rejected" },
      { status: "fulfilled", value: 6 },
    ]);
  });

  test("Aborts active callbacks and prevents new work", async () => {
    const controller = new AbortController();
    const reason = new Error("uploads canceled");
    let started = 0;
    let notifyStarted: (() => void) | undefined;
    const firstStarted = new Promise<void>((resolve) => {
      notifyStarted = resolve;
    });
    const pool = getAsyncPool([ 1, 2, 3 ], async (value, index, array, signal) => {
      started += 1;
      notifyStarted?.();
      await wait(100, { signal });
      return value;
    }, { concurrency: 1, signal: controller.signal });

    await firstStarted;
    controller.abort(reason);

    await assert.rejects(pool, reason);
    assert.strictEqual(started, 1);
  });

  test("Rejects promptly when an active callback ignores its signal", async () => {
    const controller = new AbortController();
    const reason = new Error("stop waiting");
    let notifyStarted: (() => void) | undefined;
    let resolveWork: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
      notifyStarted = resolve;
    });
    const pool = getAsyncPool([ 1 ], async () => {
      notifyStarted?.();
      await new Promise<void>((resolve) => {
        resolveWork = resolve;
      });
      return 1;
    }, { signal: controller.signal });

    await started;
    controller.abort(reason);

    await assert.rejects(pool, reason);
    resolveWork?.();
  });

  test("Aborts sibling callbacks after a worker error", async () => {
    const reason = new Error("upload failed");
    let siblingAborted = false;
    const pool = getAsyncPool([ 1, 2 ], async (value, index, array, signal) => {
      if (value === 2) {
        throw reason;
      }
      await new Promise<void>((resolve) => {
        signal.addEventListener("abort", () => {
          siblingAborted = true;
          resolve();
        }, { once: true });
      });
      return value;
    }, { concurrency: 2 });

    await assert.rejects(pool, reason);
    assert.strictEqual(siblingAborted, true);
  });

  test("Rejects immediately when the supplied signal is aborted", async () => {
    const controller = new AbortController();
    const reason = new Error("not started");
    controller.abort(reason);

    await assert.rejects(
      getAsyncPool([], async () => 0, { signal: controller.signal }),
      reason
    );
  });
});
