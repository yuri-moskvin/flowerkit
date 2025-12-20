# FlowerKit 🌸 JS and TS utils frontend library

More than 70 commonly used utility functions for JavaScript and TypeScript that simplify frontend development.

## Usage 🛠️

```js
// tree-shakable ESM import
import { isNode, /* ... */ } from "@web3r/flowerkit/dom";
import { onSwipe, /* ... */ } from "@web3r/flowerkit/evt";

// ESM import of whole utils packs
import { domKit, evtKit, /* ... */ } from "@web3r/flowerkit";

// CJS import
const domKit = require("@web3r/flowerkit/dom");
```

## Features ✨

- **Tree shaking**: includes only the necessary code in your bundle;
- **Friendly names**: functions that return objects begin with the "get" prefix, and functions that return boolean values begin with "is";
- **JSDoc**: each utility includes a detailed description and usage examples, available in your IDE;
- **Lightweight**: the entire library is no more than 30 KB;
- **Error catching**: throws immediate errors when invalid arguments are passed;
- **SSR friendly**: fallbacks for DOM `window` and `document` objects;
- **TypeScript friendly**: types included for all functions;
- **ESM and CJS**: supports both types of modules;

## Structure ☰

- `@web3r/flowerkit/arr` — for arrays and array-like objects;
- `@web3r/flowerkit/css` — for CSS from JS;
- `@web3r/flowerkit/dom` — for DOM and Nodes;
- `@web3r/flowerkit/evt` — for events;
- `@web3r/flowerkit/fn` — for functions;
- `@web3r/flowerkit/json` — for JSON;
- `@web3r/flowerkit/net` — for network features;
- `@web3r/flowerkit/obj` — for objects;
- `@web3r/flowerkit/str` — for strings;
- `@web3r/flowerkit/user` — for common client-side browser features;
- `@web3r/flowerkit/date` — for Date constructor features;

## Examples 💡

### Capitalize the first letter of a string

```js
import { getStringWithCapitalizedFirstLetter } from "@web3r/flowerkit/str";

const str = "hello world";
const upperStr = getStringWithCapitalizedFirstLetter(str);
console.log(upperStr); // => "Hello world"
```

### Curry a function

```js
import { getCurryFn } from "@web3r/flowerkit/fn";

function getSum(a, b) {
  return a + b;
}

const getCurriedSum = getCurryFn(getSum);
curriedSum(1)(2); // 3
```

### Debounce a function

```js
import { getDebouncedFn } from "@web3r/flowerkit/fn";

const fn = getDebouncedFn(alert, 1000);

fn(1); // calls immediately
fn(2); // ignored

setTimeout(() => fn(3), 100); // ignored
setTimeout(() => fn(4), 1100); // calls
setTimeout(() => fn(5), 1500); // ignored
```

### Throttle a function

```js
import { getThrottledFn } from "@web3r/flowerkit/fn";

const fn = getThrottledFn(alert, 5000); // this function should only be able to execute once every 5 sec.

fn(1); // calls immediately
fn(2); // ignored
setTimeout(() => fn(3), 5000); // calls
```

### Get the number of keys in an object

```js
import { getObjLength } from "@web3r/flowerkit/obj";

const obj = {
  key1: "value1",
  key2: "value2"
};
const objLength = getObjLength(obj);
console.log(objLength); // => 2
```

### Deep clone an object

```js
import { getCopyOfObj } from "@web3r/flowerkit/obj";

const originalObject = {
  value: 1,
}
const copy = getCopyOfObj(originalObject);

copy.value = 2;
console.log(originalObject.value === copy.value) // false
```

### Merge two objects

```js
import { getMergedObj } from "@web3r/flowerkit/obj";

const targetObj = {
  first: [ "foo" ],
}
const sourceObj = {
  first: [ "moo" ],
  boo: 12
}
getMergedObj(targetObj, sourceObj) // => { first: [ "foo", "moo" ], boo: 12 }
```

### Generates a random ID

```js
import { getId } from "@web3r/flowerkit/str";

const uniqueId = getId(100);
console.log(uniqueId.length); // 100
```

### Checks if an object is iterable

```js
import { isIterable } from "@web3r/flowerkit/arr";

const myDivs = document.querySelectAll("div");
const isCanBeIterated = isIterable(myDivs);
console.log(isCanBeIterated); // => true
```

### Set a CSS3 variable from JavaScript

```js
import { setCSSVar } from "@web3r/flowerkit/css";

const block = document.getElementById("myBlock");
setCSSVar(block, "myVar", 10);
// <div id="myBlock" style="--myVar: 10"></div>
```

### Detect an "invalid date" instance

```js
import { isValidDate } from "@web3r/flowerkit/date";

const wrongDate = new Date("invalid_date");
console.log(isValidDate(wrongDate)); // => false

const validDate = new Date(0);
console.log(isValidDate(validDate)); // => true
```

## API 🚀

The library helps you solve many other problems. See [API docs & examples](https://github.com/yuri-moskvin/flowerkit/blob/main/docs/index.md).
