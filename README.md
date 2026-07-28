# FlowerKit 🌸 Tree-shakable JavaScript and TypeScript Utility Library

More than 70 frontend-focused utilities for JavaScript and TypeScript: DOM, events, arrays, objects, strings, date, JSON, and network helpers.

[![npm](https://img.shields.io/npm/v/@web3r/flowerkit)](https://www.npmjs.com/package/@web3r/flowerkit)
[![npm downloads](https://img.shields.io/npm/dw/@web3r/flowerkit)](https://www.npmjs.com/package/@web3r/flowerkit)
[![CI](https://github.com/yuri-moskvin/flowerkit/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/yuri-moskvin/flowerkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/yuri-moskvin/flowerkit/blob/main/LICENSE)

## Install

```bash
npm i @web3r/flowerkit
# or
pnpm add @web3r/flowerkit
# or
yarn add @web3r/flowerkit
```

## Quick Start

```ts
import { isNode } from "@web3r/flowerkit/dom";
import { getDebouncedFn } from "@web3r/flowerkit/fn";
import { getMergedObj } from "@web3r/flowerkit/obj";

const debouncedLog = getDebouncedFn((value: string) => console.log(value), 300);
debouncedLog("hello");

const result = getMergedObj({ first: [ "foo" ] }, { first: [ "bar" ], ok: true });
console.log(result); // => { first: [ "foo", "bar" ], ok: true }

console.log(isNode(document.body)); // => true
```

## Usage

```ts
// tree-shakable ESM imports from subpaths
import { isNode } from "@web3r/flowerkit/dom";
import { onSwipe } from "@web3r/flowerkit/evt";

// import whole kits
import { domKit, evtKit } from "@web3r/flowerkit";

// CJS
const domKit = require("@web3r/flowerkit/dom");

// types
import type { TGetCurryFnArgs, TGetCurryFnReturn } from "@web3r/flowerkit/fn";
```

## Features

- Tree-shakable subpath imports for smaller bundles
- TypeScript types for all exported functions
- Works in browser and SSR environments
- ESM and CJS support
- JSDoc on utilities with usage examples
- Input validation with clear runtime errors

## Structure

- `@web3r/flowerkit/arr` - arrays and iterable helpers
- `@web3r/flowerkit/css` - CSS utilities from JavaScript
- `@web3r/flowerkit/date` - Date helpers
- `@web3r/flowerkit/dom` - DOM and Node helpers
- `@web3r/flowerkit/evt` - event helpers
- `@web3r/flowerkit/fn` - function helpers (curry, debounce, throttle)
- `@web3r/flowerkit/json` - JSON helpers
- `@web3r/flowerkit/net` - network helpers
- `@web3r/flowerkit/obj` - object helpers
- `@web3r/flowerkit/str` - string helpers
- `@web3r/flowerkit/user` - browser/user environment helpers

## Examples

### Capitalize the first letter of a string

```js
import { getStrWithCapitalized } from "@web3r/flowerkit/str";

const str = "hello world";
const upperStr = getStrWithCapitalized(str);
console.log(upperStr); // => "Hello world"
```

### Curry a function

```js
import { getCurryFn } from "@web3r/flowerkit/fn";

function getSum(a, b) {
  return a + b;
}

const getCurriedSum = getCurryFn(getSum);
console.log(getCurriedSum(1)(2)); // => 3
```

### Debounce a function

```js
import { getDebouncedFn } from "@web3r/flowerkit/fn";

const fn = getDebouncedFn(alert, 1000);
fn(1);
fn(2);

// only the last call within 1000ms is executed
setTimeout(() => fn(3), 100);
setTimeout(() => fn(4), 1100);
```

### Throttle a function

```js
import { getThrottledFn } from "@web3r/flowerkit/fn";

const fn = getThrottledFn(alert, 5000);
fn(1); // calls immediately
fn(2); // ignored
setTimeout(() => fn(3), 5000); // calls
```

### Get the number of keys in an object

```js
import { getObjLength } from "@web3r/flowerkit/obj";

const obj = { key1: "value1", key2: "value2" };
console.log(getObjLength(obj)); // => 2
```

### Compare objects by keys and values

```js
import { isObjEqual } from "@web3r/flowerkit/obj";

const a = { foo: { bar: 1 } };
const b = { foo: { bar: 1 } };
console.log(isObjEqual(a, b)); // => true
```

### Deep clone an object

```js
import { getCopyOfObj } from "@web3r/flowerkit/obj";

const originalObject = { value: 1 };
const copy = getCopyOfObj(originalObject);

copy.value = 2;
console.log(originalObject.value === copy.value); // => false
```

### Merge two objects

```js
import { getMergedObj } from "@web3r/flowerkit/obj";

const targetObj = { first: [ "foo" ] };
const sourceObj = { first: [ "moo" ], boo: 12 };
console.log(getMergedObj(targetObj, sourceObj)); // => { first: [ "foo", "moo" ], boo: 12 }
```

### Generate a random ID

```js
import { getId } from "@web3r/flowerkit/str";

const uniqueId = getId(100);
console.log(uniqueId.length); // => 100
```

### Check if a value is iterable

```js
import { isIterable } from "@web3r/flowerkit/arr";

const myDivs = document.querySelectorAll("div");
console.log(isIterable(myDivs)); // => true
```

### Set a CSS variable from JavaScript

```js
import { setCSSVar } from "@web3r/flowerkit/css";

const block = document.getElementById("myBlock");
setCSSVar(block, "myVar", 10);
// <div id="myBlock" style="--myVar: 10"></div>
```

### Detect an invalid Date instance

```js
import { isValidDate } from "@web3r/flowerkit/date";

const wrongDate = new Date("invalid_date");
console.log(isValidDate(wrongDate)); // => false

const validDate = new Date(0);
console.log(isValidDate(validDate)); // => true
```

## API

See full [API docs and examples](https://github.com/yuri-moskvin/flowerkit/blob/main/docs/index.md).
