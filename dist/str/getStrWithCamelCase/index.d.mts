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
export declare const getStrWithCamelCase: (str: string) => string;
