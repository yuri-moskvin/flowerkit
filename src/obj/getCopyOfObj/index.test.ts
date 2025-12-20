import { getCopyOfObj } from "./index.ts";

describe(getCopyOfObj.name, () => {

  test("Checks for Date instance", () => {
    const stamp = new Date();
    const copy = getCopyOfObj(stamp as any);
    expect(stamp === copy).toBe(true);
  });

  test("Checks for other types", () => {
    const number = 1;
    const str = "1";
    expect(number === getCopyOfObj(number as any)).toBe(true);
    expect(str === getCopyOfObj(str as any)).toBe(true);
  });

  test("Checks for nested objects", () => {
    const obj1 = {
      a: "moo",
      b: {
        foo: "1",
      },
    };
    const copy1 = getCopyOfObj(obj1 as any);
    (copy1 as any).a = "foo";

    const obj2 = {
      a: "doo",
    };
    const copy2: any = obj2;
    copy2.a = "boo";

    expect((obj1 as any).a).not.toBe((copy1 as any).a);
    expect(obj2.a).toBe(copy2.a);
  });

});
