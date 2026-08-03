# ⚙️ User's browser utils pack API

___

## Usage

```ts
// import functions
import { copyToClipboard, getStorage, createStorage, setCookie, deleteCookie, getCookie, getScrollbarWidth, isAdblock, isMobileDevice, isTouchDevice } from "@web3r/flowerkit/user";

// import types
import type { TCopyToClipboardArgs, TCopyToClipboardReturn, TStorageType, TGetStorageArgs, TGetStorageReturn, TStorageController, TCreateStorageArgs, TCreateStorageReturn, TSetCookieArgs, TSetCookieReturn, TDeleteCookieArgs, TDeleteCookieReturn, TGetCookieArgs, TGetCookieReturn, TGetScrollbarWidthArgs, TGetScrollbarWidthReturn, TIsAdblockArgs, TIsAdblockReturn, TIsMobileDeviceArgs, TIsMobileDeviceReturn, TIsTouchDeviceArgs, TIsTouchDeviceReturn } from "@web3r/flowerkit/user";
```

___

## Functions

- [copyToClipboard](#copytoclipboard)
- [getStorage](#getstorage)
- [createStorage](#createstorage)
- [setCookie](#setcookie)
- [deleteCookie](#deletecookie)
- [getCookie](#getcookie)
- [getScrollbarWidth](#getscrollbarwidth)
- [isAdblock](#isadblock)
- [isMobileDevice](#ismobiledevice)
- [isTouchDevice](#istouchdevice)

### copyToClipboard

Copies text to the clipboard using the Clipboard API with a legacy fallback.
Returns `false` when clipboard access is unavailable or denied.

| Function | Type |
| ---------- | ---------- |
| `copyToClipboard` | `(text: string) => Promise<boolean>` |

Parameters:

* `text`: Text to copy


Returns:

Whether copying succeeded

Examples:

```ts
await copyToClipboard("https://example.com");
```

```ts
// Copy a share URL and show feedback only when it succeeds
const copied = await copyToClipboard(window.location.href);
if (copied) showToast("Link copied");
```


### getStorage

Safely gets browser local or session storage.
Returns `null` during SSR or when storage access is blocked.

| Function | Type |
| ---------- | ---------- |
| `getStorage` | `(type?: TStorageType) => Storage or null` |

Parameters:

* `type`: Storage type


Returns:

Browser storage when available

Examples:

```ts
const storage = getStorage("session");
```

```ts
// Read a saved preference only when localStorage is available
const storage = getStorage();
const theme = storage?.getItem("theme") ?? "system";
```


### createStorage

Creates a typed, JSON-backed and SSR-safe storage namespace.
Operations return fallbacks or `false` when storage is unavailable.

| Function | Type |
| ---------- | ---------- |
| `createStorage` | `<TSchema extends Record<string, unknown> = Record<string, unknown>>(options?: { namespace?: string or undefined; onError?: ((error: unknown) => void) or undefined; storage?: Storage or null or undefined; }) => TStorageController<...>` |

Parameters:

* `options`: Options; namespace defaults to "flowerkit"


Returns:

Storage controller

Examples:

```ts
const settings = createStorage<{ theme: "light"|"dark" }>({ namespace: "app" });
settings.set("theme", "dark");
```

```ts
// Persist a typed shopping cart and restore it with a fallback
const cartStorage = createStorage<{ items: Array<{ id: string; quantity: number; }> }>({
  namespace: "shop",
});
cartStorage.set("items", cartItems);
const savedItems = cartStorage.get("items", []);
```


### setCookie

Sets a cookie.

If `options.expires` is a number, it's treated as seconds from now.
If `options.expires` is a Date, it's converted via toUTCString.
Other options are appended as cookie attributes.

| Function | Type |
| ---------- | ---------- |
| `setCookie` | `(name: string, value: string, options?: TCookieOptions) => void` |

Parameters:

* `name`: Cookie name
* `value`: Cookie value
* `options`: Cookie attributes


References:

* [https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)


Examples:

```ts
// How to set Cookie for one day or other time?
setCookie("myCookie", "value", { expires: 86400 }); // expires in 1 day (seconds)
```

```ts
// Persist a cookie consent choice with common security attributes
setCookie("cookie_consent", "accepted", {
  expires: 60 * 60 * 24 * 365,
  path: "/",
  samesite: "lax",
  secure: true,
});
```


### deleteCookie

Deletes a cookie by setting its expiry to a past date.

| Function | Type |
| ---------- | ---------- |
| `deleteCookie` | `(name: string) => void` |

Parameters:

* `name`: Cookie name


References:

* [https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)


Examples:

```ts
// How to delete a Cookie?
deleteCookie("myCookieName");
```

```ts
// Remove an authentication cookie after the user signs out
deleteCookie("session_token");
```


### getCookie

Retrieves a cookie value by name.

| Function | Type |
| ---------- | ---------- |
| `getCookie` | `(name: string) => string or undefined` |

Parameters:

* `name`: Cookie name


Returns:

The cookie value or undefined if not found

References:

* [https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)


Examples:

```ts
// How to get value of Cookie?
setCookie("myCookieName", "myValue");
const savedValue = getCookie("myCookieName");
console.log(savedValue); // => "myValue"
```

```ts
// Restore a cookie consent choice when the page loads
const consent = getCookie("cookie_consent") ?? "unknown";
```


### getScrollbarWidth

Computes the width of the browser's scrollbar in pixels.

| Function | Type |
| ---------- | ---------- |
| `getScrollbarWidth` | `() => number` |

Returns:

Scrollbar width in pixels

Examples:

```ts
const scrollbarWidth = getScrollbarWidth();
console.log(scrollbarWidth); // => number
```

```ts
// Prevent a layout shift when locking page scroll behind a modal
document.body.style.paddingRight = `${getScrollbarWidth()}px`;
document.body.style.overflow = "hidden";
```


### isAdblock

Detects if an ad-blocker likely hides known ad-related elements.
Implementation detail:
Injects a hidden container with an "ad-like" child element
Measures computed style after a tick to infer blocking

| Function | Type |
| ---------- | ---------- |
| `isAdblock` | `() => boolean` |

Returns:

True if ad-blocking likely detected

Examples:

```ts
const blocked = isAdblock();
console.log(blocked); // => false
```

```ts
// Offer an ad-free subscription when an ad blocker is detected
if (isAdblock()) showAdFreeSubscriptionNotice();
```


### isMobileDevice

Heuristically detects if the current browser is on a mobile device via UA checks.  UA-based detection can be unreliable. Prefer feature detection when possible.

| Function | Type |
| ---------- | ---------- |
| `isMobileDevice` | `() => boolean` |

Returns:

True if likely a mobile browser

Examples:

```ts
const isMobile = isMobileDevice(); // => boolean
```

```ts
// Select a mobile navigation variant when UA-based detection is acceptable
const navigationVariant = isMobileDevice() ? "drawer" : "sidebar";
```


### isTouchDevice

Detects if the current device likely has a touch screen.
Avoids false positives from non-browser envs (like `jsdom`).

| Function | Type |
| ---------- | ---------- |
| `isTouchDevice` | `() => boolean` |

Examples:

```ts
const isTouchScreen = isTouchDevice(); // {boolean}
```

```ts
// Increase control sizes for devices that support touch input
document.documentElement.classList.toggle("has-touch", isTouchDevice());
```

## Types

- [TCopyToClipboardArgs](#tcopytoclipboardargs)
- [TCopyToClipboardReturn](#tcopytoclipboardreturn)
- [TStorageType](#tstoragetype)
- [TGetStorageArgs](#tgetstorageargs)
- [TGetStorageReturn](#tgetstoragereturn)
- [TStorageController](#tstoragecontroller)
- [TCreateStorageArgs](#tcreatestorageargs)
- [TCreateStorageReturn](#tcreatestoragereturn)
- [TSetCookieArgs](#tsetcookieargs)
- [TSetCookieReturn](#tsetcookiereturn)
- [TDeleteCookieArgs](#tdeletecookieargs)
- [TDeleteCookieReturn](#tdeletecookiereturn)
- [TGetCookieArgs](#tgetcookieargs)
- [TGetCookieReturn](#tgetcookiereturn)
- [TGetScrollbarWidthArgs](#tgetscrollbarwidthargs)
- [TGetScrollbarWidthReturn](#tgetscrollbarwidthreturn)
- [TIsAdblockArgs](#tisadblockargs)
- [TIsAdblockReturn](#tisadblockreturn)
- [TIsMobileDeviceArgs](#tismobiledeviceargs)
- [TIsMobileDeviceReturn](#tismobiledevicereturn)
- [TIsTouchDeviceArgs](#tistouchdeviceargs)
- [TIsTouchDeviceReturn](#tistouchdevicereturn)

### TCopyToClipboardArgs

| Type | Type |
| ---------- | ---------- |
| `TCopyToClipboardArgs` | `Parameters<typeof copyToClipboard>` |

### TCopyToClipboardReturn

| Type | Type |
| ---------- | ---------- |
| `TCopyToClipboardReturn` | `ReturnType<typeof copyToClipboard>` |

### TStorageType

| Type | Type |
| ---------- | ---------- |
| `TStorageType` | `local" or "session` |

### TGetStorageArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStorageArgs` | `Parameters<typeof getStorage>` |

### TGetStorageReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStorageReturn` | `ReturnType<typeof getStorage>` |

### TStorageController

| Type | Type |
| ---------- | ---------- |
| `TStorageController` | `{ clear: () => boolean; get: <TKey extends Extract<keyof TSchema, string>>( key: TKey, fallback?: TSchema[TKey] ) => TSchema[TKey] or undefined; has: (key: Extract<keyof TSchema, string>) => boolean; remove: (key: Extract<keyof TSchema, string>) => boolean; set: <TKey extends Extract<keyof TSchema, string>>(key: TKey, value: TSchema[TKey]) => boolean; }` |

### TCreateStorageArgs

| Type | Type |
| ---------- | ---------- |
| `TCreateStorageArgs` | `Parameters<typeof createStorage>` |

### TCreateStorageReturn

| Type | Type |
| ---------- | ---------- |
| `TCreateStorageReturn` | `ReturnType<typeof createStorage>` |

### TSetCookieArgs

| Type | Type |
| ---------- | ---------- |
| `TSetCookieArgs` | `Parameters<typeof setCookie>` |

### TSetCookieReturn

| Type | Type |
| ---------- | ---------- |
| `TSetCookieReturn` | `ReturnType<typeof setCookie>` |

### TDeleteCookieArgs

| Type | Type |
| ---------- | ---------- |
| `TDeleteCookieArgs` | `Parameters<typeof deleteCookie>` |

### TDeleteCookieReturn

| Type | Type |
| ---------- | ---------- |
| `TDeleteCookieReturn` | `ReturnType<typeof deleteCookie>` |

### TGetCookieArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCookieArgs` | `Parameters<typeof getCookie>` |

### TGetCookieReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCookieReturn` | `ReturnType<typeof getCookie>` |

### TGetScrollbarWidthArgs

| Type | Type |
| ---------- | ---------- |
| `TGetScrollbarWidthArgs` | `Parameters<typeof getScrollbarWidth>` |

### TGetScrollbarWidthReturn

| Type | Type |
| ---------- | ---------- |
| `TGetScrollbarWidthReturn` | `ReturnType<typeof getScrollbarWidth>` |

### TIsAdblockArgs

| Type | Type |
| ---------- | ---------- |
| `TIsAdblockArgs` | `Parameters<typeof isAdblock>` |

### TIsAdblockReturn

| Type | Type |
| ---------- | ---------- |
| `TIsAdblockReturn` | `ReturnType<typeof isAdblock>` |

### TIsMobileDeviceArgs

| Type | Type |
| ---------- | ---------- |
| `TIsMobileDeviceArgs` | `Parameters<typeof isMobileDevice>` |

### TIsMobileDeviceReturn

| Type | Type |
| ---------- | ---------- |
| `TIsMobileDeviceReturn` | `ReturnType<typeof isMobileDevice>` |

### TIsTouchDeviceArgs

| Type | Type |
| ---------- | ---------- |
| `TIsTouchDeviceArgs` | `Parameters<typeof isTouchDevice>` |

### TIsTouchDeviceReturn

| Type | Type |
| ---------- | ---------- |
| `TIsTouchDeviceReturn` | `ReturnType<typeof isTouchDevice>` |
