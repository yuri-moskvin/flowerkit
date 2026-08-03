import { getWindow, getDocument } from "ssr-window";

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
export const isTouchDevice = (): boolean => {
  const win = getWindow();
  const doc = getDocument();
  const navigator = win.navigator as Navigator & {
    msMaxTouchPoints?: number;
    msPointerEnabled?: boolean;
  };

  const isRealDocument = !!(doc && typeof doc.createElement === "function" && doc.nodeType === 9);

  const isJsdom = typeof win?.navigator?.userAgent === "string" && /\bjsdom\b/i.test(win.navigator.userAgent);

  const isHasTouchEvent = !!(typeof win !== "undefined" && "ontouchstart" in win && isRealDocument && !isJsdom);

  return !!(
    isHasTouchEvent
    || (typeof navigator?.maxTouchPoints !== "undefined" && navigator.maxTouchPoints)
    || (typeof navigator?.msMaxTouchPoints !== "undefined" && navigator.msMaxTouchPoints)
    || ((win as any).DocumentTouch && doc instanceof (win as any).DocumentTouch)
    || (navigator?.msPointerEnabled && (win as any).MSGesture)
  );
};
