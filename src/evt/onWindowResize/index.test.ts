import { onWindowResize } from "./index.ts";
import { bubble } from "../bubble/index.ts";

describe(onWindowResize.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onWindowResize(null as any)).toThrow();
    expect(() => onWindowResize(() => {}, null as any)).toThrow();
  });

  test("Checks for removing listeners", () => {
    jest.useFakeTimers();

    const spy = jest.fn();
    const callback = () => spy();
    const delay = 0;

    const { removeListener } = onWindowResize(callback, delay);

    bubble(window as any, "resize");
    expect(spy).toHaveBeenCalled();

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      removeListener();
      bubble(window as any, "resize");
      expect(spy).toHaveBeenCalledTimes(1);
    }, delay);

    jest.runAllTimers();
  });

});
