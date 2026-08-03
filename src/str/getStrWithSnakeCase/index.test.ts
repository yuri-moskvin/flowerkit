import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithSnakeCase } from "./index.ts";

describe(getStrWithSnakeCase.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid string argument
    assert.throws(() => getStrWithSnakeCase(null), TypeError);
  });

  test("Converts common word formats", () => {
    assert.strictEqual(getStrWithSnakeCase("helloWorld value"), "hello_world_value");
    assert.strictEqual(getStrWithSnakeCase("Привет Мир"), "привет_мир");
  });
});
