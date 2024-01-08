import { getCurryFn } from "./index.js";


describe(getCurryFn.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCurryFn(null, 1)).toThrow();
    expect(() => getCurryFn(() => {}, false)).toThrow();
  });

  test("Checks for correct curry", () => {
    const origFn = (a = 0, b = 0, c = 0) => a + b + c;
    const fn1 = getCurryFn(origFn, 1);
    const fn2 = getCurryFn(origFn, 2);

    expect(fn1(1)).toBe(1);
    expect(fn2(1)(2)).toBe(3);
  });

});
