export type TGetNumberFormattedArgs = Parameters<typeof getNumberFormatted>;

export type TGetNumberFormattedReturn = ReturnType<typeof getNumberFormatted>;

/**
 * Formats a number using `Intl.NumberFormat`.
 * @param {number} num Source number
 * @param {Intl.LocalesArgument} [locales] Locale or locales
 * @param {Intl.NumberFormatOptions} [options={}] Number format options
 * @returns {string} Localized number
 * @throws {TypeError} getNumberFormatted: num must be a valid number
 * @example
 * getNumberFormatted(1234.5, "en-US"); // "1,234.5"
 * @example
 * // Format a large analytics metric using compact notation
 * const viewsLabel = getNumberFormatted(1_250_000, "en-US", { notation: "compact" }); // "1.3M"
 */
export const getNumberFormatted = (
  num: number,
  locales?: Intl.LocalesArgument,
  options: Intl.NumberFormatOptions = {}
): string => {
  if (typeof num !== "number" || Number.isNaN(num)) {
    throw new TypeError("getNumberFormatted: num must be a valid number");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getNumberFormatted: options must be a plain object");
  }
  return new Intl.NumberFormat(locales, options).format(num);
};
