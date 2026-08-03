# Changelog

## 1.1.8
- Repositioned the package around typed browser, DOM event, and SSR-safe utilities.
- Expanded npm metadata with task-oriented keywords, homepage and issue tracker links, and bundled project documentation.
- Lowered the consumer Node.js requirement to version 22 and added Node.js 22/24 CI coverage.
- Added explicit `import` package conditions, fixed `require` resolution to use CJS artifacts, and strengthened package smoke tests to verify resolved module formats.
- Removed duplicated runtime packages from `peerDependencies`; they remain regular dependencies.
- Kept `jsdom` aligned with the supported `global-jsdom` peer range for reproducible installs.
- Kept TypeScript 6 aligned with the supported `typescript-eslint` API and configured Rollup for declaration-only TypeScript emit.
- Added array utilities: `getChunkedArr`, `getGroupedBy`, and `getUniqueBy`.
- Added date utilities: `getDateAdded`, `getDateDiff`, and `getDateFormatted`.
- Added event utilities: `on`, `onClickOutside`, `onIntersection`, `onMediaQueryChange`, and `onResizeObserved`.
- Added function utilities: `getAsyncPool`, `getMemoizedFn`, `getRetriedFn`, and `once`.
- Added network utilities: `getQueryParam` and `getQueryParams`.
- Added number utilities: `getClampedNum`, `getCurrencyFormatted`, and `getNumberFormatted`.
- Added object utilities: `getObjWithoutUndefined`, `getObjWithOmittedProps`, and `getObjWithPickedProps`.
- Added string utilities: `getStrTruncated`, `getStrWithCamelCase`, `getStrWithKebabCase`, `getStrWithNormalizedSpaces`, `getStrWithSlug`, and `getStrWithSnakeCase`.
- Added browser utilities: `copyToClipboard`, `createStorage`, and `getStorage`.
- Improved `getDebouncedFn` and `getThrottledFn` with typed `cancel`, `flush`, and `pending` controls while preserving the callback context and latest result.
- `getFromServer/index.ts`: Normalized request lifecycle rejections into the exported `TGetFromServerError` and `TGetFromServerErrorKind` types with discriminated error kinds, request context, and a typed error-handling example; preserved HTTP status validation when using a custom response parser.
- Reworked `README.md` with task-focused examples, compatibility guidance, and verifiable project metrics.
- Added `CONTRIBUTING.md` and `SECURITY.md` and included them in the published package.
- Expanded JSDoc with task-focused usage examples for every public utility to support future per-utility documentation pages.
- Removed documentation comments from runtime bundles while preserving them in declarations and generated docs.
- Added `markdownlint`-backed generated Markdown validation for public API coverage, headings, links, code fences, and TypeScript example syntax.
- Added representative bundle-size budgets, package-size budgets, package smoke tests in the CI matrix, and enforced coverage thresholds.
- Updated `AGENTS.md` with the current project architecture, workflows, conventions, and definition of done.
- `getId/index.ts`: Fixed generated IDs containing an extra brace or being shorter than the requested length.
- `getRandomIntFromInterval/index.ts`: Fixed decimal interval normalization and rejected non-finite or integer-less ranges.
- `getRounded/index.ts`: Rejected non-finite values and fractional decimal-place counts instead of returning `NaN`.
- `isJSON/index.ts`: Recognized all valid JSON values, including primitives and `null`.
- `getStrDeclination/index.ts`: Rejected fractional numbers instead of returning `undefined`.
- `getStrWithThousandSeparator/index.ts`: Preserved decimal and exponent parts while formatting the integer part.
- `getCopyOfObj/index.ts`: Added deep cloning for dates, URLs, URL search parameters, regular expressions, collections, binary views, symbols, and circular references.
- `getMergedObj/index.ts`: Preserved nested and root circular references while cloning and merging values.
- `getAllSamePropsFromObj/index.ts`: Replaced serialization-based traversal with circular-safe object traversal that supports values such as `BigInt`.
- `getObjWithFallbacks/index.ts`: Applied rules to missing keys and passed the configured type fallback to custom transformers.
- `isObjEmpty/index.ts`: Added support for empty objects without a prototype.
- `isObjEqual/index.ts`: Fixed order-independent comparison of sets containing objects and compared array buffers and binary views by type and contents.
- `getElWrapper/index.ts`: Added support for whitespace around wrapper markup and returned the root wrapper element.
- `getHTMLFromStr/index.ts`: Fixed parsing for supported XML and SVG document types and aligned top-level text and element nodes between browser and SSR parsing.
- `getCSSTransformValues/index.ts`: Returned numeric transform values and accepted matrices without spaces after commas.
- `onSwipe/index.ts`: Reset mouse gesture state after completion and handled cancel and leave events.
- `onWindowResize/index.ts`: Canceled pending debounced callbacks when removing the listener.
- `getExternalScript/index.ts`: Fixed the `crossorigin` option so it sets the native script attribute.
- `getQueryParams/index.ts`: Recognized query strings containing a single bare flag.
- `getUrlWithQueryParams/index.ts`: Preserved repeated query values from `FormData`.
- `getPureDate/index.ts`: Returned a new normalized date without mutating the source instance.
- `getDiff/index.ts`: Preserved duplicate values that exist only in one source array.
- `getMemoizedFn/index.ts`: Kept separate cache entries for different function receivers.
- `once/index.ts`: Cached and re-threw a first-call error without invoking the source function again.
- `isMediaQuery/index.ts`: Preserved complete media queries while wrapping bare media features.
- `copyToClipboard/index.ts`: Removed the temporary fallback textarea even when legacy clipboard access fails.
- `createStorage/index.ts`: Added a safe default namespace and prevented namespace clearing from deleting unrelated storage entries.
- `setCookie/index.ts`: Stopped mutating the supplied cookie options object.
- Added regression tests for the fixes above.
- Updated development dependencies and security overrides.

## 1.1.7
- Added GitHub Actions CI for linting, type-checking, tests, build verification, production dependency audit, and package smoke testing.
- Added CI and MIT license badges to `README.md`.
- Added `lint:check`, `lint:fix`, and `verify:package` scripts.
- Added SSR coverage for all package entry points and fixed SSR fallbacks in `isNode/index.ts` and `isMobileDevice/index.ts`.
- `net/getObjFromFormData/index.ts`: Reused the `obj/getObjFromFormData` implementation and added coverage for the network entry point.
- Updated development dependencies and security overrides.

## 1.1.6
- `getHTMLFromStr/index.ts`: Replaced static `node-html-parser` import with dynamic `await import()` to prevent it from being bundled in browser environments; function is now async and returns `Promise<NodeList>`.
- Updated dependencies.
- Updated some JSDoc params.

## 1.1.5
- `isObjEqual/index.ts`: Fixed deep comparison for `Map` and `Set` values.
- `getUrlWithQueryParams/index.ts`: Fixed validation for `null` params.
- `getUrlWithQueryParams/index.ts`: Switched query param updates to `URLSearchParams` for correct value encoding.
- Added regression tests for the fixes above.
- Updated `AGENTS.md`.
- Updated dependencies.

## 1.1.4
- Created `AGENTS.md` with repository-specific workflow instructions for coding agents.
- Updated dependencies.

## 1.1.3
- `getExternalScript/index.ts`: Added a new `integrity` prop.
- `getFromServer`: Added `data` support for `PUT` and `DELETE` methods, fixed timeout-based `fetch` abort, and removed the hardcoded `Content-Type: multipart/form-data` header.
- `isObjEqual/index.ts`:  Added a new utility.
- Updated `README.md`.
- Updated dependencies.

## 1.1.2
- Updated dependencies.
- `getElSiblings/index.ts`: Fixed export.
- Updated API docs.
- Migrated from `jest` to the Node test runner.
- Dropped `tsx`.
- Type declarations for `fn` and `dom` fixed.

## 1.1.1
- Updated dependencies.
- Added exported types.

## 1.1.0
- Sources moved to TypeScript.
- `README.md` updated.
- Added new API docs.
- Updated dependencies.
- Updated JSDoc.
- Added CommonJS (CJS) support.

## 1.0.11
- `getMergedObj/index.js`: Fixed handling of nested arrays.
- Updated dependencies.

## 1.0.10
- `getPureDate/index.js`: Added a new utility.
- `isValidDate/index.js`: Added a new utility.
- `isNonEmptyArr/index.js`: Added a new utility.
- `onWindowLoad/index.js`: Updated JSDoc.
- `onWindowResize/index.js`: Updated JSDoc.
- Updated development dependencies.

## 1.0.9
- `onWindowResize/index.js`: Now returns an object.
- `onSwipe/index.js`: Now returns an object.
- `onDOMReady/index.js`: Now returns an object.
- `onWindowLoad/index.js`: Now returns an object.
- Updated development dependencies.

## 1.0.8
- `isAdblock/index.js`: Added a new utility.
- Updated development dependencies.

## 1.0.7
- `getMergedObj/index.js`: Added options for arrays.
- Updated development dependencies.

## 1.0.6
- `getId/index.js`: Added a new utility.
- Updated `API.md`.
- Updated development dependencies.

## 1.0.5
- `deleteCookie/index.js`: Added a new utility.
- `getFromServer/index.js`: Added `arrayBuffer` response type.
- Updated `API.md`.
- Updated development dependencies.

## 1.0.3
- `getAsyncMap/index.js`: Removed unnecessary try/catch.
- Created `API.md`.

## 1.0.0
- Initial release.
