# ⚙️ Functions utils pack API

___

## Usage

```ts
// import functions
import { getAbortSignal, getAsyncPool, getCurryFn, getDebouncedFn, getMemoizedFn, getLatestAsyncFn, getRetriedFn, getThrottledFn, isFnAsync, isFnClass, once, wait } from "@web3r/flowerkit/fn";

// import types
import type { TAbortSignalControls, TGetAbortSignalOptions, TGetAbortSignalArgs, TGetAbortSignalReturn, TGetAsyncPoolOptions, TGetAsyncPoolResult, TGetAsyncPoolArgs, TGetAsyncPoolReturn, TGetCurryFnArgs, TGetCurryFnReturn, TDebouncedFn, TGetDebouncedFnArgs, TGetDebouncedFnReturn, TMemoizedFn, TGetMemoizedFnArgs, TGetMemoizedFnReturn, TGetLatestAsyncFnOptions, TLatestAsyncFn, TLatestAsyncSource, TGetLatestAsyncFnArgs, TGetLatestAsyncFnReturn, TRetryOptions, TGetRetriedFnArgs, TGetRetriedFnReturn, TThrottledFn, TGetThrottledFnArgs, TGetThrottledFnReturn, TIsFnAsyncArgs, TIsFnAsyncReturn, TIsFnClassArgs, TIsFnClassReturn, TOnceArgs, TOnceReturn, TWaitOptions, TWaitArgs, TWaitReturn } from "@web3r/flowerkit/fn";
```

___

## Functions

- [getAbortSignal](#getabortsignal)
- [getAsyncPool](#getasyncpool)
- [getCurryFn](#getcurryfn)
- [getDebouncedFn](#getdebouncedfn)
- [getMemoizedFn](#getmemoizedfn)
- [getLatestAsyncFn](#getlatestasyncfn)
- [getRetriedFn](#getretriedfn)
- [getThrottledFn](#getthrottledfn)
- [isFnAsync](#isfnasync)
- [isFnClass](#isfnclass)
- [once](#once)
- [wait](#wait)

### getAbortSignal

Creates a disposable abort signal that can combine external signals with a timeout.
The returned controller can also abort the operation manually.

| Function | Type |
| ---------- | ---------- |
| `getAbortSignal` | `(options?: TGetAbortSignalOptions) => TAbortSignalControls` |

Parameters:

* `options`: External signals and optional timeout


Returns:

Abort signal and lifecycle controls

Examples:

```ts
const request = getAbortSignal({ timeout: 5_000 });
await fetch("/api/products", { signal: request.signal }).finally(request.dispose);
```

```ts
// Combine component cleanup with a request timeout
const component = new AbortController();
const request = getAbortSignal({ signals: [ component.signal ], timeout: 2_000 });
component.abort();
```


### getAsyncPool

Maps an array asynchronously with a concurrency limit while preserving order.
Supports cancellation and an all-settled result mode.

| Function | Type |
| ---------- | ---------- |
| `getAsyncPool` | `<T, U, TSettle extends boolean = false>(arr: T[], callback: (value: T, index: number, array: T[], signal: AbortSignal) => U or Promise<U>, concurrencyOrOptions?: number or TGetAsyncPoolOptions<TSettle>) => Promise<...>` |

Parameters:

* `arr`: Source array
* `callback`: Mapper
* `concurrencyOrOptions`: Concurrency or pool options


Returns:

Ordered results

Examples:

```ts
await getAsyncPool(ids, (id) => loadItem(id), 3);
```

```ts
// Upload files with cancellation and collect every outcome
const controller = new AbortController();
const uploadedFiles = await getAsyncPool(files, uploadFile, {
  concurrency: 2,
  settle: true,
  signal: controller.signal,
});
```


### getCurryFn

Curries a function, transforming it into a sequence of unary functions.
Collects arguments one by one until `arity` is reached, then invokes `fn`.

| Function | Type |
| ---------- | ---------- |
| `getCurryFn` | `<T extends (...args: any[]) => any>(fn: T, arity?: number) => ((arg: Parameters<T>[0]) => any) and ((...args: Parameters<T>) => ReturnType<T>)` |

Parameters:

* `fn`: Function to curry
* `arity`: Number of arguments to collect before invoking


Examples:

```ts
function sum(a: number, b: number) { return a + b; }
const curried = getCurryFn(sum);
curried(1)(2); // 3
```

```ts
// Build reusable field validators from a curried range check
const isInRange = getCurryFn((min: number, max: number, value: number) => {
  return value >= min && value <= max;
});
const isValidPercentage = isInRange(0)(100);
```


### getDebouncedFn

Returns a debounced version of a function that delays invoking `cb`
until after `wait` ms have elapsed since the last call.
Optionally invokes on the leading edge when `isImmediate` is true.

| Function | Type |
| ---------- | ---------- |
| `getDebouncedFn` | `<T extends (...args: any[]) => any>(cb: T, wait?: number, isImmediate?: boolean) => TDebouncedFn<T>` |

Parameters:

* `cb`: Function to debounce
* `wait`: Delay in milliseconds
* `isImmediate`: If `true`, invoke on the leading edge


Returns:

Debounced function with cancel, flush, and pending controls

Examples:

```ts
const fn = getDebouncedFn((x: number) => console.log(x), 1000);
fn(1);
```

```ts
// Debounce autocomplete requests and cancel the pending call on unmount
const search = getDebouncedFn((query: string) => loadSuggestions(query), 300);
input.addEventListener("input", () => search(input.value));
search.cancel();
```


### getMemoizedFn

Memoizes a function by receiver and argument identity and exposes a cache reset method.

| Function | Type |
| ---------- | ---------- |
| `getMemoizedFn` | `<T extends (...args: any[]) => any>(fn: T) => TMemoizedFn<T>` |

Parameters:

* `fn`: Source function


Returns:

Memoized function

Examples:

```ts
const doubled = getMemoizedFn((value: number) => value * 2);
doubled(2); // 4
doubled.clear();
```

```ts
// Cache an expensive product filter until its argument identities change
const filterProducts = getMemoizedFn((items, filters) => {
  return items.filter((item) => filters.includes(item.category));
});
```


### getLatestAsyncFn

Wraps an async operation so a new call aborts the previous pending call.
The source function receives a per-call signal as its first argument.

| Function | Type |
| ---------- | ---------- |
| `getLatestAsyncFn` | `<TArgs extends any[], TResult>(fn: TLatestAsyncSource<TArgs, TResult>, options?: TGetLatestAsyncFnOptions) => TLatestAsyncFn<TArgs, TResult>` |

Parameters:

* `fn`: Async source function
* `options`: Shared lifecycle signal


Returns:

Latest-only async function with cancel controls

Examples:

```ts
const search = getLatestAsyncFn(async (signal, query: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
  return response.json();
});
await search("roses");
```

```ts
// Abort the active request when a component is disposed
const lifecycle = new AbortController();
const load = getLatestAsyncFn(loadProduct, { signal: lifecycle.signal });
lifecycle.abort();
```


### getRetriedFn

Returns an async function that retries rejected calls with exponential backoff.

| Function | Type |
| ---------- | ---------- |
| `getRetriedFn` | `<T extends (...args: any[]) => any>(fn: T, options?: TRetryOptions) => (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>` |

Parameters:

* `fn`: Source function
* `options`: Retry policy


Returns:

Retrying function

Examples:

```ts
const loadWithRetry = getRetriedFn(loadData, { maxRetries: 2, baseDelay: 100 });
```

```ts
// Retry a transient API request with exponential backoff and cancellation
const controller = new AbortController();
const fetchWithRetry = getRetriedFn(fetchProducts, {
  maxRetries: 3,
  baseDelay: 250,
  signal: controller.signal,
});
```


### getThrottledFn

Gets a throttled function with specific delay

| Function | Type |
| ---------- | ---------- |
| `getThrottledFn` | `<T extends (...args: any[]) => any>(func: T, delay?: number) => TThrottledFn<T>` |

Parameters:

* `func`: function
* `delay`: delay in ms, 1000 by default


Returns:

Throttled function with cancel, flush, and pending controls

Examples:

```ts
// How to implement function throttling?
const getDataFromAPI = () => Promise.resolve([]);
const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
getThrottledDataFromAPI(); // => []
```

```ts
// Throttle scroll progress updates to avoid excessive layout work
const updateProgress = getThrottledFn(() => renderScrollProgress(), 100);
window.addEventListener("scroll", updateProgress);
updateProgress.cancel();
```


### isFnAsync

Checks if a function is async

| Function | Type |
| ---------- | ---------- |
| `isFnAsync` | `(fn: unknown) => boolean` |

Parameters:

* `fn`: source function


Examples:

```ts
// How to check if function is async?
const fn = async () => {};
const isAsync = isFnAsync(fn);
console.log(isAsync); // => true
```

```ts
// Detect whether a route loader was declared as an async function
const shouldShowPendingState = isFnAsync(route.load);
```


### isFnClass

Checks if a function is a class or instance of class

| Function | Type |
| ---------- | ---------- |
| `isFnClass` | `(fn: unknown) => boolean` |

Parameters:

* `fn`: source function


Examples:

```ts
// How to check if a function is ES6 Class?
class UserService {}
const isClass = isFnClass(UserService);
console.log(isClass); // => true
```

```ts
// Distinguish a class constructor from a factory function in a plugin registry
const plugin = isFnClass(PluginConstructor)
  ? new PluginConstructor()
  : PluginConstructor();
```


### once

Returns a function that invokes the source function once and reuses its result.

| Function | Type |
| ---------- | ---------- |
| `once` | `<T extends (...args: any[]) => any>(fn: T) => (...args: Parameters<T>) => ReturnType<T>` |

Parameters:

* `fn`: Source function


Returns:

One-time function

Examples:

```ts
const initialize = once(() => ({ ready: true }));
initialize() === initialize(); // true
```

```ts
// Initialize an analytics SDK only once across multiple components
const initializeAnalytics = once(() => analytics.init(config));
initializeAnalytics();
```


### wait

Gets a `Promise` that resolves after specific time

| Function | Type |
| ---------- | ---------- |
| `wait` | `(ms?: number, options?: TWaitOptions) => Promise<void>` |

Parameters:

* `ms`: delay in ms
* `options`: Optional cancellation signal


Examples:

```ts
// How to sleep/delay in JS?
wait(3000).finally(() => {
  console.log("Runs after 3 sec!");
})
```

```ts
// Delay the next step in an async animation sequence
await wait(200);
element.classList.add("is-visible");
```

```ts
// Cancel a pending delay during component cleanup
const lifecycle = new AbortController();
await wait(1_000, { signal: lifecycle.signal });
lifecycle.abort();
```

## Types

- [TAbortSignalControls](#tabortsignalcontrols)
- [TGetAbortSignalOptions](#tgetabortsignaloptions)
- [TGetAbortSignalArgs](#tgetabortsignalargs)
- [TGetAbortSignalReturn](#tgetabortsignalreturn)
- [TGetAsyncPoolOptions](#tgetasyncpooloptions)
- [TGetAsyncPoolResult](#tgetasyncpoolresult)
- [TGetAsyncPoolArgs](#tgetasyncpoolargs)
- [TGetAsyncPoolReturn](#tgetasyncpoolreturn)
- [TGetCurryFnArgs](#tgetcurryfnargs)
- [TGetCurryFnReturn](#tgetcurryfnreturn)
- [TDebouncedFn](#tdebouncedfn)
- [TGetDebouncedFnArgs](#tgetdebouncedfnargs)
- [TGetDebouncedFnReturn](#tgetdebouncedfnreturn)
- [TMemoizedFn](#tmemoizedfn)
- [TGetMemoizedFnArgs](#tgetmemoizedfnargs)
- [TGetMemoizedFnReturn](#tgetmemoizedfnreturn)
- [TGetLatestAsyncFnOptions](#tgetlatestasyncfnoptions)
- [TLatestAsyncFn](#tlatestasyncfn)
- [TLatestAsyncSource](#tlatestasyncsource)
- [TGetLatestAsyncFnArgs](#tgetlatestasyncfnargs)
- [TGetLatestAsyncFnReturn](#tgetlatestasyncfnreturn)
- [TRetryOptions](#tretryoptions)
- [TGetRetriedFnArgs](#tgetretriedfnargs)
- [TGetRetriedFnReturn](#tgetretriedfnreturn)
- [TThrottledFn](#tthrottledfn)
- [TGetThrottledFnArgs](#tgetthrottledfnargs)
- [TGetThrottledFnReturn](#tgetthrottledfnreturn)
- [TIsFnAsyncArgs](#tisfnasyncargs)
- [TIsFnAsyncReturn](#tisfnasyncreturn)
- [TIsFnClassArgs](#tisfnclassargs)
- [TIsFnClassReturn](#tisfnclassreturn)
- [TOnceArgs](#tonceargs)
- [TOnceReturn](#toncereturn)
- [TWaitOptions](#twaitoptions)
- [TWaitArgs](#twaitargs)
- [TWaitReturn](#twaitreturn)

### TAbortSignalControls

| Type | Type |
| ---------- | ---------- |
| `TAbortSignalControls` | `{ abort: (reason?: unknown) => void; dispose: () => void; signal: AbortSignal; }` |

### TGetAbortSignalOptions

| Type | Type |
| ---------- | ---------- |
| `TGetAbortSignalOptions` | `{ signals?: readonly (AbortSignal or null or undefined)[]; timeout?: number; }` |

### TGetAbortSignalArgs

| Type | Type |
| ---------- | ---------- |
| `TGetAbortSignalArgs` | `Parameters<typeof getAbortSignal>` |

### TGetAbortSignalReturn

| Type | Type |
| ---------- | ---------- |
| `TGetAbortSignalReturn` | `ReturnType<typeof getAbortSignal>` |

### TGetAsyncPoolOptions

| Type | Type |
| ---------- | ---------- |
| `TGetAsyncPoolOptions` | `{ concurrency?: number; settle?: TSettle; signal?: AbortSignal or null; }` |

### TGetAsyncPoolResult

| Type | Type |
| ---------- | ---------- |
| `TGetAsyncPoolResult` | `TSettle extends true ? PromiseSettledResult<T>[] : T[]` |

### TGetAsyncPoolArgs

| Type | Type |
| ---------- | ---------- |
| `TGetAsyncPoolArgs` | `Parameters<typeof getAsyncPool>` |

### TGetAsyncPoolReturn

| Type | Type |
| ---------- | ---------- |
| `TGetAsyncPoolReturn` | `ReturnType<typeof getAsyncPool>` |

### TGetCurryFnArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCurryFnArgs` | `Parameters<typeof getCurryFn>` |

### TGetCurryFnReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCurryFnReturn` | `ReturnType<typeof getCurryFn>` |

### TDebouncedFn

| Type | Type |
| ---------- | ---------- |
| `TDebouncedFn` | `(( ...args: Parameters<T> ) => ReturnType<T> or undefined) and { cancel: () => void; flush: () => ReturnType<T> or undefined; pending: () => boolean; }` |

### TGetDebouncedFnArgs

| Type | Type |
| ---------- | ---------- |
| `TGetDebouncedFnArgs` | `Parameters<typeof getDebouncedFn>` |

### TGetDebouncedFnReturn

| Type | Type |
| ---------- | ---------- |
| `TGetDebouncedFnReturn` | `ReturnType<typeof getDebouncedFn>` |

### TMemoizedFn

| Type | Type |
| ---------- | ---------- |
| `TMemoizedFn` | `(( ...args: Parameters<T> ) => ReturnType<T>) and { clear: () => void; }` |

### TGetMemoizedFnArgs

| Type | Type |
| ---------- | ---------- |
| `TGetMemoizedFnArgs` | `Parameters<typeof getMemoizedFn>` |

### TGetMemoizedFnReturn

| Type | Type |
| ---------- | ---------- |
| `TGetMemoizedFnReturn` | `ReturnType<typeof getMemoizedFn>` |

### TGetLatestAsyncFnOptions

| Type | Type |
| ---------- | ---------- |
| `TGetLatestAsyncFnOptions` | `{ signal?: AbortSignal or null; }` |

### TLatestAsyncFn

| Type | Type |
| ---------- | ---------- |
| `TLatestAsyncFn` | `(( ...args: TArgs ) => Promise<Awaited<TResult>>) and { cancel: (reason?: unknown) => void; pending: () => boolean; }` |

### TLatestAsyncSource

| Type | Type |
| ---------- | ---------- |
| `TLatestAsyncSource` | `( signal: AbortSignal, ...args: TArgs ) => TResult` |

### TGetLatestAsyncFnArgs

| Type | Type |
| ---------- | ---------- |
| `TGetLatestAsyncFnArgs` | `Parameters<typeof getLatestAsyncFn>` |

### TGetLatestAsyncFnReturn

| Type | Type |
| ---------- | ---------- |
| `TGetLatestAsyncFnReturn` | `ReturnType<typeof getLatestAsyncFn>` |

### TRetryOptions

| Type | Type |
| ---------- | ---------- |
| `TRetryOptions` | `{ backoff?: number; baseDelay?: number; maxDelay?: number; maxRetries?: number; onRetry?: (error: unknown, retry: number) => void; shouldRetry?: (error: unknown, retry: number) => boolean or Promise<boolean>; signal?: AbortSignal or null; }` |

### TGetRetriedFnArgs

| Type | Type |
| ---------- | ---------- |
| `TGetRetriedFnArgs` | `Parameters<typeof getRetriedFn>` |

### TGetRetriedFnReturn

| Type | Type |
| ---------- | ---------- |
| `TGetRetriedFnReturn` | `ReturnType<typeof getRetriedFn>` |

### TThrottledFn

| Type | Type |
| ---------- | ---------- |
| `TThrottledFn` | `(( ...args: Parameters<T> ) => ReturnType<T> or undefined) and { cancel: () => void; flush: () => ReturnType<T> or undefined; pending: () => boolean; }` |

### TGetThrottledFnArgs

| Type | Type |
| ---------- | ---------- |
| `TGetThrottledFnArgs` | `Parameters<typeof getThrottledFn>` |

### TGetThrottledFnReturn

| Type | Type |
| ---------- | ---------- |
| `TGetThrottledFnReturn` | `ReturnType<typeof getThrottledFn>` |

### TIsFnAsyncArgs

| Type | Type |
| ---------- | ---------- |
| `TIsFnAsyncArgs` | `Parameters<typeof isFnAsync>` |

### TIsFnAsyncReturn

| Type | Type |
| ---------- | ---------- |
| `TIsFnAsyncReturn` | `ReturnType<typeof isFnAsync>` |

### TIsFnClassArgs

| Type | Type |
| ---------- | ---------- |
| `TIsFnClassArgs` | `Parameters<typeof isFnClass>` |

### TIsFnClassReturn

| Type | Type |
| ---------- | ---------- |
| `TIsFnClassReturn` | `ReturnType<typeof isFnClass>` |

### TOnceArgs

| Type | Type |
| ---------- | ---------- |
| `TOnceArgs` | `Parameters<typeof once>` |

### TOnceReturn

| Type | Type |
| ---------- | ---------- |
| `TOnceReturn` | `ReturnType<typeof once>` |

### TWaitOptions

| Type | Type |
| ---------- | ---------- |
| `TWaitOptions` | `{ signal?: AbortSignal or null; }` |

### TWaitArgs

| Type | Type |
| ---------- | ---------- |
| `TWaitArgs` | `Parameters<typeof wait>` |

### TWaitReturn

| Type | Type |
| ---------- | ---------- |
| `TWaitReturn` | `ReturnType<typeof wait>` |
