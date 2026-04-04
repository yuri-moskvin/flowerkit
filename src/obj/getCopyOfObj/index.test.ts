import assert from "node:assert";
import { describe, test } from "node:test";
import { getCopyOfObj } from "./index.ts";

describe(getCopyOfObj.name, () => {

  test("Checks for Date instance", () => {
    const stamp = new Date();
    const copy = getCopyOfObj(stamp as any);
    assert.strictEqual(stamp === copy, true);
  });

  test("Checks for other types", () => {
    const number = 1;
    const str = "1";
    assert.strictEqual(number === getCopyOfObj(number as any), true);
    assert.strictEqual(str === getCopyOfObj(str as any), true);
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

    assert.notStrictEqual((obj1 as any).a, (copy1 as any).a);
    assert.strictEqual(obj2.a, copy2.a);
  });

});
