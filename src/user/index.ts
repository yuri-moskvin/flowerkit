
export type { TCopyToClipboardArgs, TCopyToClipboardReturn } from "./copyToClipboard/index.ts";
export type { TCreateStorageArgs, TCreateStorageReturn, TStorageController } from "./createStorage/index.ts";
export type { TDeleteCookieArgs, TDeleteCookieReturn } from "./cookie/deleteCookie/index.ts";
export type { TGetCookieArgs, TGetCookieReturn } from "./cookie/getCookie/index.ts";
export type { TGetScrollbarWidthArgs, TGetScrollbarWidthReturn } from "./getScrollbarWidth/index.ts";
export type { TGetStorageArgs, TGetStorageReturn, TStorageType } from "./getStorage/index.ts";
export type { TIsAdblockArgs, TIsAdblockReturn } from "./isAdblock/index.ts";
export type { TIsMobileDeviceArgs, TIsMobileDeviceReturn } from "./isMobileDevice/index.ts";
export type { TIsTouchDeviceArgs, TIsTouchDeviceReturn } from "./isTouchDevice/index.ts";
export type { TSetCookieArgs, TSetCookieReturn } from "./cookie/setCookie/index.ts";

export { copyToClipboard } from "./copyToClipboard/index.ts";
export { createStorage } from "./createStorage/index.ts";
export { deleteCookie, getCookie, setCookie } from "./cookie/index.ts";
export { getScrollbarWidth } from "./getScrollbarWidth/index.ts";
export { getStorage } from "./getStorage/index.ts";
export { isAdblock } from "./isAdblock/index.ts";
export { isMobileDevice } from "./isMobileDevice/index.ts";
export { isTouchDevice } from "./isTouchDevice/index.ts";
