# ⚙️ User's browser utils pack API
___
## Usage
```ts
import { setCookie, deleteCookie, getCookie, getScrollbarWidth, isAdblock, isMobileDevice, isTouchDevice } from "@web3r/flowerkit/user";
```
___
## Functions

- [setCookie](#setcookie)
- [deleteCookie](#deletecookie)
- [getCookie](#getcookie)
- [getScrollbarWidth](#getscrollbarwidth)
- [isAdblock](#isadblock)
- [isMobileDevice](#ismobiledevice)
- [isTouchDevice](#istouchdevice)

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



