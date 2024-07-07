# 🌸 FlowerKit: API Reference
___

* [Array utils](#arr)
* [User utils](#user)
* [CSS utils](#css)
* [DOM utils](#dom)
* [Event utils](#evt)
* [Function utils](#fn)
* [Json utils](#json)
* [Network utils](#net)
* [Number utils](#num)
* [Object utils](#obj)
* [String utils](#str)

___
## Array utils:
<a name="arr"></a>

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
// How to call API for each element of array and return result?const myAPIFn = (item, index, arr) => Promise.resolve("success" + item);const array = [ 1, 2, 3 ];const result = await getAsyncMap(array, myAPIFn);console.log(result); // => [ "success1", "success2, "success3" ]
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
// How to get the difference between two arrays?const arr1 = [ 1, 2, 3 ];const arr2 = [ 3, 4, 5, 6 ];const diff = getDiff(arr1, arr2);console.log(diff); // => [ 1, 2, 4, 5, 6 ]
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
// How to get intersection of two Arrays?const arr1 = [ 1, 2, 3 ];const arr2 = [ 2, 3, 4, 5 ];const intersection = getIntersection(arr1, arr2);console.log(intersection); // => [ 2, 3 ]
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
// How to get last element from NodeList of `div`?const lastDiv = getLastFromIterable(document.querySelectorAll("div"));console.log(lastDiv) // => Node or null
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
// How to merge two arrays in JavaScript and de-duplicate items?const arr1 = [ 1, 2, 3 ];const arr2 = [ 2, 3, 4, 5 ];const union = getUnion(arr1, arr2);console.log(union); // => [ 1, 2, 3, 4, 5 ];
```

<a name="isItemsEqual"></a>

### isItemsEqual(arr) ⇒ <code>boolean</code>
Checks if items of given Array is same


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | source Array |


**Example**  

```js
// How to check if all records are equal in array?const arr = [ 1, 1, 1 ];const isSame = isItemsEqual(arr);console.log(isSame); // => true
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
// How to check for iterability?const myDivs = document.querySelectAll("div");const isCanBeIterated = isIterable(myDivs);console.log(isCanBeIterated); // => true
```


___
## User utils:
<a name="user"></a>

  * [deleteCookie(name)](#deleteCookie)
  * [getCookie(name)](#getCookie) ⇒ <code>string</code> \| <code>undefined</code>
  * [setCookie(name, value, [options])](#setCookie)
  * [getScrollbarWidth()](#getScrollbarWidth) ⇒ <code>number</code>
  * [isAdblock()](#isAdblock) ⇒ <code>boolean</code>
  * [isMobileDevice()](#isMobileDevice) ⇒ <code>boolean</code>
  * [isTouchDevice()](#isTouchDevice) ⇒ <code>boolean</code>

<a name="deleteCookie"></a>

### deleteCookie(name)
Removes the Cookie value

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of Cookie |


**Example**  

```js
// How to delete a Cookie?removeCookie("myCookieName");
```

<a name="getCookie"></a>

### getCookie(name) ⇒ <code>string</code> \| <code>undefined</code>
Gets the Cookie value

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of Cookie |


**Example**  

```js
// How to get value of Cookie?setCookie("myCookieName", "myValue");const savedValue = getCookie("myCookieName");console.log(savedValue); // => "myValue"
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
// How to set Cookie for one day or other time?setCookie("myCookie", "value", { expires: 86400 }) // expires in sec
```

<a name="getScrollbarWidth"></a>

### getScrollbarWidth() ⇒ <code>number</code>
Gets width of user scrollbar


**Example**  

```js
// How to get width of user scrollbar?const scrollbarWidth = getScrollBarWidth();console.log(scrollbarWidth); // => number
```

<a name="isAdblock"></a>

### isAdblock() ⇒ <code>boolean</code>
Checks if the user has adblock


**Example**  

```js
// How to detect if user has adblock in browser?const isAdblock = isAdblock();console.log(isAdblock); // => false
```

<a name="isMobileDevice"></a>

### isMobileDevice() ⇒ <code>boolean</code>
Checks  if the user is using a mobile browser


**Example**  

```js
// How to detect mobile browser?const isMobile = isMobileDevice();console.log(isMobile); // => false
```

<a name="isTouchDevice"></a>

### isTouchDevice() ⇒ <code>boolean</code>
Checks if user devise has touchscreen


**Example**  

```js
// How to check if user has touchscreen device?const isTouchEnabled = isTouchDevice();console.log(isTouchEnabled); // => false
```


___
## CSS utils:
<a name="css"></a>

  * [getCSSTransformValues(el)](#getCSSTransformValues) ⇒ <code>Object</code>
  * [getCSSValue(el, prop)](#getCSSValue) ⇒ <code>string</code>
  * [getCSSVar(el, variable, [isNumberFormat])](#getCSSVar) ⇒ <code>string</code> \| <code>number</code>
  * [isMediaQuery(str)](#isMediaQuery) ⇒ <code>boolean</code>
  * [isSelectorValid(str)](#isSelectorValid) ⇒ <code>boolean</code>
  * [removeCSSVar(el, variable)](#removeCSSVar)
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
// How to get `translate3d` values of a `div`?// <div id="block" style="transform: translate3d(10px, 15px, 35px);"></div>const block = document.getElementById("block");const values = getCSSTransformValues(block);console.log(values); // => { x: 10, y: 15, z: 35 }
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
// How to get "height" prop of div from JS?const block = document.querySelector("#myBlock");getCSSValue(block, "height");
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
// How to get CSS3 variable value from element?const block = document.querySelector("#myBlock"); // <div id="myBlock" style="--myVar: value;">getCSSVar(block, "--myVar"); // or just "myVar"
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
// How to check if user device has portrait or landscape orientation?const mediaQuery = "(orientation: portrait)";const isPortrait = isMediaQuery(mediaQuery);console.log(isPortrait); // => false
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
// How to check if CSS selector is valid?const selector = "#myElement";const isValid = isSelectorValid(selector);console.log(isValid); // => true
```

<a name="removeCSSVar"></a>

### removeCSSVar(el, variable)
Removes CSS3 variable from specific DOM node

**See**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |
| variable | <code>String</code> | variable name |


**Example**  

```js
// How to remove CSS variable from div?// <div id="myBlock" style="--myVar: 10;"></div>const block = document.getElementById("myBlock");removeCSSVar(block, "myVar");// <div id="myBlock" style=""></div>
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
// How to set CSS variable to div?// <div id="myBlock"></div>const block = document.getElementById("myBlock");setCSSVar(block, "myVar", 10);// <div id="myBlock" style="--myVar: 10"></div>
```


___
## DOM utils:
<a name="dom"></a>

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
// How to get all siblings of `li` DOM-element with specific ID?// <ul>//   <li id="item1">One</li>//   <li id="item2">Two</li>//   <li id="item3">Three</li>// <ul>const secondItem = document.getElementById("item2");getElSiblings(secondItem).filter(item => item !== secondItem) // [ li#item1, li#utem3 ]
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
// How to wrap content to the few nested `div` blocks?// <div id="block">My Element</div>const wrapperLayout = ` <div class="wrapper">   <div class="wrapper__inner"></div> </div>`;const el = document.getElementById("block");const wrapped = getElWrapper(el, wrapperLayout);console.log(wrapped.outerHTML); // => `<div class="wrapper"><div class="wrapper__inner"><div id="block">My Element</div></div></div>`
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
// How to get parsed HTML elements from string?Array.from(getHTMLFromStr(`  <p>Hello world!</p>  <p>Hello world!</p>`)); // returns array of two paragraph nodes
```

<a name="getIndexOfEl"></a>

### getIndexOfEl(el) ⇒ <code>number</code>
Gets index of Node from relatively its siblings


| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> \| <code>Node</code> \| <code>Element</code> \| <code>Document</code> | DOM element |


**Example**  

```js
// How to get index of specific `li` element?// <ul>//   <li>0<li>//   <li id="myElement">1</li>//   <li>2</li>// </ul>const index = document.querySelector("li#myElement");console.log(index); // => 1
```

<a name="isNode"></a>

### isNode(el) ⇒ <code>boolean</code>
Checks whether the specified object is a DOM element


| Param | Type | Description |
| --- | --- | --- |
| el | <code>\*</code> | source object |


**Example**  

```js
// How to check if object is dom node?const isMyElNode = isNode(document.getElementById("test"));console.log(isMyElNode) // => boolean
```

<a name="removeChildNodes"></a>

### removeChildNodes(el)
Removes all child nodes of given node


| Param | Type | Description |
| --- | --- | --- |
| el | <code>Node</code> \| <code>Element</code> \| <code>HTMLElement</code> \| <code>Document</code> | node |


**Example**  

```js
// How to remove all child elements of a DOM node?// <div id="myBlock"><div>Block with child nodes</div></div>const myDiv = document.getElementById("myBlock");removeChildNodes(myDiv);console.log(Array.from(myDiv.children).length); // => 0
```


___
## Event utils:
<a name="evt"></a>

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
// How to create custom event with user data and bubble it on document element?bubble(document, "myEvent", { myData: "test" })// How to create custom event and bubble it on specific node?const myEl = document.querySelector("#myElement");if(myEl) {  bubble(myEl, "myEvent")}// How to listen custom events? Use your listener before calling of bubble function.document.addEventListener("myEvent", (e) => console.log(e));
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
// How to check if DOM is ready?const callback = () => console.log("DOM Content Loaded");onDOMReady(callback);
```

<a name="onSwipe"></a>

### onSwipe(el, [props])
Adds custom `swipe` event on element.Works on desktop and mobile browsers.Supports speed, time and direction.Generates custom `swipe` event on element or uses your own callback.


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
// How to listen `swipe` event on element in JS?// <div id="myBlock"></div>const myBlock = document.getElementById("myBlock");onSwipe(myBlock, {  callback: ({ dist, dir, time }) => {    console.log(dir, dist, time); // swipe direction, swipe distant, swipe time    if(dir === "right") {      // logic for right swipe    }  }});// Or with custom events:onSwipe(myBlock);myBlock.addEventListener("swipe", (e) => console.log(e.detail));// To destroy whole instance or remove listeners:myBlock._swipeCtrl.destroy(); // or other name given in `options.instanceName`;
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
// How to detect when whole page has loaded?const callback = () => console.log("Page loaded");onWindowLoad(callback);
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
// How to detect when page has been resized and run callback once when resize ends?const callback = () => console.log("Page loaded");onWindowLoad(callback);
```


___
## Json utils:
<a name="json"></a>

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
// How convert string to JSON?const json = getJSONFromStr('{ "hello": "world" }');console.log(json.hello) // => "world"
```

<a name="isJSON"></a>

### isJSON(str) ⇒ <code>Boolean</code>
Checks if string is a valid JSON string


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source String |


**Example**  

```js
// How to check if string is a JSON?const str = '{ "hello": "world" }';const isStrJSON = isJSON(str);console.log(isStrJSON); // => true
```


___
## Network utils:
<a name="net"></a>

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
// How to load external CDN script asynchronously?getExternalScript({   src: "https://ajax.googleapis.com/ajax/libs/d3js/7.8.5/d3.min.js",   id: "d3"})  .then((script) => {    console.log("Script is loaded");  });
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
// How to convert object to FormData interface?const obj = {  test: 123,  boo: "foo"}getFormDataFromObj(obj); // FormData with "test" and "boo" keys// With custom callbackgetFormDataFromObj(obj, new FormData(), (name, value, fd) => {  if(name !== "test") {     fd.set(name, value);  }}); // FormData only with "boo" key
```

<a name="getFromServer"></a>

### getFromServer([props]) ⇒ <code>Promise</code>
Gets result of async fetch query to the server. Lightweight alternative for `axios` lib

**See**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API  

| Param | Type | Description |
| --- | --- | --- |
| [props] | <code>Object</code> | params |
| [props.contentType] | <code>String</code> | type of request content ("auto" (by default), "application/json", "application/x-www-form-urlencoded", or "multipart/form-data") |
| [props.isBubble] | <code>Boolean</code> | bubble a custom event with name "getFromServer" after success request and response in details event field |
| [props.timeout] | <code>Number</code> | query timeout |
| [props.method] | <code>String</code> | request method (`GET` (by default), `PUT`, `POST` or `DELETE`) |
| [props.mode] | <code>RequestMode</code> | request mode |
| [props.signal] | <code>AbortSignal</code> | instance of AbortSignal for request |
| props.data | <code>Object</code> \| <code>FormData</code> | object of FormData instance for request |
| [props.getSuccessResp] | <code>function</code> | callback for success response |
| [props.getResp] | <code>function</code> | async callback for response (overrides default behavior) |
| [props.type] | <code>String</code> | type of response (`text`, `json` (by default), `blob` or `arrayBuffer`) |
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
// How to POST data to the server?getFromServer({ url: "/api/send", method: "POST", data: { idUser: "123" } })  .then(resp => console.log(resp)) // POST "api/send" with JSON body// How to GET data from the server?getFromServer({ url: "/api/send", method: "GET", data: { idUser: "123" } })  .then(resp => console.log(resp)) // GET "/api/send/?idUser=123" with query params from "data" in url// How to POST data to the server with FormData?const myData = new FormData();getFromServer({ url: "/api/send", method: "POST", data: myData })  .then(resp => console.log(resp)) // POST "/api/send" with FormData body// How to GET some user id data from the server?const userId = await getFromServer({ url: "/api/send", method: "GET", getSuccessResp: (resp) => resp.userId }) // GET "api/send" and parse userId field from response// How to GET some user id data from the server with promise?getFromServer({ url: "/api/send", method: "GET" })  .then(resp => console.log(resp.userId)) // GET "api/send" and return promise with response
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
// How to set query params to URL string?const url = "https://example.com";getUrlWithQueryParams(url, { foo: 1 }); // "https://example.com/?foo=1"// How to update query params in URL string?const url = "/api/users/?page=1";getUrlWithQueryParams(url, { page: 2, limit: 100 }); // "/api/users/?page=2&limit=100"
```


___
## Object utils:
<a name="obj"></a>

  * [getAllSamePropsFromObj(obj, prop)](#getAllSamePropsFromObj) ⇒ <code>Array</code>
  * [getCopyOfObj(obj)](#getCopyOfObj) ⇒ <code>Object</code> \| <code>Array</code>
  * [getMapFromObj([obj], [getFiltered])](#getMapFromObj) ⇒ <code>Map</code>
  * [getMergedObj([target], [source], [options])](#getMergedObj) ⇒ <code>Object</code>
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
// How to get all duplicate key values inside object?const myObj = {  someProp1: {    a: "value 1",    b: 2,    c: 3,    d: {      a: 1,      b: 2    }  },  someProp2: {    a: "value 3",    b: 2,    c: {      a: "value 4"    }  }}getAllSamePropsFromObj(myObj, "a") // [ "value 1", 1, "value 3", "value 4" ]
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
// How to make a deep clone of object?const originalObject = {  value: 1,}const copy = getCopyOfObj(originalObject);copy.value = 2;console.log(originalObject.value === copy.value) // false
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
// How to convert an object to ES6 Map and pass only number values?const sourceObj = {  hello: "world",  goodbye: 1};const targetMap = getMapFromObj(sourceObj, (key, value, index) => typeof value === "number");console.log(targetMap); // => Map<"goodbye", 1>
```

<a name="getMergedObj"></a>

### getMergedObj([target], [source], [options]) ⇒ <code>Object</code>
Gets one deeply merged object from two objects


| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>Object</code> | target object |
| [source] | <code>Object</code> | source object |
| [options] | <code>Object</code> | merge options |
| [options.isMergeArrays] | <code>Boolean</code> | concat nested arrays or use target value |


**Example**  

```js
// How to deeply merge two objects?const targetObj = {  first: [ "foo" ],}const sourceObj = {  first: [ "moo" ],  boo: 12}getMergedObj(targetObj, sourceObj) // => { first: [ "foo", "moo" ], boo: 12 }
```

<a name="getObjFromFormData"></a>

### getObjFromFormData([fd]) ⇒ <code>Object</code>
Gets object from FormData interface


| Param | Type | Description |
| --- | --- | --- |
| [fd] | <code>FormData</code> | source FormData instance |


**Example**  

```js
// How to convert FormData to object?const fd = new FormData();fd.append("test", "val");getObjFromFd(fd); // { test: "val" }
```

<a name="getObjLength"></a>

### getObjLength(obj) ⇒ <code>number</code>
Gets a length of given object


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | source Object or Array |


**Example**  

```js
// How to count number of object keys?const obj = {  key1: "value1",  key2: "value2"};const objLength = getObjLength(obj);console.log(objLength); // => 2
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
// How to replace object props and values with own fallback data?const uglyObjectFromAPI = {  userId: 123,  has_access: 0,  something: "",  price: "500.05",  wrongPrice: "500,05",  custom: []};const niceRules =  {  userId: {    output: "idUser",    type: "string"  },  has_access: {    output: "isAccess",    type: "boolean"  },  something: {    output: "something",    fallback: "—"  },  price: {    output: "price",    type: "number"  },  wrongPrice: {    output: "wrongPrice",    type: "number"  },  custom: {    output: "custom",    getValue: (value, fallback) => Array.isArray(value) ? "custom value" : value  }}const result = getObjWithFallbacks(uglyObjectFromAPI, niceRules);console.log(result); // =>// {//  idUser: "123",//  isAccess: false,//  something: "—",//  price: 500.05,//  wrongPrice: 0,//  custom: "custom value"// }
```

<a name="isObjEmpty"></a>

### isObjEmpty(obj) ⇒ <code>boolean</code>
Checks if an object is empty


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | source object |


**Example**  

```js
// How to check if an object is empty?const obj = {};const isEmpty = isObjEmpty(obj);console.log(isEmpty); // => true
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
// How to check if object has property without calling method directly?const obj = {  foo: "bar"};const isHasOwnProp = isObjHasOwnProp(obj, "foo");console.log(isHasOwnProp); // => true
```

<a name="isObjPromise"></a>

### isObjPromise(obj) ⇒ <code>boolean</code>
Checks if an object is promise


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | source object |


**Example**  

```js
// How to check if an object is promise?const obj = new Promise();const isPromise = isObjPromise(obj);console.log(isPromise); // => true
```


___
## String utils:
<a name="str"></a>

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
// How to generate unique string ID?const uniqueId = getId(100);console.log(uniqueId.length); // 100
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
// How to get right declension of Cyrillic word?const words = [ "товар", "товара", "товаров" ]; // one, two, few or zerogetStrDeclination(2, words); // "товара"
```

<a name="getStrEscaped"></a>

### getStrEscaped(str) ⇒ <code>string</code>
Gets a string with replaced special chars on their HTML entities.


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to escape special HTML characters?const str = "<b>Hello world & underworld!</b>";const escaped = getStrEscaped(str);console.log(escaped); // => "&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;"
```

<a name="getStrUnescaped"></a>

### getStrUnescaped(str) ⇒ <code>string</code>
Gets a string with replaced HTML entities on special chars


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to unescape special HTML characters?const str = "&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;";const escaped = getStrEscaped(str);console.log(escaped); // => "<b>Hello world & underworld!</b>"
```

<a name="getStrWithCapitalized"></a>

### getStrWithCapitalized(str) ⇒ <code>string</code>
Gets a string with uppercase first letter


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to make first letter of a string uppercase?const str = "hello world";const upperStr = getStringWithCapitalizedFirstLetter(str);console.log(upperStr); // => "Hello world"
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
// How to format a number with commas as thousands separators?const str = getStrWithThousandSeparator(1000000, ",");console.log(str); // => "1,000,000"
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
// How to add a leading zero to a number?const num = 9;const withZero = getStrWithZeroFromNumber(9, 3);console.log(withZero); // => "009"
```

<a name="getWords"></a>

### getWords(str) ⇒ <code>Array.&lt;String&gt;</code>
Gets separated words from string


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How do I split a string into a list of words?const str = "helloWorld! what's_up?";const words = getWords(str);console.log(words); // => [ "hello", "World", "what", "s", "up" ]
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
// How to check if CSS class in camelCase style?const classname = "myClass";const isCamel = isStrInCamelCase(className);console.log(isCamel); // => true
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
// How to check if a string is in Kebab-case?const str = "my-string";const isKebab = isStrInKebabCase(str);console.log(isKebab); // => true
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
// How to check if a string is in snake_case?const str = "my_string";const isSnake = isStrInSnakeCase(str);console.log(isSnake); // => true
```

<a name="isStrUrl"></a>

### isStrUrl(str) ⇒ <code>boolean</code>
Checks if string is URL address or valid pathname of URL address


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | source string |


**Example**  

```js
// How to check if string is URL or pathname of URL?const isUrl = isStrUrl("myPage.php");console.log(isUrl); // => true
```


___
## Function utils:
<a name="fn"></a>

  * [getCurryFn(fn, [arity])](#getCurryFn) ⇒ <code>function</code>
  * [getDebouncedFn(cb, [wait], [isImmediate])](#getDebouncedFn) ⇒ <code>function</code>
  * [isFnAsync(fn)](#isFnAsync) ⇒ <code>boolean</code>
  * [isFnClass(fn)](#isFnClass) ⇒ <code>boolean</code>
  * [wait([ms])](#wait) ⇒ <code>Promise</code>

<a name="getCurryFn"></a>

### getCurryFn(fn, [arity]) ⇒ <code>function</code>
Evaluating functions with multiple arguments and decomposing them into a sequence of functions with a specific number of arguments


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | source function |
| [arity] | <code>Number</code> | arity of function |


**Example**  

```js
// How to curry a function?function getSum(a, b) {  return a + b;}const getCurriedSum = getCurryFn(getSum);curriedSum(1)(2); // 3
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
// How to execute function no more than once per second?const fn = getDebouncedFn(alert, 1000);fn(1); // calls immediatelyfn(2); // ignoredsetTimeout(() => fn(3), 100); // ignoredsetTimeout(() => fn(4), 1100); // callssetTimeout(() => fn(5), 1500); // ignored
```

<a name="isFnAsync"></a>

### isFnAsync(fn) ⇒ <code>boolean</code>
Checks if function is async


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>\*</code> | source function |


**Example**  

```js
// How to check if function is async?const fn = async () => {};const isAsync = isFnAsync(fn);console.log(isAsync); // => true
```

<a name="isFnClass"></a>

### isFnClass(fn) ⇒ <code>boolean</code>
Checks if a function is class or instance of class


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>\*</code> | source function |


**Example**  

```js
// How to check if a function is ES6 Class?const fn = new Class();const isClass = isFnClass(fn);console.log(isClass); // => true
```

<a name="wait"></a>

### wait([ms]) ⇒ <code>Promise</code>
Gets a Promise that resolves after specific time


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [ms] | <code>Number</code> | <code>0</code> | delay in ms |


**Example**  

```js
// How to sleep/delay in JS?wait(3000).then(() => {  console.log("Runs after 3 sec!");})
```


___
## Number utils:
<a name="num"></a>

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
// How to get max number from Array of numbers?const arr = [ 100, 200, 300 ];const max = getMaxFromArr(arr);console.log(max); // 300
```

<a name="getMinFromArr"></a>

### getMinFromArr(arr) ⇒ <code>number</code>
Gets min number from Array


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | source Array of numbers |


**Example**  

```js
// How to get min number from Array of numbers?const arr = [ 100, 200, 300 ];const min = getMinFromArr(arr);console.log(min); // 100
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
// How to generate random number between two numbers?const randomNumber = getRandomIntFromInterval(1, 10);console.log(randomNumber >= 1 && randomNumber <= 10); // => true
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
// How to round number to 4 decimal places?const num = 0.00025;const rounded = getRounded(num, 4);console.log(rounded); // => 0.0003
```

