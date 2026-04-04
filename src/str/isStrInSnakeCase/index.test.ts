import assert from "node:assert";
import { describe, test } from "node:test";
import { isStrInSnakeCase } from "./index.ts";

describe(isStrInSnakeCase.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrInSnakeCase(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrInSnakeCase(null)
    );
  });

  test("Checks strings in different cases", () => {
    assert.strictEqual(isStrInSnakeCase("not-snake"), false);
    assert.strictEqual(isStrInSnakeCase(".class"), false);
    assert.strictEqual(isStrInSnakeCase("000"), false);
    assert.strictEqual(isStrInSnakeCase("snake_Case_test"), false);
    assert.strictEqual(isStrInSnakeCase("SNAKE_CASE_TEST"), false);
    assert.strictEqual(isStrInSnakeCase("---"), false);
    assert.strictEqual(isStrInSnakeCase("-wrong_snake"), false);
  });

  test("Checks valid snake_case", () => {
    assert.strictEqual(isStrInSnakeCase("good_snake"), true);
  });

});
