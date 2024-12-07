import { getThrottledFn } from "./index.js";

describe(getThrottledFn.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getThrottledFn("")).toThrow();
    expect(() => getThrottledFn(() => {}, null)).toThrow();
  });

  test("Checks for throttling with 2000ms delay", () => {

    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    const delay = 2000;

    const fn = jest.fn();
    getThrottledFn(fn, delay)();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);

  });
});
