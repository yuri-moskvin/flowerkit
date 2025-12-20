# ⚙️ Functions utils pack API
___
## Usage
```ts
import { getCurryFn, getDebouncedFn, getThrottledFn, isFnAsync, isFnClass, wait } from "@web3r/flowerkit/fn";
```
___
## Functions

- [getCurryFn](#getcurryfn)
- [getDebouncedFn](#getdebouncedfn)
- [getThrottledFn](#getthrottledfn)
- [isFnAsync](#isfnasync)
- [isFnClass](#isfnclass)
- [wait](#wait)

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


### getDebouncedFn

Returns a debounced version of a function that delays invoking `cb`
until after `wait` ms have elapsed since the last call.
Optionally invokes on the leading edge when `isImmediate` is true.

| Function | Type |
| ---------- | ---------- |
| `getDebouncedFn` | `<T extends (...args: any[]) => any>(cb: T, wait?: number, isImmediate?: boolean) => (...args: Parameters<T>) => void` |

Parameters:

* `cb`: Function to debounce
* `wait`: Delay in milliseconds
* `isImmediate`: If `true`, invoke on the leading edge


Examples:

```ts
const fn = getDebouncedFn((x: number) => console.log(x), 1000);
fn(1);
```


### getThrottledFn

Gets a throttled function with specific delay

| Function | Type |
| ---------- | ---------- |
| `getThrottledFn` | `<T extends (...args: any[]) => any>(func: T, delay?: number) => (...args: Parameters<T>) => void` |

Parameters:

* `func`: function
* `delay`: delay in ms, 1000 by default


Examples:

```ts
// How to implement function throttling?
const getDataFromAPI = () => Promise.resolve([]);
const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
getThrottledDataFromAPI(); // => []
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
const fn = new Class();
const isClass = isFnClass(fn);
console.log(isClass); // => true
```


### wait

Gets a `Promise` that resolves after specific time

| Function | Type |
| ---------- | ---------- |
| `wait` | `(ms?: number) => Promise<void>` |

Parameters:

* `ms`: delay in ms


Examples:

```ts
// How to sleep/delay in JS?
wait(3000).finally(() => {
  console.log("Runs after 3 sec!");
})
```



