# ⚙️ Network utils pack API
___
## Usage
```ts
// import functions
import { getExternalScript, getFormDataFromObj, getUrlWithQueryParams, getFromServer, getObjFromFormData } from "@web3r/flowerkit/net";

// import types
import type { TGetExternalScriptArgs, TGetExternalScriptReturn, TGetFormDataFromObjArgs, TGetFormDataFromObjReturn, TGetUrlWithQueryParamsArgs, TGetUrlWithQueryParamsReturn, TGetFromServerArgs, TGetFromServerReturn, TGetObjFromFormDataArgs, TGetObjFromFormDataReturn } from "@web3r/flowerkit/net";
```
___
## Functions

- [getExternalScript](#getexternalscript)
- [getFormDataFromObj](#getformdatafromobj)
- [getUrlWithQueryParams](#geturlwithqueryparams)
- [getFromServer](#getfromserver)

### getExternalScript

Appends an external script to the page and resolves when it's loaded.

| Function | Type |
| ---------- | ---------- |
| `getExternalScript` | `(props: TGetExternalScriptProps) => Promise<HTMLScriptElement>` |

Parameters:

* `props`: Options
* `props.isAsync`: `async` attribute
* `props.isDefer`: `defer` attribute
* `props.src`: Script source URL
* `props.appendTo`: Element to append the script to
* `props.id`: Script element id
* `props.crossorigin`: `crossorigin` attribute
* `props.integrity`: `integrity` attribute
* `props.type`: `type` attribute


Returns:

Promise that resolves to the created script element

Examples:

```ts
getExternalScript({ src: "https://cdn.example.com/lib.js", id: "lib" })
  .then(() => console.log("Loaded"));
```


### getFormDataFromObj

Builds a FormData instance from a plain object.

| Function | Type |
| ---------- | ---------- |
| `getFormDataFromObj` | `(obj?: TSourceObject, fd?: FormData, setItem?: TSetItemFunction) => FormData` |

Parameters:

* `obj`: Source object
* `fd`: Existing FormData to append to
* `setItem`: Custom setter per entry


Returns:

Result FormData

Examples:

```ts
const fd = getFormDataFromObj({ foo: 1, bar: "x" });
fd.get("foo"); // "1"
```


### getUrlWithQueryParams

Returns a URL string with updated query parameters from an object or `FormData`.

| Function | Type |
| ---------- | ---------- |
| `getUrlWithQueryParams` | `(uri: string, params?: TQueryParams) => string` |

Parameters:

* `uri`: Source URL
* `params`: Params to merge into the query string


Returns:

Updated URL

### getFromServer

Performs an HTTP request (`fetch`) with handy defaults, content-type handling,
query param building, and optional bubbling of a "getFromServer" event.

| Function | Type |
| ---------- | ---------- |
| `getFromServer` | `<TResp = unknown, TSuccess = TResp>(props?: TGetFromServerArgs<TResp, TSuccess>) => Promise<TSuccess>` |

Parameters:

* `props`: Request parameters (all optional).
* `props.url`: The URL to request. Defaults to current window location or './'.
* `props.contentType`: Content type header. If "auto", sets based on data/method.
* `props.isBubble`: Whether to bubble a "getFromServer" event after success.
* `props.timeout`: Timeout in milliseconds (use Infinity to disable).
* `props.method`: HTTP method.
* `props.mode`: Fetch mode.
* `props.signal`: AbortSignal for cancellation.
* `props.data`: Request data. For GET-like methods, appended as query params.
* `props.getSuccessResp`: Transform function for successful response. Defaults to identity function.
* `props.getResp`: Custom response parser. If provided, overrides `type`.
* `props.type`: Response body parsing type (used when `getResp` not provided).
* `props.headers`: Additional headers.
* `props.allowedCodes`: Array of HTTP status codes to treat as success even if not 2xx.
* `props.credentials`: Credentials mode.
* `props.redirect`: Redirect mode.
* `props.cache`: Cache mode.
* `props.referrerPolicy`: Referrer policy.
* `props.fetchProps`: Additional fetch options.


Returns:

Promise with parsed response (type depends on `type` option).

References:

* [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)


Examples:

```ts
const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
```



## Constants

- [getObjFromFormData](#getobjfromformdata)

### getObjFromFormData

Gets an object from `FormData` interface

| Constant | Type |
| ---------- | ---------- |
| `getObjFromFormData` | `(fd?: FormData) => TFormDataReturn` |

Parameters:

* `fd`: Source `FormData` instance


Returns:

Object representation

Examples:

```ts
// How to convert `FormData` to object?
const fd = new FormData();
fd.append("test", "val");
getObjFromFormData(fd); // { test: "val" }
```




## Types

- [TGetExternalScriptArgs](#tgetexternalscriptargs)
- [TGetExternalScriptReturn](#tgetexternalscriptreturn)
- [TGetFormDataFromObjArgs](#tgetformdatafromobjargs)
- [TGetFormDataFromObjReturn](#tgetformdatafromobjreturn)
- [TGetUrlWithQueryParamsArgs](#tgeturlwithqueryparamsargs)
- [TGetUrlWithQueryParamsReturn](#tgeturlwithqueryparamsreturn)
- [TGetFromServerArgs](#tgetfromserverargs)
- [TGetFromServerReturn](#tgetfromserverreturn)
- [TGetObjFromFormDataArgs](#tgetobjfromformdataargs)
- [TGetObjFromFormDataReturn](#tgetobjfromformdatareturn)

### TGetExternalScriptArgs

| Type | Type |
| ---------- | ---------- |
| `TGetExternalScriptArgs` | `Parameters<typeof getExternalScript>` |

### TGetExternalScriptReturn

| Type | Type |
| ---------- | ---------- |
| `TGetExternalScriptReturn` | `ReturnType<typeof getExternalScript>` |

### TGetFormDataFromObjArgs

| Type | Type |
| ---------- | ---------- |
| `TGetFormDataFromObjArgs` | `Parameters<typeof getFormDataFromObj>` |

### TGetFormDataFromObjReturn

| Type | Type |
| ---------- | ---------- |
| `TGetFormDataFromObjReturn` | `ReturnType<typeof getFormDataFromObj>` |

### TGetUrlWithQueryParamsArgs

| Type | Type |
| ---------- | ---------- |
| `TGetUrlWithQueryParamsArgs` | `Parameters<typeof getUrlWithQueryParams>` |

### TGetUrlWithQueryParamsReturn

| Type | Type |
| ---------- | ---------- |
| `TGetUrlWithQueryParamsReturn` | `ReturnType<typeof getUrlWithQueryParams>` |

### TGetFromServerArgs

| Type | Type |
| ---------- | ---------- |
| `TGetFromServerArgs` | `{ contentType?: "auto" or "application/json" or "application/x-www-form-urlencoded" or "multipart/form-data"; isBubble?: boolean; timeout?: number; method?: "GET" or "PUT" or "POST" or "DELETE" or "HEAD" or "CONNECT" or "OPTIONS" or "TRACE" or "PATCH"; mode?: RequestMode; signal?: AbortSignal or null; data?: Record<string, unknown> or FormData or null; getSuccessResp?: (data: TResp) => TSuccess; getResp?: (resp: Response) => Promise<TResp>; type?: "text" or "json" or "blob" or "arrayBuffer"; url?: string; headers?: Record<string, string>; allowedCodes?: number[]; credentials?: RequestCredentials; redirect?: RequestRedirect; cache?: RequestCache; referrerPolicy?: ReferrerPolicy; fetchProps?: Omit<RequestInit, "method" or "headers" or "body" or "signal" or "mode" or "credentials" or "redirect" or "cache" or "referrerPolicy">; }` |

### TGetFromServerReturn

| Type | Type |
| ---------- | ---------- |
| `TGetFromServerReturn` | `ReturnType<typeof getFromServer>` |

### TGetObjFromFormDataArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjFromFormDataArgs` | `Parameters<typeof getObjFromFormData>` |

### TGetObjFromFormDataReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjFromFormDataReturn` | `ReturnType<typeof getObjFromFormData>` |

