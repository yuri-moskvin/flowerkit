import { setCookie, getCookie, deleteCookie } from "./index.js";

describe(setCookie.name, () => {

  test("Checks for invalid args", () => {
    expect(() => setCookie(123, "")).toThrow();
    expect(() => setCookie("test", 123)).toThrow();
    expect(() => setCookie("test", "val", null)).toThrow();
  });

});

describe(getCookie.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCookie(123)).toThrow();
  });

  test("Checks for existing Cookies", () => {
    setCookie("TEST_COOKIE_1", "1");
    expect(getCookie("TEST_COOKIE_1")).toBe("1");
  });

  test("Checks for undefined Cookies", () => {
    expect(getCookie("TEST_COOKIE_2")).toBe(undefined);
  });

});

describe(deleteCookie.name, () => {

  test("Checks for invalid args", () => {
    expect(() => deleteCookie(123)).toThrow();
  });

  test("Checks for existing Cookies", () => {
    setCookie("TEST_COOKIE_1", "1");
    expect(getCookie("TEST_COOKIE_1")).toBe("1");
  });

  test("Checks for deleting Cookies", () => {
    deleteCookie("TEST_COOKIE_2");
    expect(getCookie("TEST_COOKIE_2")).toBe(undefined);
  });

});
