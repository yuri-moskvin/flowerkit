import assert from "node:assert";
import { describe, test } from "node:test";
import { isStrInKebabCase } from "./index.ts";

describe(isStrInKebabCase.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrInKebabCase(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrInKebabCase(null)
    );
  });

  test("Checks strings in different cases", () => {
    assert.strictEqual(isStrInKebabCase("not_kebab"), false);
    assert.strictEqual(isStrInKebabCase(".class"), false);
    assert.strictEqual(isStrInKebabCase("000"), false);
    assert.strictEqual(isStrInKebabCase("kebab-Case-test"), false);
    assert.strictEqual(isStrInKebabCase("KEBAB-CASE-TEST"), false);
    assert.strictEqual(isStrInKebabCase("---"), false);
    assert.strictEqual(isStrInKebabCase("-wrong-kebab"), false);
  });

  test("Check valid kebab-case", () => {
    assert.strictEqual(isStrInKebabCase("good-kebab"), true);
  });

});
