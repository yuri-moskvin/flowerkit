import { bubble } from "../bubble/index.js";
import { onSwipe } from "./index.js";

describe(onSwipe.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onSwipe("moo")).toThrow();
    expect(() => onSwipe(document, {
      minDist: Infinity
    })).toThrow();
    expect(() => onSwipe(document, {
      callback: []
    })).toThrow();
  });

  test("Checks for correct swipe callback", () => {
    document.body.innerHTML = `<div id="swipe"></div>`;
    const block = document.getElementById("swipe");
    const callback = jest.fn();

    onSwipe(block, {
      callback,
      minDist: 0,
      maxDist: 0,
      maxTime: 0,
      minTime: 0,
    });

    expect(block).toHaveProperty("_swipeCtrl");

    bubble(block, "mousedown", { _pageX: 50, _pageY: 0 });

    expect(callback).not.toHaveBeenCalled();

    bubble(block, "mousemove", { _pageX: 100, _pageY: 0 });

    expect(callback).not.toHaveBeenCalled();

    bubble(block, "mouseup", { _swipeType: "right" });

    expect(callback).toHaveBeenCalledTimes(1);

    block._swipeCtrl.destroy();

    expect(block).not.toHaveProperty("_swipeCtrl");

    bubble(block, "mousedown", { _pageX: 50, _pageY: 0 });

    expect(callback).toHaveBeenCalledTimes(1);

    bubble(block, "mousemove", { _pageX: 100, _pageY: 0 });

    expect(callback).toHaveBeenCalledTimes(1);

    bubble(block, "mouseup", { _swipeType: "right" });

    expect(callback).toHaveBeenCalledTimes(1);
  });


});
