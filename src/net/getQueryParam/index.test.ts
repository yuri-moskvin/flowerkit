import assert from "node:assert";
import { describe, test } from "node:test";
import { getQueryParam } from "./index.ts";

describe(getQueryParam.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid name argument
    assert.throws(() => getQueryParam(null), TypeError);
  });

  test("Returns the first value or null", () => {
    assert.strictEqual(getQueryParam("tag", "?tag=a&tag=b"), "a");
    assert.strictEqual(getQueryParam("missing", "?tag=a"), null);
  });
});
