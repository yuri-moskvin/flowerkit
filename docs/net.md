# ⚙️ Network utils pack API
___
## Usage
```ts
import { getExternalScript, getFormDataFromObj, getUrlWithQueryParams, getFromServer, getObjFromFormData } from "@web3r/flowerkit/net";
```
___
## Functions

- [getExternalScript](#getexternalscript)
- [getFormDataFromObj](#getformdatafromobj)
- [getUrlWithQueryParams](#geturlwithqueryparams)
- [getFromServer](#getfromserver)
- [getObjFromFormData](#getobjfromformdata)

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
| `getFromServer` | `<T = unknown>(props?: TGetFromServerProps<T>) => Promise<T>` |

Parameters:

* `props`: Request parameters


Returns:

Promise with parsed response (type depends on `type` option)

References:

* [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)


Examples:

```ts
const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
```


### getObjFromFormData

Gets an object from `FormData` interface

| Function | Type |
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



