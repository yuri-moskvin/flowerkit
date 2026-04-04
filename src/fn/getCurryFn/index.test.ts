import assert from "node:assert";
import { describe, test } from "node:test";
import { getCurryFn } from "./index.ts";


describe(getCurryFn.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getCurryFn(
        // @ts-expect-error testing invalid fn argument
        null, 1
      )
    );
    assert.throws(() =>
      getCurryFn(
        (() => {}),
        // @ts-expect-error testing invalid count argument
        false
      )
    );
  });

  test("Checks for correct curry", () => {
    const origFn = (a = 0, b = 0, c = 0) => a + b + c;
    const fn1 = getCurryFn(origFn as any, 1);
    const fn2 = getCurryFn(origFn as any, 2);

    assert.strictEqual(fn1(1), 1);
    assert.strictEqual(fn2(1)(2), 3);
  });

});
