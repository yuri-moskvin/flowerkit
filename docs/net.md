# ⚙️ Network utils pack API

___

## Usage

```ts
// import functions
import { getExternalScript, getFormDataFromObj, getUrlWithQueryParams, getFromServer, getObjFromFormData, getQueryParams, getQueryParam } from "@web3r/flowerkit/net";

// import types
import type { TGetExternalScriptArgs, TGetExternalScriptReturn, TGetFormDataFromObjArgs, TGetFormDataFromObjReturn, TGetUrlWithQueryParamsArgs, TGetUrlWithQueryParamsReturn, TGetFromServerMethod, TGetFromServerErrorKind, TGetFromServerError, TGetFromServerArgs, TGetFromServerReturn, TGetObjFromFormDataArgs, TGetObjFromFormDataReturn, TQueryParamsInput, TGetQueryParamsArgs, TGetQueryParamsReturn, TGetQueryParamArgs, TGetQueryParamReturn } from "@web3r/flowerkit/net";
```

___

## Functions

- [getExternalScript](#getexternalscript)
- [getFormDataFromObj](#getformdatafromobj)
- [getUrlWithQueryParams](#geturlwithqueryparams)
- [getFromServer](#getfromserver)
- [getQueryParams](#getqueryparams)
- [getQueryParam](#getqueryparam)

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

```ts
// Load a third-party SDK with Subresource Integrity protection
await getExternalScript({
  src: "https://cdn.example.com/sdk.js",
  integrity: "sha384-...",
  crossorigin: "anonymous",
});
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

```ts
// Build multipart form data and preserve File values with a custom setter
const upload = getFormDataFromObj({ title, imageFile }, new FormData(), (name, value, fd) => {
  if (value instanceof Blob) fd.set(name, value);
  else fd.set(name, String(value ?? ""));
});
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

Examples:

```ts
// Add pagination and sorting parameters to an existing URL
const nextPageUrl = getUrlWithQueryParams("/products?category=plants", {
  page: 2,
  sort: "price",
});
```

```ts
// Build a filter URL that preserves repeated FormData values
const filters = new FormData();
filters.append("tag", "indoor");
filters.append("tag", "sale");
const filterUrl = getUrlWithQueryParams("/products", filters);
```


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
* `props.getResp`: Custom response parser. If provided, overrides `type` after HTTP status validation.
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

```ts
import type { TGetFromServerError } from "@web3r/flowerkit/net";

try {
  await getFromServer({ url: "/api/user" });
} catch (error) {
  if (error instanceof Error && error.name === "GetFromServerError") {
    const requestError = error as TGetFromServerError;
    if (requestError.kind === "http") {
      console.error(requestError.status, requestError.response);
    }
  }
}
```

```ts
// Send typed JSON data and transform the successful API response
const productId = await getFromServer<{ product: { id: string } }, string>({
  url: "/api/products",
  method: "POST",
  contentType: "application/json",
  data: { name: "Flower pot", price: 24 },
  getSuccessResp: ({ product }) => product.id,
});
```


### getQueryParams

Reads URL query parameters into an object and preserves repeated values and bare flags.

| Function | Type |
| ---------- | ---------- |
| `getQueryParams` | `(input?: TQueryParamsInput or undefined) => Record<string, string or string[]>` |

Parameters:

* `input`: URL, query string, or URLSearchParams; current URL by default


Returns:

Query object

Examples:

```ts
getQueryParams("?tag=a&tag=b&page=1"); // { tag: [ "a", "b" ], page: "1" }
```

```ts
// Restore product filters from a shared search URL
const filters = getQueryParams(window.location.href);
const selectedBrands = Array.isArray(filters.brand)
  ? filters.brand
  : [ filters.brand ].filter(Boolean);
```


### getQueryParam

Gets the first value of a URL query parameter.

| Function | Type |
| ---------- | ---------- |
| `getQueryParam` | `(name: string, input?: TQueryParamsInput or undefined) => string or null` |

Parameters:

* `name`: Parameter name
* `input`: URL, query string, or URLSearchParams; current URL by default


Returns:

First value or `null` when absent

Examples:

```ts
getQueryParam("page", "?page=2"); // "2"
```

```ts
// Read an optional feature flag from the current browser URL
const isPreview = getQueryParam("preview") === "true";
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

```ts
// Preserve repeated checkbox values when converting a form submission
const data = new FormData(form);
const values = getObjFromFormData(data);
console.log(values.category); // string, File, or an array of repeated values
```

## Types

- [TGetExternalScriptArgs](#tgetexternalscriptargs)
- [TGetExternalScriptReturn](#tgetexternalscriptreturn)
- [TGetFormDataFromObjArgs](#tgetformdatafromobjargs)
- [TGetFormDataFromObjReturn](#tgetformdatafromobjreturn)
- [TGetUrlWithQueryParamsArgs](#tgeturlwithqueryparamsargs)
- [TGetUrlWithQueryParamsReturn](#tgeturlwithqueryparamsreturn)
- [TGetFromServerMethod](#tgetfromservermethod)
- [TGetFromServerErrorKind](#tgetfromservererrorkind)
- [TGetFromServerError](#tgetfromservererror)
- [TGetFromServerArgs](#tgetfromserverargs)
- [TGetFromServerReturn](#tgetfromserverreturn)
- [TGetObjFromFormDataArgs](#tgetobjfromformdataargs)
- [TGetObjFromFormDataReturn](#tgetobjfromformdatareturn)
- [TQueryParamsInput](#tqueryparamsinput)
- [TGetQueryParamsArgs](#tgetqueryparamsargs)
- [TGetQueryParamsReturn](#tgetqueryparamsreturn)
- [TGetQueryParamArgs](#tgetqueryparamargs)
- [TGetQueryParamReturn](#tgetqueryparamreturn)

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

### TGetFromServerMethod

| Type | Type |
| ---------- | ---------- |
| `TGetFromServerMethod` | `GET" or "PUT" or "POST" or "DELETE" or "HEAD" or "CONNECT" or "OPTIONS" or "TRACE" or "PATCH` |

### TGetFromServerErrorKind

| Type | Type |
| ---------- | ---------- |
| `TGetFromServerErrorKind` | `abort" or "http" or "network" or "parse" or "request" or "timeout" or "transform` |

### TGetFromServerError

| Type | Type |
| ---------- | ---------- |
| `TGetFromServerError` | `Error and { cause: unknown; kind: TGetFromServerErrorKind; method: TGetFromServerMethod; name: "GetFromServerError"; response: Response or null; status: number or null; url: string; }` |

### TGetFromServerArgs

| Type | Type |
| ---------- | ---------- |
| `TGetFromServerArgs` | `{ contentType?: "auto" or "application/json" or "application/x-www-form-urlencoded" or "multipart/form-data"; isBubble?: boolean; timeout?: number; method?: TGetFromServerMethod; mode?: RequestMode; signal?: AbortSignal or null; data?: Record<string, unknown> or FormData or null; getSuccessResp?: (data: TResp) => TSuccess; getResp?: (resp: Response) => Promise<TResp>; type?: "text" or "json" or "blob" or "arrayBuffer"; url?: string; headers?: Record<string, string>; allowedCodes?: number[]; credentials?: RequestCredentials; redirect?: RequestRedirect; cache?: RequestCache; referrerPolicy?: ReferrerPolicy; fetchProps?: Omit<RequestInit, "method" or "headers" or "body" or "signal" or "mode" or "credentials" or "redirect" or "cache" or "referrerPolicy">; }` |

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

### TQueryParamsInput

| Type | Type |
| ---------- | ---------- |
| `TQueryParamsInput` | `string or URL or URLSearchParams` |

### TGetQueryParamsArgs

| Type | Type |
| ---------- | ---------- |
| `TGetQueryParamsArgs` | `Parameters<typeof getQueryParams>` |

### TGetQueryParamsReturn

| Type | Type |
| ---------- | ---------- |
| `TGetQueryParamsReturn` | `ReturnType<typeof getQueryParams>` |

### TGetQueryParamArgs

| Type | Type |
| ---------- | ---------- |
| `TGetQueryParamArgs` | `Parameters<typeof getQueryParam>` |

### TGetQueryParamReturn

| Type | Type |
| ---------- | ---------- |
| `TGetQueryParamReturn` | `ReturnType<typeof getQueryParam>` |
