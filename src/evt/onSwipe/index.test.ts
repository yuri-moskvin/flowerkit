import assert from "node:assert";
import {
  describe, test, mock, before,
} from "node:test";
import { onSwipe } from "./index.ts";

describe(onSwipe.name, () => {

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
      // @ts-expect-error testing invalid el argument
      onSwipe("moo")
    );
    assert.throws(() =>
      onSwipe(
        document, {
          minDist: Infinity,
        }
      )
    );
    assert.throws(() =>
      onSwipe(
        document, {
          // @ts-expect-error testing invalid callback argument
          callback: [],
        }
      )
    );
  });

  test("Checks for correct swipe callback", () => {
    document.body.innerHTML = `<div id="swipe" style="width: 500px; height: 500px;"></div>`;
    const block = document.getElementById("swipe") as HTMLElement;
    const callback = mock.fn();

    const { removeListener, handler } = onSwipe(block, {
      callback,
      minDist: 10,
      maxDist: 1000,
      minTime: 50,
      maxTime: 5000,
    });

    const originalDateNow = Date.now;
    let mockTime = 1000;
    Date.now = mock.fn(() => mockTime);

    try {
      // Manually trigger handlers with synthetic events
      const createEvent = (pageX: number, pageY: number, swipeType?: string) => {
        const detail: any = { _pageX: pageX, _pageY: pageY };
        if (swipeType) {
          detail._swipeType = swipeType;
        }
        return new CustomEvent("test", { detail });
      };

      handler.start(createEvent(50, 0));

      mockTime += 100;
      handler.move(createEvent(150, 0));

      mockTime += 100;
      handler.end(createEvent(150, 0, "right"));

      assert.strictEqual(callback.mock.callCount(), 1);

      mockTime += 100;
      handler.move(createEvent(250, 0));
      mockTime += 100;
      handler.end(createEvent(250, 0));
      assert.strictEqual(callback.mock.callCount(), 1);

      if (callback.mock.calls.length > 0) {
        const detail = callback.mock.calls[0].arguments[0];
        assert.strictEqual(detail.dir, "right");
        assert.strictEqual(detail.dist, 100);
        assert.strictEqual(detail.time, 200);
      }
    } finally {
      Date.now = originalDateNow;
      removeListener();
    }
  });


});
