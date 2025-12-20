/**
 * Gets a formatted string with thousands separators from given number. This is a simple formatter for integer parts and does not handle locales or decimals.
 *
 * @param {number} num Source number
 * @param {string} [separator=" "] Separator to insert between each group of three digits
 * @returns {string} Formatted string
 * @example
 * getStrWithThousandSeparator(1000000, ","); // "1,000,000"
 */
export const getStrWithThousandSeparator = (num: number, separator: string = " "): string => {
  if (!Number.isFinite(num)) {
    throw new TypeError("getStrWithThousandSeparator: num must be a finite number");
  }
  if (typeof separator !== "string") {
    throw new TypeError("getStrWithThousandSeparator: separator must be a string");
  }
  // eslint-disable-next-line security/detect-unsafe-regex
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
