import { onSwipe } from "./index.ts";
import { bubble } from "../bubble/index.ts";

describe(onSwipe.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onSwipe("moo" as any)).toThrow();
    expect(() => onSwipe(document as any, {
      minDist: Infinity,
    } as any)).toThrow();
    expect(() => onSwipe(document as any, {
      callback: [] as any,
    } as any)).toThrow();
  });

  test("Checks for correct swipe callback", () => {
    document.body.innerHTML = `<div id="swipe" style="width: 500px; height: 500px;"></div>`;
    const block = document.getElementById("swipe") as HTMLElement;
    const callback = jest.fn();

    jest.mock("../../user/isTouchDevice/index.ts", () => ({
      isTouchDevice: jest.fn(() => false),
    }));

    const { removeListener } = onSwipe(block, {
      callback,
      minDist: 10,
      maxDist: 1000,
      minTime: 50,
      maxTime: 5000,
    });

    const originalDateNow = Date.now;
    let mockTime = 1000;
    Date.now = jest.fn(() => mockTime);

    try {
      bubble(block, "mousedown", { _pageX: 50, _pageY: 0 });

      mockTime += 100;
      bubble(block, "mousemove", { _pageX: 150, _pageY: 0 });

      mockTime += 100;
      bubble(block, "mouseup", { _pageX: 150, _pageY: 0, _swipeType: "right" });

      expect(callback).toHaveBeenCalledTimes(1);

      if (callback.mock.calls.length > 0) {
        const detail = callback.mock.calls[0][0];
        expect(detail.dir).toBe("right");
        expect(detail.dist).toBe(100);
        expect(detail.time).toBe(200);
      }
    } finally {
      Date.now = originalDateNow;
      removeListener();
    }
  });


});
