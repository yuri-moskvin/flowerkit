import { getUrlWithQueryParams } from "./index.ts";

describe(getUrlWithQueryParams.name, () => {

  const fd = new FormData();
  fd.append("foo", "123");

  test("Checks for invalid args", () => {
    expect(() => getUrlWithQueryParams(0 as any)).toThrow();
    expect(() => getUrlWithQueryParams("" as any, null as any)).toThrow();
  });

  test("Checks for empty URL", () => {
    expect(getUrlWithQueryParams("", { foo: 123 } as any)).toBe("http://localhost/?foo=123");
    expect(getUrlWithQueryParams("", fd)).toBe("http://localhost/?foo=123");
  });

  test("Checks for parts of URL", () => {
    expect(getUrlWithQueryParams("/api/users/?test=1", fd)).toBe("http://localhost/api/users/?test=1&foo=123");
    expect(getUrlWithQueryParams("/api/users/?test=1", { test: 2 })).toBe("http://localhost/api/users/?test=2");
  });

  test("Checks for valid URL", () => {
    expect(getUrlWithQueryParams("https://google.com/?test=1", { foo: 123 })).toBe("https://google.com/?test=1&foo=123");
  });

});
