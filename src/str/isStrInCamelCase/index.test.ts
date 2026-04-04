import assert from "node:assert";
import { describe, test } from "node:test";
import { isStrInCamelCase } from "./index.ts";

describe(isStrInCamelCase.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrInCamelCase(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrInCamelCase(null)
    );
  });

  test("Checks strings in different cases", () => {
    assert.strictEqual(isStrInCamelCase("not_Camel"), false);
    assert.strictEqual(isStrInCamelCase(".class"), false);
    assert.strictEqual(isStrInCamelCase("000"), false);
    assert.strictEqual(isStrInCamelCase("camel Case test"), false);
    assert.strictEqual(isStrInCamelCase("word"), false);
    assert.strictEqual(isStrInCamelCase("Word"), false);
    assert.strictEqual(isStrInCamelCase("WORD"), false);
  });

  test("Check valid camelCase", () => {
    assert.strictEqual(isStrInCamelCase("abcDef"), true);
  });

});
