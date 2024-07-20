import { bubble } from "../bubble/index.js";
import { onWindowResize } from "./index.js";

describe(onWindowResize.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onWindowResize(null)).toThrow();
    expect(() => onWindowResize(() => {}, null)).toThrow();
  });

  test("Checks for removing listeners", () => {
    jest.useFakeTimers();

    const spy = jest.fn();
    const callback = () => spy();
    const delay = 0;

    const { removeListener } = onWindowResize(callback, delay);

    bubble(window, "resize");
    expect(spy).toHaveBeenCalled();

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      removeListener();
      bubble(window, "resize");
      expect(spy).toHaveBeenCalledTimes(1);
    }, delay);

    jest.runAllTimers();
  });

});
