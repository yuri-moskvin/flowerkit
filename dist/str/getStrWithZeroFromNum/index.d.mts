export type TGetStrWithZeroFromNumArgs = Parameters<typeof getStrWithZeroFromNum>;
export type TGetStrWithZeroFromNumReturn = ReturnType<typeof getStrWithZeroFromNum>;
/**
 * Pads a number with leading zeros to match the desired digit count. Preserves sign for negative numbers.
 *
 * @param {number} num Source number
 * @param {number} [digits=2] Desired total digits for the absolute value
 * @returns {string} Zero-padded string
 * @throws {TypeError} If inputs are invalid
 * @example
 * getStrWithZeroFromNum(9, 3); // "009"
 * getStrWithZeroFromNum(-10, 5); // "-00010"
 */
export declare const getStrWithZeroFromNum: (num: number, digits?: number) => string;
