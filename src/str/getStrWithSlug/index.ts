export type TGetStrWithSlugArgs = Parameters<typeof getStrWithSlug>;

export type TGetStrWithSlugReturn = ReturnType<typeof getStrWithSlug>;

/**
 * Creates a lowercase Unicode slug. Diacritics are removed, while non-Latin
 * letters such as Cyrillic are preserved.
 * @param {string} str Source string
 * @param {{ separator?: string; locale?: string; }} [options={}] Slug options
 * @returns {string} Slug
 * @throws {TypeError} getStrWithSlug: str must be a string
 * @throws {TypeError} getStrWithSlug: separator must be a non-empty string
 * @example
 * getStrWithSlug("Café: Привет мир!"); // "cafe-привет-мир"
 * @example
 * // Create an SEO-friendly article pathname with a custom separator
 * const pathname = `/blog/${getStrWithSlug(article.title, { separator: "-" })}`;
 */
export const getStrWithSlug = (
  str: string,
  options: { separator?: string; locale?: string; } = {}
): string => {
  if (typeof str !== "string") {
    throw new TypeError("getStrWithSlug: str must be a string");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getStrWithSlug: options must be a plain object");
  }
  const { separator = "-", locale } = options;
  if (typeof separator !== "string" || separator.length === 0) {
    throw new TypeError("getStrWithSlug: separator must be a non-empty string");
  }
  if (locale !== undefined && typeof locale !== "string") {
    throw new TypeError("getStrWithSlug: locale must be a string if provided");
  }

  return str
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLocaleLowerCase(locale)
    .replace(/[^\p{L}\p{N}]+/gu, () => separator)
    .split(separator)
    .filter(Boolean)
    .join(separator);
};
