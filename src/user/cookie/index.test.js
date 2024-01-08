import { setCookie, getCookie } from "./index.js";

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
