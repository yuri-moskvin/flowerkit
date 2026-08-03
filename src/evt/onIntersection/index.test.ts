import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { onIntersection } from "./index.ts";

describe(onIntersection.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid elements argument
    assert.throws(() => onIntersection(null, () => {}), TypeError);
    // @ts-expect-error testing invalid callback argument
    assert.throws(() => onIntersection(document.body, null), TypeError);
  });

  test("Observes and disconnects", () => {
    const original = globalThis.IntersectionObserver;
    const observe = mock.fn();
    const disconnect = mock.fn();
    globalThis.IntersectionObserver = class {

      disconnect = disconnect;

      observe = observe;

      root = null;

      rootMargin = "0px";

      scrollMargin = "0px";

      thresholds = [];

      takeRecords = () => {
        return [];
      };

      unobserve = () => {

      };

    };
    try {
      const elements = [ document.createElement("div"), document.createElement("div") ];
      const listener = onIntersection(elements, () => {});
      assert.strictEqual(observe.mock.callCount(), 2);
      listener.disconnect();
      assert.strictEqual(disconnect.mock.callCount(), 1);
    } finally {
      globalThis.IntersectionObserver = original;
    }
  });
});
