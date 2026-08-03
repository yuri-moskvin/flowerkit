export type TIsTouchDeviceArgs = Parameters<typeof isTouchDevice>;
export type TIsTouchDeviceReturn = ReturnType<typeof isTouchDevice>;
/**
 * Detects if the current device likely has a touch screen.
 * Avoids false positives from non-browser envs (like `jsdom`).
 * @example
 * const isTouchScreen = isTouchDevice(); // {boolean}
 * @example
 * // Increase control sizes for devices that support touch input
 * document.documentElement.classList.toggle("has-touch", isTouchDevice());
 * @returns {boolean}
 */
export declare const isTouchDevice: () => boolean;
