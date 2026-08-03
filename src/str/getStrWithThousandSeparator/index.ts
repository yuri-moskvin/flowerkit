export type TGetStrWithThousandSeparatorArgs = Parameters<typeof getStrWithThousandSeparator>;

export type TGetStrWithThousandSeparatorReturn = ReturnType<typeof getStrWithThousandSeparator>;

/**
 * Gets a formatted string with thousands separators in the integer part of a number.
 *
 * @param {number} num Source number
 * @param {string} [separator=" "] Separator to insert between each group of three digits
 * @returns {string} Formatted string
 * @example
 * getStrWithThousandSeparator(1000000, ","); // "1,000,000"
 * @example
 * // Format a dashboard counter with narrow no-break spaces
 * const views = getStrWithThousandSeparator(1_250_000, "\u202f");
 */
export const getStrWithThousandSeparator = (num: number, separator: string = " "): string => {
  if (!Number.isFinite(num)) {
    throw new TypeError("getStrWithThousandSeparator: num must be a finite number");
  }
  if (typeof separator !== "string") {
    throw new TypeError("getStrWithThousandSeparator: separator must be a string");
  }
  const [ mantissa, exponent ] = num.toString().split("e");
  const [ integer, fraction ] = mantissa.split(".");
  // eslint-disable-next-line security/detect-unsafe-regex
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${formattedInteger}${fraction === undefined ? "" : `.${fraction}`}${exponent === undefined ? "" : `e${exponent}`}`;
};
