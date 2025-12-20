import { getCurryFn } from "./index.ts";


describe(getCurryFn.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCurryFn(null as any, 1)).toThrow();
    expect(() => getCurryFn((() => {}) as any, false as any)).toThrow();
  });

  test("Checks for correct curry", () => {
    const origFn = (a = 0, b = 0, c = 0) => a + b + c;
    const fn1 = getCurryFn(origFn as any, 1);
    const fn2 = getCurryFn(origFn as any, 2);

    expect(fn1(1)).toBe(1);
    expect(fn2(1)(2)).toBe(3);
  });

});
