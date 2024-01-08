
import { isStrInSnakeCase } from "./index.js";

describe(isStrInSnakeCase.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isStrInSnakeCase(1)).toThrow();
    expect(() => isStrInSnakeCase(null)).toThrow();
  });

  test("Checks strings in different cases", () => {
    expect(isStrInSnakeCase("not-snake")).toBe(false);
    expect(isStrInSnakeCase(".class")).toBe(false);
    expect(isStrInSnakeCase("000")).toBe(false);
    expect(isStrInSnakeCase("snake_Case_test")).toBe(false);
    expect(isStrInSnakeCase("SNAKE_CASE_TEST")).toBe(false);
    expect(isStrInSnakeCase("---")).toBe(false);
    expect(isStrInSnakeCase("-wrong_snake")).toBe(false);
  });

  test("Checks valid snake_case", () => {
    expect(isStrInSnakeCase("good_snake")).toBe(true);
  });

});
