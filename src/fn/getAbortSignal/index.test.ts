import assert from "node:assert";
import { describe, test } from "node:test";
import { getAbortSignal } from "./index.ts";

describe(getAbortSignal.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid options argument
    assert.throws(() => getAbortSignal(null), TypeError);
    // @ts-expect-error testing invalid signals argument
    assert.throws(() => getAbortSignal({ signals: {} }), TypeError);
    // @ts-expect-error testing invalid signal item
    assert.throws(() => getAbortSignal({ signals: [ {} ] }), TypeError);
    assert.throws(() => getAbortSignal({ timeout: Infinity }), TypeError);
  });

  test("Propagates an external abort reason", () => {
    const external = new AbortController();
    const combined = getAbortSignal({ signals: [ external.signal ] });
    const reason = new Error("component disposed");

    external.abort(reason);

    assert.strictEqual(combined.signal.aborted, true);
    assert.strictEqual(combined.signal.reason, reason);
  });

  test("Supports manual and timeout aborts", async () => {
    const manual = getAbortSignal();
    manual.abort();
    assert.strictEqual(manual.signal.aborted, true);
    assert.strictEqual(manual.signal.reason.name, "AbortError");

    const timed = getAbortSignal({ timeout: 0 });
    await new Promise((resolve) => setTimeout(resolve, 5));
    assert.strictEqual(timed.signal.aborted, true);
    assert.strictEqual(timed.signal.reason.name, "TimeoutError");
  });

  test("Disposes listeners and timeout without aborting", async () => {
    const external = new AbortController();
    const combined = getAbortSignal({ signals: [ external.signal ], timeout: 0 });

    combined.dispose();
    external.abort();
    await new Promise((resolve) => setTimeout(resolve, 5));

    assert.strictEqual(combined.signal.aborted, false);
  });
});
