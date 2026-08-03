export type TGetCurrencyFormattedArgs = Parameters<typeof getCurrencyFormatted>;

export type TGetCurrencyFormattedReturn = ReturnType<typeof getCurrencyFormatted>;

/**
 * Formats a number as currency using `Intl.NumberFormat`.
 * @param {number} num Source number
 * @param {string} currency ISO 4217 currency code
 * @param {Intl.LocalesArgument} [locales] Locale or locales
 * @param {Omit<Intl.NumberFormatOptions,"style"|"currency">} [options={}] Number format options
 * @returns {string} Localized currency value
 * @throws {TypeError} getCurrencyFormatted: num must be a valid number
 * @throws {TypeError} getCurrencyFormatted: currency must be a non-empty string
 * @example
 * getCurrencyFormatted(12.5, "USD", "en-US"); // "$12.50"
 * @example
 * // Format a product price for a Russian storefront
 * const priceLabel = getCurrencyFormatted(product.price, "RUB", "ru-RU", {
 *   maximumFractionDigits: 0,
 * });
 */
export const getCurrencyFormatted = (
  num: number,
  currency: string,
  locales?: Intl.LocalesArgument,
  options: Omit<Intl.NumberFormatOptions, "style" | "currency"> = {}
): string => {
  if (typeof num !== "number" || Number.isNaN(num)) {
    throw new TypeError("getCurrencyFormatted: num must be a valid number");
  }
  if (typeof currency !== "string" || currency.trim().length === 0) {
    throw new TypeError("getCurrencyFormatted: currency must be a non-empty string");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getCurrencyFormatted: options must be a plain object");
  }
  return new Intl.NumberFormat(locales, {
    ...options,
    style: "currency",
    currency,
  }).format(num);
};
