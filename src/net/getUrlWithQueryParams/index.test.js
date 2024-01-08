import { getUrlWithQueryParams } from "./index.js";

describe(getUrlWithQueryParams.name, () => {

  const fd = new FormData();
  fd.append("foo", 123);

  test("Checks for invalid args", () => {
    expect(() => getUrlWithQueryParams(0)).toThrow();
    expect(() => getUrlWithQueryParams("", null)).toThrow();
  });

  test("Checks for empty URL", () => {
    expect(getUrlWithQueryParams("", { foo: 123 })).toBe("http://localhost/?foo=123");
    expect(getUrlWithQueryParams("", fd)).toBe("http://localhost/?foo=123");
  });

  test("Checks for parts of URL", () => {
    expect(getUrlWithQueryParams("/api/users/?test=1", fd)).toBe("http://localhost/api/users/?test=1&foo=123");
    expect(getUrlWithQueryParams("/api/users/?test=1", { test: 2 })).toBe("http://localhost/api/users/?test=2");
  });

  test("Checks for valid URL", () => {
    expect(getUrlWithQueryParams("https://google.com/?test=1", fd)).toBe("https://google.com/?test=1&foo=123");
  });

});
