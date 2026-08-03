import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { on } from "./index.ts";

describe(on.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid target argument
    assert.throws(() => on(null, "test", () => {}), TypeError);
    assert.throws(() => on(window, "", () => {}), TypeError);
    // @ts-expect-error testing invalid callback argument
    assert.throws(() => on(window, "test", null), TypeError);
  });

  test("Adds and removes a listener", () => {
    const callback = mock.fn();
    const listener = on<CustomEvent<number>>(window, "flowerkit-test", callback);
    window.dispatchEvent(new window.CustomEvent("flowerkit-test", { detail: 1 }));
    assert.strictEqual(callback.mock.callCount(), 1);
    assert.strictEqual(callback.mock.calls[0].arguments[0].detail, 1);
    listener.removeListener();
    window.dispatchEvent(new window.CustomEvent("flowerkit-test", { detail: 2 }));
    assert.strictEqual(callback.mock.callCount(), 1);
  });
});
