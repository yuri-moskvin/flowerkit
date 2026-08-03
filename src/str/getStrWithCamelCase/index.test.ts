import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithCamelCase } from "./index.ts";

describe(getStrWithCamelCase.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid string argument
    assert.throws(() => getStrWithCamelCase(null), TypeError);
  });

  test("Converts common word formats", () => {
    assert.strictEqual(getStrWithCamelCase("Hello-world value"), "helloWorldValue");
    assert.strictEqual(getStrWithCamelCase("XMLHttpRequest"), "xmlHttpRequest");
    assert.strictEqual(getStrWithCamelCase(""), "");
  });
});
