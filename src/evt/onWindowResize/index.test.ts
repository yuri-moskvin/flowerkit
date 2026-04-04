import { getWindow } from "ssr-window";
import assert from "node:assert";
import {
  describe, test, mock, before,
} from "node:test";
import { onWindowResize } from "./index.ts";
import { bubble } from "../bubble/index.ts";

describe(onWindowResize.name, () => {

  before(() => {
    if (typeof window !== "undefined") {
      if (window.CustomEvent !== (globalThis as any).CustomEvent) {
        (globalThis as any).CustomEvent = window.CustomEvent;
      }
      if (typeof (globalThis as any).dispatchEvent === "undefined") {
        (globalThis as any).dispatchEvent = () => true;
      }
    }
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid callback argument
      onWindowResize(null)
    );
    assert.throws(() =>
      onWindowResize(
        () => {},
        // @ts-expect-error testing invalid delay argument
        null
      )
    );
  });

  test("Checks for removing listeners", async () => {
    const spy = mock.fn();
    const callback = () => spy();
    const delay = 0;

    const { removeListener } = onWindowResize(callback, delay);

    bubble(getWindow(), "resize");
    assert.strictEqual(spy.mock.callCount() > 0, true);

    await new Promise((resolve) => setTimeout(resolve, delay + 10));
    assert.strictEqual(spy.mock.callCount(), 1);
    removeListener();
    bubble(getWindow(), "resize");
    assert.strictEqual(spy.mock.callCount(), 1);
  });

});
