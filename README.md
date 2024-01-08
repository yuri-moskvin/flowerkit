# 🌸 FlowerKit: JS Utils lib

A collection of more than 60 often used utility JS functions that simplify frontend development.

## Usage

```js
// tree-shakable import
import { isNode, /* ... */ } from "@web3r/flowerkit/dom";
import { onSwipe, /* ... */ } from "@web3r/flowerkit/evt";

// import of whole utils packs
import { domKit, evtKit, /* ... */ } from "@web3r/flowerkit";
```

## Features

- **Tree shaking**: appends only the necessary code in your bundle;
- **Friendly names**: functions that return objects begin with the "get" prefix and for boolean values — "is";
- **JSDoc**: each utility contains a detailed description and example of usage which are available in your IDE;
- **Lightweight**: the entire library weighs no more than 30kb;
- **Error catching**: immediate errors when passing invalid arguments;
- **SSR friendly**: fallbacks for `window` and `document` objects.

## Structure

- `@web3r/flowerkit/arr` — for arrays and array-like objects;
- `@web3r/flowerkit/css` — for CSS from JS;
- `@web3r/flowerkit/dom` — for DOM and Nodes;
- `@web3r/flowerkit/evt` — for events;
- `@web3r/flowerkit/fn` — for functions;
- `@web3r/flowerkit/json` — for JSON;
- `@web3r/flowerkit/net` — for network features;
- `@web3r/flowerkit/obj` — for objects;
- `@web3r/flowerkit/str` — for strings;
- `@web3r/flowerkit/user` — for common user features;

___
## Array utils:

  * [getAsyncMap(arr, callback)](#getAsyncMap) ⇒ <code>Promise</code>
  * [getDiff(arr1, arr2)](#getDiff) ⇒ <code>Array</code>
  * [getIntersection(arr1, arr2)](#getIntersection) ⇒ <code>Array</code>
  * [getLastFromIterable(obj)](#getLastFromIterable) ⇒ <code>\*</code> \| <code>null</code>
  * [getUnion(arr1, arr2)](#getUnion) ⇒ <code>Array</code>
  * [isItemsEqual(arr)](#isItemsEqual) ⇒ <code>boolean</code>
  * [isIterable(obj)](#isIterable) ⇒ <code>boolean</code>

<a name="getAsyncMap"></a>

### getAsyncMap(arr, callback) ⇒ <code>Promise</code>
Gets aggregated result of async operation for each element of given Array

**See**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | source array |
| callback | <code>function</code> | callback function |


**Example**  

```js
// How to call API for each element of array and return result?
```

<a name="getDiff"></a>

### getDiff(arr1, arr2) ⇒ <code>Array</code>
Gets an Array of difference between two given Arrays


| Param | Type | Description |
| --- | --- | --- |
| arr1 | <code>Array</code> | first source Array |
| arr2 | <code>Array</code> | second source Array |


**Example**  

```js
// How to get the difference between two arrays?
```

<a name="getIntersection"></a>

### getIntersection(arr1, arr2) ⇒ <code>Array</code>
Gets Array of intersection of two given Arrays


| Param | Type | Description |
| --- | --- | --- |
| arr1 | <code>Array</code> | first source Array |
| arr2 | <code>Array</code> | second source Array |


**Example**  

```js
// How to get intersection of two Arrays?
```

<a name="getLastFromIterable"></a>

### getLastFromIterable(obj) ⇒ <code>\*</code> \| <code>null</code>
Gets last element of iterable object such as Array, NodeList, HTMLCollection, etc.

**See**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols  

| Param | Type |
| --- | --- |
| obj | <code>\*</code> | 


**Example**  

```js
// How to get last element from NodeList of `div`?
```

<a name="getUnion"></a>

### getUnion(arr1, arr2) ⇒ <code>Array</code>
Gets union Array of two given Arrays


| Param | Type | Description |
| --- | --- | --- |
| arr1 | <code>Array</code> | first source Array |
| arr2 | <code>Array</code> | sound source Array |


**Example**  

```js
// How to merge two arrays in JavaScript and de-duplicate items?
```

<a name="isItemsEqual"></a>

### isItemsEqual(arr) ⇒ <code>boolean</code>
Checks if items of given Array is same


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | source Array |


**Example**  

```js
// How to check if all records are equal in array?
```

<a name="isIterable"></a>

### isIterable(obj) ⇒ <code>boolean</code>
Check if an object is iterable

**See**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols  

| Param | Type |
| --- | --- |
| obj | <code>\*</code> | 


**Example**  

```js
// How to check for iterability?
```


___
## CSS utils:

  * [getCSSTransformValues(el)](#getCSSTransformValues) ⇒ <code>Object</code>
  * [getCSSValue(el, prop)](#getCSSValue) ⇒ <code>string</code>
  * [getCSSVar(el, variable, [isNumberFormat])](#getCSSVar) ⇒ <code>string</code> \| <code>number</code>
  * [isMediaQuery(str)](#isMediaQuery) ⇒ <code>boolean</code>
  * [isSelectorValid(str)](#isSelectorValid) ⇒ <code>boolean</code>
  * [setCSSVar(el, variable, value)](#setCSSVar)

<a name="getCSSTransformValues"></a>

### getCSSTransformValues(el) ⇒ <code>Object</code>
Gets an object with `x`, `y`, `z` values of CSS3 transform

**See**: https://developer.mozilla.org/en-US/docs/Web/CSS/transform  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |


**Example**  

```js
// How to get `translate3d` values of a `div`?
```

<a name="getCSSValue"></a>

### getCSSValue(el, prop) ⇒ <code>string</code>
Gets a calculated CSS property of an DOM-element

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |
| prop | <code>String</code> | CSS property |


**Example**  

```js
// How to get "height" prop of div from JS?
```

<a name="getCSSVar"></a>

### getCSSVar(el, variable, [isNumberFormat]) ⇒ <code>string</code> \| <code>number</code>
Gets value of CSS variable

**See**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> |  | source DOM element |
| variable | <code>String</code> |  | variable name |
| [isNumberFormat] | <code>Boolean</code> | <code>false</code> | whether to return a number rather than a string |


**Example**  

```js
// How to get CSS3 variable value from element?
```

<a name="isMediaQuery"></a>

### isMediaQuery(str) ⇒ <code>boolean</code>
Gets result of testing of a CSS media query

**See**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source media query string |


**Example**  

```js
// How to check if user device has portrait or landscape orientation?
```

<a name="isSelectorValid"></a>

### isSelectorValid(str) ⇒ <code>boolean</code>
Checks if string is valid CSS selector

**See**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source selector |


**Example**  

```js
// How to check if CSS selector is valid?
```

<a name="setCSSVar"></a>

### setCSSVar(el, variable, value)
Sets CSS3 variable to specific DOM node

**See**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |
| variable | <code>String</code> | variable name |
| value | <code>String</code> \| <code>Number</code> \| <code>Boolean</code> | variable value |


**Example**  

```js
// How to set CSS variable to div?
```


___
## User utils:

  * [getCookie(name)](#getCookie) ⇒ <code>string</code> \| <code>undefined</code>
  * [setCookie(name, value, [options])](#setCookie)
  * [getScrollbarWidth()](#getScrollbarWidth) ⇒ <code>number</code>
  * [isMobileDevice()](#isMobileDevice) ⇒ <code>boolean</code>
  * [isTouchDevice()](#isTouchDevice) ⇒ <code>boolean</code>

<a name="getCookie"></a>

### getCookie(name) ⇒ <code>string</code> \| <code>undefined</code>
Gets the Cookie value

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of Cookie |


**Example**  

```js
// How to get value of Cookie?
```

<a name="setCookie"></a>

### setCookie(name, value, [options])
Sets the Cookie value

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of Cookie |
| value | <code>String</code> | value of Cookie |
| [options] | <code>Object</code> | options of Cookie |


**Example**  

```js
// How to set Cookie for one day or other time?
```

<a name="getScrollbarWidth"></a>

### getScrollbarWidth() ⇒ <code>number</code>
Gets width of user scrollbar


**Example**  

```js
// How to get width of user scrollbar?
```

<a name="isMobileDevice"></a>

### isMobileDevice() ⇒ <code>boolean</code>
Checks  if the user is using a mobile browser


**Example**  

```js
// How to detect mobile browser?
```

<a name="isTouchDevice"></a>

### isTouchDevice() ⇒ <code>boolean</code>
Checks if user devise has touchscreen


**Example**  

```js
// How to check if user has touchscreen device?
```


___
## DOM utils:

  * [getElSiblings(el)](#getElSiblings) ⇒ <code>Array</code>
  * [getElWrapper(el, str)](#getElWrapper) ⇒ <code>ChildNode</code>
  * [getHTMLFromStr(str, type)](#getHTMLFromStr) ⇒ <code>NodeList</code>
  * [getIndexOfEl(el)](#getIndexOfEl) ⇒ <code>number</code>
  * [isNode(el)](#isNode) ⇒ <code>boolean</code>
  * [removeChildNodes(el)](#removeChildNodes)

<a name="getElSiblings"></a>

### getElSiblings(el) ⇒ <code>Array</code>
Gets array of all siblings of given node


| Param | Type | Description |
| --- | --- | --- |
| el | <code>Node</code> \| <code>Element</code> \| <code>HTMLElement</code> | node |


**Example**  

```js
// How to get all siblings of `li` DOM-element with specific ID?
```

<a name="getElWrapper"></a>

### getElWrapper(el, str) ⇒ <code>ChildNode</code>
Gets a wrapper for specific element


| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |
| str | <code>String</code> | string of wrapper HTML layout (supports nested blocks) |


**Example**  

```js
// How to wrap content to the few nested `div` blocks?
```

<a name="getHTMLFromStr"></a>

### getHTMLFromStr(str, type) ⇒ <code>NodeList</code>
Get parsed HTML from string and returns NodeList that include elements and text

**See**: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>String</code> |  | source string |
| type | <code>DOMParserSupportedType</code> | <code>text/html</code> | content type ("application/xhtml+xml", "application/xml", "image/svg+xml", "text/html" (by default) or "text/xml" |


**Example**  

```js
// How to get parsed HTML elements from string?
```

<a name="getIndexOfEl"></a>

### getIndexOfEl(el) ⇒ <code>number</code>
Gets index of Node from relatively its siblings


| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |


**Example**  

```js
// How to get index of specific `li` element?
```

<a name="isNode"></a>

### isNode(el) ⇒ <code>boolean</code>
Checks whether the specified object is a DOM element


| Param | Type | Description |
| --- | --- | --- |
| el | <code>\*</code> | source object |


**Example**  

```js
// How to check if object is dom node?
```

<a name="removeChildNodes"></a>

### removeChildNodes(el)
Removes all child nodes of given node


| Param | Type | Description |
| --- | --- | --- |
| el | <code>Node</code> \| <code>Element</code> \| <code>HTMLElement</code> \| <code>Document</code> | node |


**Example**  

```js
// How to remove all child elements of a DOM node?
```


___
## Event utils:

  * [bubble(el, name, [detail], [params])](#bubble)
  * [onDOMReady(cb)](#onDOMReady)
  * [onSwipe(el, [props])](#onSwipe)
  * [onWindowLoad(cb)](#onWindowLoad)
  * [onWindowResize(cb, [delay])](#onWindowResize)

<a name="bubble"></a>

### bubble(el, name, [detail], [params])
Creates a custom event that bubbles up through the DOM

**See**: https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |
| name | <code>String</code> | name of CustomEvent |
| [detail] | <code>\*</code> | detail field of CustomEvent |
| [params] | <code>Object</code> | other params of CustomEvent |


**Example**  

```js
// How to create custom event with user data and bubble it on document element?
```

<a name="onDOMReady"></a>

### onDOMReady(cb)
Runs callback when DOM tree can be manipulated

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | callback function |


**Example**  

```js
// How to check if DOM is ready?
```

<a name="onSwipe"></a>

### onSwipe(el, [props])
Adds custom `swipe` event on element.


| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |
| [props] | <code>Object</code> | swipe params |
| [props.callback] | <code>function</code> | callback function after `swipe` |
| [props.minDist] | <code>Number</code> | min distance for swipe in `px` |
| [props.maxDist] | <code>Number</code> | max distance for swipe in `px` |
| [props.minTime] | <code>Number</code> | min duration of swipe in `ms` |
| [props.maxTime] | <code>Number</code> | max duration of swipe in `ms` |
| [props.instanceName] | <code>String</code> | instance name to access it from node itself |


**Example**  

```js
// How to listen `swipe` event on element in JS?
```

<a name="onWindowLoad"></a>

### onWindowLoad(cb)
Runs callback when page has fully loaded

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | callback function |


**Example**  

```js
// How to detect when whole page has loaded?
```

<a name="onWindowResize"></a>

### onWindowResize(cb, [delay])
Runs callback when page has been resized

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | <code>function</code> |  | callback function |
| [delay] | <code>Number</code> | <code>300</code> | callback execution delay |


**Example**  

```js
// How to detect when page has been resized and run callback once when resize ends?
```


___
## Network utils:

  * [getExternalScript([props])](#getExternalScript) ⇒ <code>Promise</code>
  * [getFormDataFromObj([obj], [fd], [setItem])](#getFormDataFromObj) ⇒ <code>FormData</code>
  * [getFromServer([props])](#getFromServer) ⇒ <code>Promise</code>
  * [getUrlWithQueryParams(uri, params)](#getUrlWithQueryParams) ⇒ <code>String</code>

<a name="getExternalScript"></a>

### getExternalScript([props]) ⇒ <code>Promise</code>
Gets result of appending an async external script into the page


| Param | Type | Description |
| --- | --- | --- |
| [props] | <code>Object</code> | options |
| [props.isAsync] | <code>Boolean</code> | `async` attribute |
| [props.isDefer] | <code>Boolean</code> | `defer` attribute |
| props.src | <code>String</code> | script source |
| props.appendTo | <code>Node</code> \| <code>HTMLElement</code> | element for script appending |
| [props.id] | <code>String</code> | ID for script |
| [props.crossorigin] | <code>String</code> | `crossorigin` attribute |
| [props.type] | <code>String</code> | `type` attribute |


**Example**  

```js
// How to load external CDN script asynchronously?
```

<a name="getFormDataFromObj"></a>

### getFormDataFromObj([obj], [fd], [setItem]) ⇒ <code>FormData</code>
Gets FormData from object


| Param | Type | Description |
| --- | --- | --- |
| [obj] | <code>Object</code> | source object |
| [fd] | <code>FormData</code> | FormData instance |
| [setItem] | <code>function</code> | callback for each object key/value pair |


**Example**  

```js
// How to convert object to FormData interface?
```

<a name="getFromServer"></a>

### getFromServer([props]) ⇒ <code>Promise</code>
Gets result of async fetch query to the server. Lightweight alternative for `axios` lib

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API  

| Param | Type | Description |
| --- | --- | --- |
| [props] | <code>Object</code> | params |
| [props.contentType] | <code>String</code> | type of request content ("auto" (by default), "application/x-www-form-urlencoded", or "multipart/form-data") |
| [props.isBubble] | <code>Boolean</code> | bubble a custom event with name "getFromServer" after success request and response in details event field |
| [props.timeout] | <code>Number</code> | query timeout |
| [props.method] | <code>String</code> | request method (`GET` (by default), `PUT`, `POST` or `DELETE`) |
| [props.mode] | <code>RequestMode</code> | request mode |
| [props.signal] | <code>AbortSignal</code> | instance of AbortSignal for request |
| props.data | <code>Object</code> \| <code>FormData</code> | object of FormData instance for request |
| [props.getSuccessResp] | <code>function</code> | callback for success response |
| [props.getResp] | <code>function</code> | async callback for response (overrides default behavior) |
| [props.type] | <code>String</code> | type of response (`text`, `json` (by default) or `blob`) |
| [props.url] | <code>String</code> | request url |
| [props.headers] | <code>Object</code> | object of request headers |
| [props.allowedCodes] | <code>Array</code> | array of response allowed codes |
| [props.credentials] | <code>RequestCredentials</code> | credentials value for request (`same-origin` by default) |
| [props.redirect] | <code>RequestRedirect</code> | redirect value for request (`follow` by default) |
| [props.cache] | <code>RequestCache</code> | cache value for request (`default` by default) |
| [props.referrerPolicy] | <code>ReferrerPolicy</code> | referrerPolicy value for request (`no-referrer-when-downgrade` by default) |
| [props.fetchProps] | <code>Object</code> | other `fetch` API options that overrides default behavior of `getFromServer` function |


**Example**  

```js
// How to POST data to the server?
```

<a name="getUrlWithQueryParams"></a>

### getUrlWithQueryParams(uri, params) ⇒ <code>String</code>
Gets a URL string with updated query params from object or FormData instance


| Param | Type | Description |
| --- | --- | --- |
| uri | <code>String</code> | source URL |
| params | <code>Object</code> \| <code>FormData</code> | query params as object or FormData |


**Example**  

```js
// How to set query params to URL string?
```


___
## Function utils:

  * [getCurryFn(fn, [arity])](#getCurryFn) ⇒ <code>function</code>
  * [getDebouncedFn(cb, [wait], [isImmediate])](#getDebouncedFn) ⇒ <code>function</code>
  * [isFnAsync(fn)](#isFnAsync) ⇒ <code>boolean</code>
  * [isFnClass(fn)](#isFnClass) ⇒ <code>boolean</code>
  * [wait([ms])](#wait) ⇒ <code>Promise.resolve</code>

<a name="getCurryFn"></a>

### getCurryFn(fn, [arity]) ⇒ <code>function</code>
Evaluating functions with multiple arguments and decomposing them into a sequence of functions with a specific number of arguments


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | source function |
| [arity] | <code>Number</code> | arity of function |


**Example**  

```js
// How to curry a function?
```

<a name="getDebouncedFn"></a>

### getDebouncedFn(cb, [wait], [isImmediate]) ⇒ <code>function</code>
Gets a function that is executed no more than once in a specified period of time


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | <code>function</code> |  | source function |
| [wait] | <code>Number</code> | <code>250</code> | interval of execution |
| [isImmediate] | <code>Boolean</code> | <code>false</code> | immediate execution |


**Example**  

```js
// How to execute function no more than once per second?
```

<a name="isFnAsync"></a>

### isFnAsync(fn) ⇒ <code>boolean</code>
Checks if function is async


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>\*</code> | source function |


**Example**  

```js
// How to check if function is async?
```

<a name="isFnClass"></a>

### isFnClass(fn) ⇒ <code>boolean</code>
Checks if a function is class or instance of class


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>\*</code> | source function |


**Example**  

```js
// How to check if a function is ES6 Class?
```

<a name="wait"></a>

### wait([ms]) ⇒ <code>Promise.resolve</code>
Gets a Promise that resolves after specific time


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [ms] | <code>Number</code> | <code>0</code> | delay in ms |


**Example**  

```js
// How to sleep/delay in JS?
```


___
## Object utils:

  * [getAllSamePropsFromObj(obj, prop)](#getAllSamePropsFromObj) ⇒ <code>Array</code>
  * [getCopyOfObj(obj)](#getCopyOfObj) ⇒ <code>Object</code> \| <code>Array</code>
  * [getMapFromObj([obj], [getFiltered])](#getMapFromObj) ⇒ <code>Map</code>
  * [getMergedObj([target], [source])](#getMergedObj) ⇒ <code>Object</code>
  * [getObjFromFormData([fd])](#getObjFromFormData) ⇒ <code>Object</code>
  * [getObjLength(obj)](#getObjLength) ⇒ <code>number</code>
  * [getObjWithFallbacks(data, [rules], [fallbacks])](#getObjWithFallbacks) ⇒ <code>Object</code>
  * [isObjEmpty(obj)](#isObjEmpty) ⇒ <code>boolean</code>
  * [isObjHasOwnProp(obj, prop)](#isObjHasOwnProp) ⇒ <code>boolean</code>
  * [isObjPromise(obj)](#isObjPromise) ⇒ <code>boolean</code>

<a name="getAllSamePropsFromObj"></a>

### getAllSamePropsFromObj(obj, prop) ⇒ <code>Array</code>
Gets all values inside an object by the specified key, including deeply nested objects


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | source object |
| prop | <code>String</code> | specified key to find |


**Example**  

```js
// How to get all duplicate key values inside object?
```

<a name="getCopyOfObj"></a>

### getCopyOfObj(obj) ⇒ <code>Object</code> \| <code>Array</code>
Gets a deep copy/clone of an object/array without a reference to the original object

**See**: https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | source object (array) |


**Example**  

```js
// How to make a deep clone of object?
```

<a name="getMapFromObj"></a>

### getMapFromObj([obj], [getFiltered]) ⇒ <code>Map</code>
Gets a Map from object


| Param | Type | Description |
| --- | --- | --- |
| [obj] | <code>Object</code> | source object |
| [getFiltered] | <code>function</code> | filter function for each pair of key and value |


**Example**  

```js
// How to convert an object to ES6 Map and pass only number values?
```

<a name="getMergedObj"></a>

### getMergedObj([target], [source]) ⇒ <code>Object</code>
Gets one deeply merged object from two objects


| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>Object</code> | target object |
| [source] | <code>Object</code> | source object |


**Example**  

```js
// How to deeply merge two objects?
```

<a name="getObjFromFormData"></a>

### getObjFromFormData([fd]) ⇒ <code>Object</code>
Gets object from FormData interface


| Param | Type | Description |
| --- | --- | --- |
| [fd] | <code>FormData</code> | source FormData instance |


**Example**  

```js
// How to convert FormData to object?
```

<a name="getObjLength"></a>

### getObjLength(obj) ⇒ <code>number</code>
Gets a length of given object


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | source Object or Array |


**Example**  

```js
// How to count number of object keys?
```

<a name="getObjWithFallbacks"></a>

### getObjWithFallbacks(data, [rules], [fallbacks]) ⇒ <code>Object</code>
Gets an object with fixed keys and values


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | source data |
| [rules] | <code>Object</code> | rules for fix (see example) |
| [fallbacks] | <code>Object</code> | fallback for each type of values |


**Example**  

```js
// How to replace object props and values with own fallback data?
```

<a name="isObjEmpty"></a>

### isObjEmpty(obj) ⇒ <code>boolean</code>
Checks if an object is empty


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | source object |


**Example**  

```js
// How to check if an object is empty?
```

<a name="isObjHasOwnProp"></a>

### isObjHasOwnProp(obj, prop) ⇒ <code>boolean</code>
Checks if object has own property

**See**: https://eslint.org/docs/latest/rules/no-prototype-builtins  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | source object |
| prop | <code>String</code> | property name |


**Example**  

```js
// How to check if object has property without calling method directly?
```

<a name="isObjPromise"></a>

### isObjPromise(obj) ⇒ <code>boolean</code>
Checks if an object is promise


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | source object |


**Example**  

```js
// How to check if an object is promise?
```


___
## Json utils:

  * [getJSONFromStr(str, [reviver], [onError])](#getJSONFromStr) ⇒ <code>Object</code>
  * [isJSON(str)](#isJSON) ⇒ <code>Boolean</code>

<a name="getJSONFromStr"></a>

### getJSONFromStr(str, [reviver], [onError]) ⇒ <code>Object</code>
Gets safely parsed JSON from string

**See**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |
| [reviver] | <code>function</code> | reviver function |
| [onError] | <code>function</code> | error callback |


**Example**  

```js
// How convert string to JSON?
```

<a name="isJSON"></a>

### isJSON(str) ⇒ <code>Boolean</code>
Checks if string is a valid JSON string


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source String |


**Example**  

```js
// How to check if string is a JSON?
```


___
## Number utils:

  * [getMaxFromArr(arr)](#getMaxFromArr) ⇒ <code>number</code>
  * [getMinFromArr(arr)](#getMinFromArr) ⇒ <code>number</code>
  * [getRandomIntFromInterval([min], [max])](#getRandomIntFromInterval) ⇒ <code>number</code>
  * [getRounded(num, [places])](#getRounded) ⇒ <code>number</code>

<a name="getMaxFromArr"></a>

### getMaxFromArr(arr) ⇒ <code>number</code>
Gets max number from Array


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | source Array of numbers |


**Example**  

```js
// How to get max number from Array of numbers?
```

<a name="getMinFromArr"></a>

### getMinFromArr(arr) ⇒ <code>number</code>
Gets min number from Array


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | source Array of numbers |


**Example**  

```js
// How to get min number from Array of numbers?
```

<a name="getRandomIntFromInterval"></a>

### getRandomIntFromInterval([min], [max]) ⇒ <code>number</code>
Gets random integer between min and max value


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>Number</code> | <code>1</code> | min value |
| [max] | <code>Number</code> | <code>1000000000</code> | max value |


**Example**  

```js
// How to generate random number between two numbers?
```

<a name="getRounded"></a>

### getRounded(num, [places]) ⇒ <code>number</code>
Gets rounded number to specific decimal places


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| num | <code>Number</code> |  | source number |
| [places] | <code>Number</code> | <code>2</code> | decimal places |


**Example**  

```js
// How to round number to 4 decimal places?
```


___
## String utils:

  * [getId([length])](#getId) ⇒ <code>string</code>
  * [getStrDeclination(num, [words])](#getStrDeclination) ⇒ <code>string</code>
  * [getStrEscaped(str)](#getStrEscaped) ⇒ <code>string</code>
  * [getStrUnescaped(str)](#getStrUnescaped) ⇒ <code>string</code>
  * [getStrWithCapitalized(str)](#getStrWithCapitalized) ⇒ <code>string</code>
  * [getStrWithThousandSeparator(num, [separator])](#getStrWithThousandSeparator) ⇒ <code>string</code>
  * [getStrWithZeroFromNum(num, [digits])](#getStrWithZeroFromNum) ⇒ <code>string</code>
  * [getWords(str)](#getWords) ⇒ <code>Array.&lt;String&gt;</code>
  * [isStrInCamelCase(str)](#isStrInCamelCase) ⇒ <code>boolean</code>
  * [isStrInKebabCase(str)](#isStrInKebabCase) ⇒ <code>Boolean</code>
  * [isStrInSnakeCase(str)](#isStrInSnakeCase) ⇒ <code>Boolean</code>
  * [isStrUrl(str)](#isStrUrl) ⇒ <code>boolean</code>

<a name="getId"></a>

### getId([length]) ⇒ <code>string</code>
Gets unique string ID.


| Param | Type | Description |
| --- | --- | --- |
| [length] | <code>Number</code> | length of ID |


**Example**  

```js
// How to generate unique string ID?
```

<a name="getStrDeclination"></a>

### getStrDeclination(num, [words]) ⇒ <code>string</code>
Gets the declension of a word depending on the number. Useful for Cyrillic words


| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> | source number |
| [words] | <code>Array</code> | array of three words with declension of one, two and few or zero |


**Example**  

```js
// How to get right declension of Cyrillic word?
```

<a name="getStrEscaped"></a>

### getStrEscaped(str) ⇒ <code>string</code>
Gets a string with replaced special chars on their HTML entities.


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to escape special HTML characters?
```

<a name="getStrUnescaped"></a>

### getStrUnescaped(str) ⇒ <code>string</code>
Gets a string with replaced HTML entities on special chars


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to unescape special HTML characters?
```

<a name="getStrWithCapitalized"></a>

### getStrWithCapitalized(str) ⇒ <code>string</code>
Gets a string with uppercase first letter


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to make first letter of a string uppercase?
```

<a name="getStrWithThousandSeparator"></a>

### getStrWithThousandSeparator(num, [separator]) ⇒ <code>string</code>
Gets a formatted string with thousands separators from given number


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| num | <code>Number</code> |  | source number |
| [separator] | <code>String</code> | <code> </code> | separator between every thousand |


**Example**  

```js
// How to format a number with commas as thousands separators?
```

<a name="getStrWithZeroFromNum"></a>

### getStrWithZeroFromNum(num, [digits]) ⇒ <code>string</code>
Gets a string with leading zero


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| num | <code>Number</code> |  | source number |
| [digits] | <code>Number</code> | <code>2</code> | number of digits in target string |


**Example**  

```js
// How to add a leading zero to a number?
```

<a name="getWords"></a>

### getWords(str) ⇒ <code>Array.&lt;String&gt;</code>
Gets separated words from string


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How do I split a string into a list of words?
```

<a name="isStrInCamelCase"></a>

### isStrInCamelCase(str) ⇒ <code>boolean</code>
Checks if string written in camelCase

**See**: https://developer.mozilla.org/en-US/docs/Glossary/Camel_case  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to check if CSS class in camelCase style?
```

<a name="isStrInKebabCase"></a>

### isStrInKebabCase(str) ⇒ <code>Boolean</code>
Checks if a string written in kebab-case

**See**: https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to check if a string is in Kebab-case?
```

<a name="isStrInSnakeCase"></a>

### isStrInSnakeCase(str) ⇒ <code>Boolean</code>
Checks if a string written in snake_case

**See**: https://developer.mozilla.org/en-US/docs/Glossary/Snake_case  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to check if a string is in snake_case?
```

<a name="isStrUrl"></a>

### isStrUrl(str) ⇒ <code>boolean</code>
Checks if string is URL address or valid pathname of URL address


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to check if string is URL or pathname of URL?
```
