import { _getCaseWords } from "../_caseWords/index.ts";

export type TGetStrWithCamelCaseArgs = Parameters<typeof getStrWithCamelCase>;

export type TGetStrWithCamelCaseReturn = ReturnType<typeof getStrWithCamelCase>;

/**
 * Converts a string to camelCase.
 * @param {string} str Source string
 * @returns {string} camelCase string
 * @throws {TypeError} getStrWithCamelCase: str must be a string
 * @example
 * getStrWithCamelCase("hello-world value"); // "helloWorldValue"
 * @example
 * // Convert an API field name into a JavaScript property name
 * const propertyName = getStrWithCamelCase("billing-address-id"); // "billingAddressId"
 */
export const getStrWithCamelCase = (str: string): string => {
  if (typeof str !== "string") {
    throw new TypeError("getStrWithCamelCase: str must be a string");
  }
  return _getCaseWords(str)
    .map((word, index) => {
      const normalized = word.toLocaleLowerCase();
      return index === 0
        ? normalized
        : normalized.charAt(0).toLocaleUpperCase() + normalized.slice(1);
    })
    .join("");
};
