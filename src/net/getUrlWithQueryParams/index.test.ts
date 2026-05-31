import { getWindow } from "ssr-window";
import assert from "node:assert";
import { describe, test } from "node:test";
import { getUrlWithQueryParams } from "./index.ts";

describe(getUrlWithQueryParams.name, () => {

  const fd = new FormData();
  fd.append("foo", "123");

  const fallbackUrl: string = getWindow().location.href;

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getUrlWithQueryParams(0 as unknown as string)
    );
    assert.throws(() =>
      getUrlWithQueryParams(
        "",
        null as unknown as FormData
      )
    , TypeError);
  });

  test("Checks for empty URL", () => {
    assert.strictEqual(getUrlWithQueryParams("", { foo: 123 }), `${fallbackUrl}?foo=123`);
    assert.strictEqual(getUrlWithQueryParams("", fd), `${fallbackUrl}?foo=123`);
  });

  test("Checks for parts of URL", () => {
    assert.strictEqual(getUrlWithQueryParams("/api/users/?test=1", fd), `${fallbackUrl}api/users/?test=1&foo=123`);
    assert.strictEqual(getUrlWithQueryParams("/api/users/?test=1", { test: 2 }), `${fallbackUrl}api/users/?test=2`);
  });

  test("Checks for valid URL", () => {
    assert.strictEqual(getUrlWithQueryParams("https://google.com/?test=1", { foo: 123 }), "https://google.com/?test=1&foo=123");
  });

  test("Checks query value encoding", () => {
    assert.strictEqual(
      getUrlWithQueryParams("https://example.com", { foo: "1&x=2" }),
      "https://example.com/?foo=1%26x%3D2"
    );
  });

});
