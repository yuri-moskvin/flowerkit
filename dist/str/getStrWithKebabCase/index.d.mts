export type TGetStrWithKebabCaseArgs = Parameters<typeof getStrWithKebabCase>;
export type TGetStrWithKebabCaseReturn = ReturnType<typeof getStrWithKebabCase>;
/**
 * Converts a string to kebab-case.
 * @param {string} str Source string
 * @returns {string} kebab-case string
 * @throws {TypeError} getStrWithKebabCase: str must be a string
 * @example
 * getStrWithKebabCase("helloWorld value"); // "hello-world-value"
 * @example
 * // Convert a component variant into a CSS class modifier
 * const modifier = `button--${getStrWithKebabCase(variantName)}`;
 */
export declare const getStrWithKebabCase: (str: string) => string;
