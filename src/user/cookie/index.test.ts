import assert from "node:assert";
import { describe, test } from "node:test";
import { setCookie, getCookie, deleteCookie } from "./index.ts";

describe(setCookie.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      setCookie(
        // @ts-expect-error testing invalid name argument
        123, ""
      )
    );
    assert.throws(() =>
      setCookie(
        "test",
        // @ts-expect-error testing invalid value argument
        123
      )
    );
    assert.throws(() =>
      setCookie(
        "test",
        "val",
        // @ts-expect-error testing invalid options argument
        null
      )
    );
  });

});

describe(getCookie.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid name argument
      getCookie(123)
    );
  });

  test("Checks for existing Cookies", () => {
    setCookie("TEST_COOKIE_1", "1");
    assert.strictEqual(getCookie("TEST_COOKIE_1"), "1");
  });

  test("Checks for undefined Cookies", () => {
    assert.strictEqual(getCookie("TEST_COOKIE_2"), undefined);
  });

});

describe(deleteCookie.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid name argument
      deleteCookie(123)
    );
  });

  test("Checks for existing Cookies", () => {
    setCookie("TEST_COOKIE_1", "1");
    assert.strictEqual(getCookie("TEST_COOKIE_1"), "1");
  });

  test("Checks for deleting Cookies", () => {
    deleteCookie("TEST_COOKIE_2");
    assert.strictEqual(getCookie("TEST_COOKIE_2"), undefined);
  });

});
