export type TIsMobileDeviceArgs = Parameters<typeof isMobileDevice>;
export type TIsMobileDeviceReturn = ReturnType<typeof isMobileDevice>;
/**
 * Heuristically detects if the current browser is on a mobile device via UA checks.  UA-based detection can be unreliable. Prefer feature detection when possible.
 * @returns {boolean} True if likely a mobile browser
 * @example
 * const isMobile = isMobileDevice(); // => boolean
 * @example
 * // Select a mobile navigation variant when UA-based detection is acceptable
 * const navigationVariant = isMobileDevice() ? "drawer" : "sidebar";
 */
export declare const isMobileDevice: () => boolean;
