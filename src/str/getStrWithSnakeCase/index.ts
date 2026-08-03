import { getCaseWords } from "../caseWords.ts";

export type TGetStrWithSnakeCaseArgs = Parameters<typeof getStrWithSnakeCase>;

export type TGetStrWithSnakeCaseReturn = ReturnType<typeof getStrWithSnakeCase>;

/**
 * Converts a string to snake_case.
 * @param {string} str Source string
 * @returns {string} snake_case string
 * @throws {TypeError} getStrWithSnakeCase: str must be a string
 * @example
 * getStrWithSnakeCase("helloWorld value"); // "hello_world_value"
 * @example
 * // Convert an action name into an analytics event key
 * const eventName = getStrWithSnakeCase("Product Added To Cart"); // "product_added_to_cart"
 */
export const getStrWithSnakeCase = (str: string): string => {
  if (typeof str !== "string") {
    throw new TypeError("getStrWithSnakeCase: str must be a string");
  }
  return getCaseWords(str).map((word) => word.toLocaleLowerCase()).join("_");
};
