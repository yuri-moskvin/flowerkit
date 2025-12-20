import { getThrottledFn } from "./index.ts";

describe(getThrottledFn.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getThrottledFn("" as any)).toThrow();
    expect(() => getThrottledFn(() => {}, null as any)).toThrow();
  });

  test("Checks for throttling with 2000ms delay", () => {

    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout" as any);

    const delay = 2000;

    const fn = jest.fn();
    getThrottledFn(fn, delay)();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);

  });
});
