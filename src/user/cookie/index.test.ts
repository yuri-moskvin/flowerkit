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

  test("Does not mutate cookie options", () => {
    const expires = new Date("2030-01-01T00:00:00Z");
    const options = { expires, path: "/" };

    setCookie("IMMUTABLE_COOKIE_OPTIONS", "value", options);

    assert.strictEqual(options.expires, expires);
    assert.ok(options.expires instanceof Date);
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
