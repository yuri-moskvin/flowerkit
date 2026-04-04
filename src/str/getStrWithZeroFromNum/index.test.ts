import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithZeroFromNum } from "./index.ts";

describe(getStrWithZeroFromNum.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid num argument
      getStrWithZeroFromNum("123")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid num argument
      getStrWithZeroFromNum(null)
    );
  });

  test("Checks for numbers", () => {
    assert.strictEqual(getStrWithZeroFromNum(123), "123");
    assert.strictEqual(getStrWithZeroFromNum(1), "01");
    assert.strictEqual(getStrWithZeroFromNum(-100), "-100");
    assert.strictEqual(getStrWithZeroFromNum(-1), "-01");
    assert.strictEqual(getStrWithZeroFromNum(-10), "-10");
    assert.strictEqual(getStrWithZeroFromNum(0), "00");
  });

  test("Checks for custom leading count of numbers", () => {
    assert.strictEqual(getStrWithZeroFromNum(-10, 5), "-00010");
  });

});
