import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithKebabCase } from "./index.ts";

describe(getStrWithKebabCase.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid string argument
    assert.throws(() => getStrWithKebabCase(null), TypeError);
  });

  test("Converts common word formats", () => {
    assert.strictEqual(getStrWithKebabCase("helloWorld value"), "hello-world-value");
    assert.strictEqual(getStrWithKebabCase("Привет Мир"), "привет-мир");
  });
});
