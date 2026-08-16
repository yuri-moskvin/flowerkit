# FlowerKit 🌸 TypeScript Utilities for Browser APIs, DOM Events, and SSR

100+ typed, tree-shakable utilities for frontend applications. FlowerKit combines DOM and browser helpers with the array, object, string, date, function, and network utilities that application code uses every day.

[![npm](https://img.shields.io/npm/v/@web3r/flowerkit)](https://www.npmjs.com/package/@web3r/flowerkit)
[![npm downloads](https://img.shields.io/npm/dw/@web3r/flowerkit)](https://www.npmjs.com/package/@web3r/flowerkit)
[![CI](https://github.com/yuri-moskvin/flowerkit/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/yuri-moskvin/flowerkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/yuri-moskvin/flowerkit/blob/main/LICENSE)

## Why FlowerKit?

- Browser-focused helpers for DOM events, observers, storage, cookies, network requests, and CSS
- SSR-safe fallbacks for utilities that normally depend on `window` or `document`
- TypeScript types for every public function, including exported argument and return types
- Tree-shakable ESM subpath imports, CommonJS support, and `sideEffects: false`
- Cancelable async workflows, debounce and throttle controls, typed request errors, and explicit cleanup
- Runtime input validation and 100+ colocated test suites

## Install

```bash
npm i @web3r/flowerkit
```

Also works with `pnpm add @web3r/flowerkit` and `yarn add @web3r/flowerkit`.

## Quick start

### Handle clicks outside an element

```ts
import { onClickOutside } from "@web3r/flowerkit/evt";

const menu = document.querySelector("[data-menu]");

if (menu) {
  const outside = onClickOutside(menu, () => menu.removeAttribute("open"));

  // Call this from your framework's unmount hook.
  const disposeMenu = () => outside.removeListener();
}
```

### Debounce with lifecycle controls

```ts
import { getDebouncedFn } from "@web3r/flowerkit/fn";

const search = getDebouncedFn((query: string) => {
  console.log(query);
}, 300);

search("flower");
search("flowerkit");

search.pending(); // true
search.flush();   // run the pending call immediately
search.cancel();  // or discard a pending call during cleanup
```

### Cancel stale async work

```ts
import { getLatestAsyncFn } from "@web3r/flowerkit/fn";

const search = getLatestAsyncFn(async (signal, query: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
  return response.json();
});

search("flower");
await search("flowerkit"); // aborts the previous pending search
```

### Use typed, SSR-safe storage

```ts
import { createStorage } from "@web3r/flowerkit/user";

const settings = createStorage<{
  locale: "en" | "ru";
  theme: "dark" | "light";
}>({ namespace: "settings" });

settings.set("theme", "dark");
const theme = settings.get("theme", "light");
```

### Handle typed request failures

```ts
import { getFromServer } from "@web3r/flowerkit/net";
import type { TGetFromServerError } from "@web3r/flowerkit/net";

try {
  const user = await getFromServer<{ id: number; name: string }>({
    url: "/api/user/1",
  });
  console.log(user.name);
} catch (error) {
  if (error instanceof Error && error.name === "GetFromServerError") {
    const requestError = error as TGetFromServerError;
    console.error(requestError.kind, requestError.status);
  }
}
```

## Imports

Prefer kit subpaths so bundlers can include only the utilities that are used:

```ts
// ESM
import { getUniqueBy } from "@web3r/flowerkit/arr";
import { onIntersection, onSwipe } from "@web3r/flowerkit/evt";

// Namespace kits
import { arrKit, evtKit } from "@web3r/flowerkit";

// CommonJS
const { getUniqueBy } = require("@web3r/flowerkit/arr");

// Public types
import type { TOnSwipeArgs, TOnSwipeReturn } from "@web3r/flowerkit/evt";
```

## Compatibility

| Environment | Support |
| --- | --- |
| Node.js | 22 and 24, verified in CI |
| Browser output | Compiled against the package's `browserslist` configuration |
| Server-side rendering | SSR-safe entry points verified without browser globals |
| Modules | ESM and CommonJS |
| TypeScript | Bundled declarations for the root package and every kit subpath |

FlowerKit is framework-independent and can be used with React, Vue, Svelte, other frameworks, or vanilla TypeScript.

## Bundle-size checks

Representative imports are bundled, minified, compressed with gzip, and checked against regression budgets in CI:

| Import | Minified | Minified + gzip | CI limit (gzip) |
| --- | ---: | ---: | ---: |
| `getDebouncedFn` | 0.71 kB | 0.37 kB | 0.49 kB |
| `onClickOutside` | 1.78 kB | 0.84 kB | 1.07 kB |
| `createStorage` | 1.44 kB | 0.64 kB | 0.83 kB |
| `getFromServer` | 6.68 kB | 2.70 kB | 3.42 kB |

Run `npm run size` to print the current measured values. Run `npm run verify:size` to enforce the budgets.

## Kits

| Import path | Purpose |
| --- | --- |
| `@web3r/flowerkit/arr` | Arrays, stable sorting, iterables, grouping, sets, and async mapping |
| `@web3r/flowerkit/css` | CSS values, variables, selectors, media queries, and transforms |
| `@web3r/flowerkit/date` | Date validation, arithmetic, formatting, and differences |
| `@web3r/flowerkit/dom` | DOM nodes, scroll containers, HTML parsing, siblings, wrappers, and cleanup |
| `@web3r/flowerkit/evt` | DOM lifecycle events, outside clicks, swipe, resize, media, and intersection observers |
| `@web3r/flowerkit/fn` | Async cancellation and pools, curry, debounce, throttle, memoization, retry, and timing |
| `@web3r/flowerkit/json` | JSON parsing and validation |
| `@web3r/flowerkit/net` | Typed fetch, query parameters, FormData, and external scripts |
| `@web3r/flowerkit/num` | Clamping, formatting, ranges, rounding, minimum, and maximum |
| `@web3r/flowerkit/obj` | Deep clone, equality, merge, nested paths, fallback, pick, omit, and cleanup |
| `@web3r/flowerkit/str` | Case conversion, slugging, escaping, truncation, IDs, and formatting |
| `@web3r/flowerkit/user` | SSR-safe storage, clipboard, cookies, devices, and viewport helpers |

See the [complete API reference](./docs/index.md) and the generated reference for each kit.

## Quality and package verification

Current coverage from the built-in Node.js coverage runner:

| Metric | Current | Enforced minimum |
| --- | ---: | ---: |
| Lines | 95.47% | 90% |
| Branches | 87.05% | 80% |
| Functions | 95.99% | 90% |

The current npm artifact is approximately 275 kB compressed and 1,039 kB unpacked. CI limits the artifact to 280,000 compressed bytes, 1,050,000 unpacked bytes, and 655 files so packaging regressions require an explicit decision.

Every pull request is checked with:

- ESLint and strict TypeScript type checking
- the Node.js test runner in Node.js 22 and 24
- browser-global-free SSR import tests
- ESM, CommonJS, declaration, and subpath smoke tests against the actual npm tarball
- production dependency audit
- representative bundle-size regression budgets

The package tarball is restricted to runtime output and project documentation. Run `npm run verify:package` to install the packed artifact into a temporary consumer project and verify all public entry points.

## Contributing

Bug reports, use cases, documentation improvements, and focused utility proposals are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. Security issues should follow [SECURITY.md](./SECURITY.md).

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:package
```

## License

[MIT](./LICENSE) © Yuri Moskvin
