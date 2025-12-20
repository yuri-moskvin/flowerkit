# ⚙️ CSS utils pack API
___
## Usage
```ts
import { getCSSTransformValues, getCSSValue, getCSSVar, isMediaQuery, isSelectorValid, removeCSSVar, setCSSVar } from "@web3r/flowerkit/css";
```
___
## Functions

- [getCSSTransformValues](#getcsstransformvalues)
- [getCSSValue](#getcssvalue)
- [getCSSVar](#getcssvar)
- [isMediaQuery](#ismediaquery)
- [isSelectorValid](#isselectorvalid)
- [removeCSSVar](#removecssvar)
- [setCSSVar](#setcssvar)

### getCSSTransformValues

Gets an object with `x`, `y`, `z` values of CSS3 transform

| Function | Type |
| ---------- | ---------- |
| `getCSSTransformValues` | `(el: HTMLElement) => { x: number; y: number; z: number; }` |

Parameters:

* `el`: DOM element


References:

* [https://developer.mozilla.org/en-US/docs/Web/CSS/transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)


Examples:

```ts
// How to get `translate3d` values of a `div`?
// <div id="block" style="transform: translate3d(10px, 15px, 35px);"></div>
const block = document.getElementById("block");
const values = getCSSTransformValues(block);
console.log(values); // => { x: 10, y: 15, z: 35 }
```


### getCSSValue

Gets a calculated CSS property of an DOM-element

| Function | Type |
| ---------- | ---------- |
| `getCSSValue` | `(el: HTMLElement, prop: string) => string` |

Parameters:

* `el`: DOM element
* `prop`: CSS property


References:

* [https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)


Examples:

```ts
// How to get "height" prop of div from JS?
const block = document.querySelector("#myBlock");
getCSSValue(block, "height");
```


### getCSSVar

Gets value of CSS variable

| Function | Type |
| ---------- | ---------- |
| `getCSSVar` | `(el: HTMLElement, variable: string, isNumberFormat?: boolean or undefined) => string or number` |

Parameters:

* `el`: source DOM element
* `variable`: variable name
* `isNumberFormat`: whether to return a number rather than a string


References:

* [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)


Examples:

```ts
// How to get CSS3 variable value from an element?
const block = document.querySelector("#myBlock"); // <div id="myBlock" style="--myVar: value;">
getCSSVar(block, "--myVar"); // or just "myVar"
```


### isMediaQuery

Gets a result of testing of a CSS media query

| Function | Type |
| ---------- | ---------- |
| `isMediaQuery` | `(str: string) => boolean` |

Parameters:

* `str`: source media query string


References:

* [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries)


Examples:

```ts
// How to check if a user device has portrait or landscape orientation?
const mediaQuery = "(orientation: portrait)";
const isPortrait = isMediaQuery(mediaQuery);
console.log(isPortrait); // => false
```


### isSelectorValid

Checks if string is valid CSS selector

| Function | Type |
| ---------- | ---------- |
| `isSelectorValid` | `(str: string) => boolean` |

Parameters:

* `str`: source selector


References:

* [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)


Examples:

```ts
// How to check if the CSS selector is valid?
const selector = "#myElement";
const isValid = isSelectorValid(selector);
console.log(isValid); // => true
```


### removeCSSVar

Removes CSS3 variable from specific DOM node

| Function | Type |
| ---------- | ---------- |
| `removeCSSVar` | `(el: HTMLElement or undefined, variable: string) => void` |

Parameters:

* `el`: DOM element
* `variable`: variable name


References:

* [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)


Examples:

```ts
// How to remove CSS variable from div?
// <div id="myBlock" style="--myVar: 10;"></div>
const block = document.getElementById("myBlock");
removeCSSVar(block, "myVar");
// <div id="myBlock" style=""></div>
```


### setCSSVar

Sets CSS3 variable to specific DOM node

| Function | Type |
| ---------- | ---------- |
| `setCSSVar` | `(el: HTMLElement or undefined, variable: string, value?: string or number or boolean) => void` |

Parameters:

* `el`: DOM element
* `variable`: variable name
* `value`: variable value


References:

* [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)


Examples:

```ts
// How to set CSS variable to div?
// <div id="myBlock"></div>
const block = document.getElementById("myBlock");
setCSSVar(block, "myVar", 10);
// <div id="myBlock" style="--myVar: 10"></div>
```



