import assert from "node:assert";
import { describe, test } from "node:test";
import { getQueryParams } from "./index.ts";

describe(getQueryParams.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid input argument
    assert.throws(() => getQueryParams(null), TypeError);
  });

  test("Reads URLs and preserves repeated values", () => {
    const result = getQueryParams("https://example.com/page?tag=a&tag=b&page=1");
    assert.strictEqual(Object.getPrototypeOf(result), null);
    assert.deepStrictEqual(result.tag, [ "a", "b" ]);
    assert.strictEqual(result.page, "1");
    assert.deepStrictEqual(getQueryParams("?empty=&encoded=a%20b"), Object.assign(Object.create(null), {
      empty: "",
      encoded: "a b",
    }));
    assert.deepStrictEqual(getQueryParams("flag"), Object.assign(Object.create(null), {
      flag: "",
    }));
  });
});
