# ⚙️ CSS utils pack API

___

## Usage

```ts
// import functions
import { getCSSTransformValues, getCSSValue, getCSSVar, isMediaQuery, isSelectorValid, removeCSSVar, setCSSVar } from "@web3r/flowerkit/css";

// import types
import type { TGetCSSTransformValuesArgs, TGetCSSTransformValuesReturn, TGetCSSValueArgs, TGetCSSValueReturn, TGetCSSVarArgs, TGetCSSVarReturn, TIsMediaQueryArgs, TIsMediaQueryReturn, TIsSelectorValidArgs, TIsSelectorValidReturn, TRemoveCSSVarArgs, TRemoveCSSVarReturn, TSetCSSVarArgs, TSetCSSVarReturn } from "@web3r/flowerkit/css";
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

```ts
// Read the current translated position before continuing a drag animation
const { x, y } = getCSSTransformValues(draggableElement);
draggableElement.style.transform = `translate(${x + 20}px, ${y}px)`;
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

```ts
// Check whether a responsive navigation element is currently hidden
const display = getCSSValue(navigation, "display");
const isNavigationHidden = display === "none";
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

```ts
// Read a numeric spacing token from CSS in JavaScript
const spacing = getCSSVar(document.documentElement, "spacing", true);
console.log(spacing); // number
```


### isMediaQuery

Gets a result of testing a CSS media query and wraps bare media features when needed.

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

```ts
// Disable decorative animation when the user prefers reduced motion
const shouldReduceMotion = isMediaQuery("(prefers-reduced-motion: reduce)");
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

```ts
// Validate a configurable selector before calling querySelector
const element = isSelectorValid(config.selector)
  ? document.querySelector(config.selector)
  : null;
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

```ts
// Remove an inline theme override and fall back to the stylesheet value
removeCSSVar(document.documentElement, "accent-color");
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

```ts
// Update a CSS progress variable from JavaScript
setCSSVar(progressBar, "progress", `${completedPercent}%`);
```

## Types

- [TGetCSSTransformValuesArgs](#tgetcsstransformvaluesargs)
- [TGetCSSTransformValuesReturn](#tgetcsstransformvaluesreturn)
- [TGetCSSValueArgs](#tgetcssvalueargs)
- [TGetCSSValueReturn](#tgetcssvaluereturn)
- [TGetCSSVarArgs](#tgetcssvarargs)
- [TGetCSSVarReturn](#tgetcssvarreturn)
- [TIsMediaQueryArgs](#tismediaqueryargs)
- [TIsMediaQueryReturn](#tismediaqueryreturn)
- [TIsSelectorValidArgs](#tisselectorvalidargs)
- [TIsSelectorValidReturn](#tisselectorvalidreturn)
- [TRemoveCSSVarArgs](#tremovecssvarargs)
- [TRemoveCSSVarReturn](#tremovecssvarreturn)
- [TSetCSSVarArgs](#tsetcssvarargs)
- [TSetCSSVarReturn](#tsetcssvarreturn)

### TGetCSSTransformValuesArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCSSTransformValuesArgs` | `Parameters<typeof getCSSTransformValues>` |

### TGetCSSTransformValuesReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCSSTransformValuesReturn` | `ReturnType<typeof getCSSTransformValues>` |

### TGetCSSValueArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCSSValueArgs` | `Parameters<typeof getCSSValue>` |

### TGetCSSValueReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCSSValueReturn` | `ReturnType<typeof getCSSValue>` |

### TGetCSSVarArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCSSVarArgs` | `Parameters<typeof getCSSVar>` |

### TGetCSSVarReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCSSVarReturn` | `ReturnType<typeof getCSSVar>` |

### TIsMediaQueryArgs

| Type | Type |
| ---------- | ---------- |
| `TIsMediaQueryArgs` | `Parameters<typeof isMediaQuery>` |

### TIsMediaQueryReturn

| Type | Type |
| ---------- | ---------- |
| `TIsMediaQueryReturn` | `ReturnType<typeof isMediaQuery>` |

### TIsSelectorValidArgs

| Type | Type |
| ---------- | ---------- |
| `TIsSelectorValidArgs` | `Parameters<typeof isSelectorValid>` |

### TIsSelectorValidReturn

| Type | Type |
| ---------- | ---------- |
| `TIsSelectorValidReturn` | `ReturnType<typeof isSelectorValid>` |

### TRemoveCSSVarArgs

| Type | Type |
| ---------- | ---------- |
| `TRemoveCSSVarArgs` | `Parameters<typeof removeCSSVar>` |

### TRemoveCSSVarReturn

| Type | Type |
| ---------- | ---------- |
| `TRemoveCSSVarReturn` | `ReturnType<typeof removeCSSVar>` |

### TSetCSSVarArgs

| Type | Type |
| ---------- | ---------- |
| `TSetCSSVarArgs` | `Parameters<typeof setCSSVar>` |

### TSetCSSVarReturn

| Type | Type |
| ---------- | ---------- |
| `TSetCSSVarReturn` | `ReturnType<typeof setCSSVar>` |
