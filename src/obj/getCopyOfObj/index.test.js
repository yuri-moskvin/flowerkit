import { getCopyOfObj } from "./index.js";

describe(getCopyOfObj.name, () => {

  test("Checks for Date instance", () => {
    const stamp = new Date();
    const copy = getCopyOfObj(stamp);
    expect(stamp === copy).toBe(true);
  });

  test("Checks for other types", () => {
    const number = 1;
    const str = "1";
    expect(number === getCopyOfObj(number)).toBe(true);
    expect(str === getCopyOfObj(str)).toBe(true);
  });

  test("Checks for nested objects", () => {
    const obj1 = {
      a: "moo",
      b: {
        foo: "1"
      }
    };
    const copy1 = getCopyOfObj(obj1);
    copy1.a = "foo";

    const obj2 = {
      a: "doo"
    };
    const copy2 = obj2;
    copy2.a = "boo";

    expect(obj1.a).not.toBe(copy1.a);
    expect(obj2.a).toBe(copy2.a);
  });

});
