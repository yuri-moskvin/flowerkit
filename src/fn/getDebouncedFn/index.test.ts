import { getDebouncedFn } from "./index.ts";

describe(getDebouncedFn.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getDebouncedFn("" as any)).toThrow();
    expect(() => getDebouncedFn(() => {}, null as any)).toThrow();
  });

  test("Checks for calling of debounced fn with 1000ms delay", () => {

    jest.useFakeTimers();

    const fn = jest.fn();
    const debouncedFn = getDebouncedFn(fn, 1000);

    debouncedFn();

    jest.advanceTimersByTime(500);
    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
