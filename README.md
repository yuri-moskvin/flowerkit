# 🌸 FlowerKit: JS utils library

A collection of more than 60 often used utility JS functions that simplify frontend development. 

## Usage

```js
// tree-shakable ESM import
import { isNode, /* ... */ } from "@web3r/flowerkit/dom";
import { onSwipe, /* ... */ } from "@web3r/flowerkit/evt";

// ESM import of whole utils packs
import { domKit, evtKit, /* ... */ } from "@web3r/flowerkit";
```

## Features

- **Tree shaking**: appends only the necessary code in your bundle;
- **Friendly names**: functions that return objects begin with the "get" prefix and for boolean values — "is";
- **JSDoc**: each utility contains a detailed description and example of usage which are available in your IDE;
- **Lightweight**: the entire library weighs no more than 30kb;
- **Error catching**: immediate errors when passing invalid arguments;
- **SSR friendly**: fallbacks for DOM `window` and `document` objects;
- **TypeScript friendly**: types included for all functions.

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

## Top of frequent tasks

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

### Get length of an object keys

```js
import { getObjLength } from "@web3r/flowerkit/obj";

const obj = {
  key1: "value1",
  key2: "value2"
};
const objLength = getObjLength(obj);
console.log(objLength); // => 2
```

### Deep clone of an object

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

### Set a CSS variable from JavaScript

```js
import { setCSSVar } from "@web3r/flowerkit/css";

const block = document.getElementById("myBlock");
setCSSVar(block, "myVar", 10);
// <div id="myBlock" style="--myVar: 10"></div>
```

## API

The library will allow you to quickly solve many other problems. See [API docs & examples](https://github.com/yuri-moskvin/flowerkit/blob/main/API.md).
