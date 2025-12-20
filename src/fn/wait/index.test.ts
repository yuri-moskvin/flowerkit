import { wait } from "./index.ts";

describe(wait.name, () => {

  test("Checks for invalid args", () => {
    expect(() => wait(null as any)).toThrow();
    expect(() => wait(Infinity)).toThrow();
  });

  test("Checks for calling of fn with 1000ms delay", () => {
    const callback = jest.fn();
    const delay = 1000;
    wait(delay)
      .finally(() => {
        callback();
      });
    expect(callback).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
    }, delay);
  });

});
