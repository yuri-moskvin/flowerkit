import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { onMediaQueryChange } from "./index.ts";

describe(onMediaQueryChange.name, () => {
  test("Checks validation", () => {
    assert.throws(() => onMediaQueryChange("", () => {}), TypeError);
    // @ts-expect-error testing invalid callback argument
    assert.throws(() => onMediaQueryChange("(width > 1px)", null), TypeError);
  });

  test("Adds and removes the media query listener", () => {
    const original = window.matchMedia;
    const addEventListener = mock.fn();
    const removeEventListener = mock.fn();
    window.matchMedia = mock.fn(() => ({
      addEventListener,
      matches: false,
      media: "(width > 1px)",
      onchange: null,
      removeEventListener,
    } as unknown as MediaQueryList));
    try {
      const listener = onMediaQueryChange("(width > 1px)", () => {});
      assert.strictEqual(addEventListener.mock.callCount(), 1);
      listener.removeListener();
      assert.strictEqual(removeEventListener.mock.callCount(), 1);
    } finally {
      window.matchMedia = original;
    }
  });
});
