export type TGetStrWithThousandSeparatorArgs = Parameters<typeof getStrWithThousandSeparator>;
export type TGetStrWithThousandSeparatorReturn = ReturnType<typeof getStrWithThousandSeparator>;
/**
 * Gets a formatted string with thousands separators from given number. This is a simple formatter for integer parts and does not handle locales or decimals.
 *
 * @param {number} num Source number
 * @param {string} [separator=" "] Separator to insert between each group of three digits
 * @returns {string} Formatted string
 * @example
 * getStrWithThousandSeparator(1000000, ","); // "1,000,000"
 */
export declare const getStrWithThousandSeparator: (num: number, separator?: string) => string;
