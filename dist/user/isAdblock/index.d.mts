export type TIsAdblockArgs = Parameters<typeof isAdblock>;
export type TIsAdblockReturn = ReturnType<typeof isAdblock>;
/**
 * Detects if an ad-blocker likely hides known ad-related elements.
 * Implementation detail:
 * Injects a hidden container with an "ad-like" child element
 * Measures computed style after a tick to infer blocking
 *
 * @returns {boolean} True if ad-blocking likely detected
 * @example
 * const blocked = isAdblock();
 * console.log(blocked); // => false
 */
export declare const isAdblock: () => boolean;
