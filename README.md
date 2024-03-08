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

## API

[API docs & examples](https://github.com/yuri-moskvin/flowerkit/blob/main/API.md)
