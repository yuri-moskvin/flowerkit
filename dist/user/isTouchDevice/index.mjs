import{getWindow,getDocument}from"ssr-window";
/**
 * Detects if the current device likely has a touch screen.
 * Avoids false positives from non-browser envs (like `jsdom`).
 * @example
 * const isTouchScreen = isTouchDevice(); // {boolean}
 * @returns {boolean}
 */const isTouchDevice=()=>{const win=getWindow();const doc=getDocument();const isRealDocument=!!(doc&&typeof doc.createElement==="function"&&doc.nodeType===9);const isJsdom=typeof win?.navigator?.userAgent==="string"&&/\bjsdom\b/i.test(win.navigator.userAgent);const isHasTouchEvent=!!(typeof win!=="undefined"&&"ontouchstart"in win&&isRealDocument&&!isJsdom);return!!(isHasTouchEvent||typeof win.navigator?.maxTouchPoints!=="undefined"&&win.navigator.maxTouchPoints||typeof win.navigator.msMaxTouchPoints!=="undefined"&&win.navigator.msMaxTouchPoints||win.DocumentTouch&&doc instanceof win.DocumentTouch||win.navigator?.msPointerEnabled&&win.MSGesture)};export{isTouchDevice};
//# sourceMappingURL=index.mjs.map
