import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { onResizeObserved } from "./index.ts";

describe(onResizeObserved.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid elements argument
    assert.throws(() => onResizeObserved(null, () => {}), TypeError);
    // @ts-expect-error testing invalid callback argument
    assert.throws(() => onResizeObserved(document.body, null), TypeError);
  });

  test("Observes with options and disconnects", () => {
    const original = globalThis.ResizeObserver;
    const observe = mock.fn();
    const disconnect = mock.fn();
    globalThis.ResizeObserver = class {

      disconnect = disconnect;

      observe = observe;

      unobserve = () => {

      };

    };
    try {
      const element = document.createElement("div");
      const listener = onResizeObserved(element, () => {}, { box: "border-box" });
      assert.strictEqual(observe.mock.callCount(), 1);
      assert.deepStrictEqual(observe.mock.calls[0].arguments[1], { box: "border-box" });
      listener.disconnect();
      assert.strictEqual(disconnect.mock.callCount(), 1);
    } finally {
      globalThis.ResizeObserver = original;
    }
  });
});
