# ⚙️ DOM Events utils pack API
___
## Usage
```ts
import { bubble, onDOMReady, onSwipe, onWindowLoad, onWindowResize } from "@web3r/flowerkit/evt";
```
___
## Functions

- [bubble](#bubble)
- [onDOMReady](#ondomready)
- [onSwipe](#onswipe)
- [onWindowLoad](#onwindowload)
- [onWindowResize](#onwindowresize)

### bubble

Dispatches a bubbling `CustomEvent` on the provided target.

| Function | Type |
| ---------- | ---------- |
| `bubble` | `<T = unknown>(el: TBubbleTarget or undefined, name: string, detail?: T or undefined, params?: TBubbleParams<T>) => void` |

Parameters:

* `el`: Event target
* `name`: Event name
* `detail`: Custom event detail payload
* `params`: Extra `CustomEvent` init options


References:

* [https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)


Examples:

```ts
bubble(document, "myEvent", { myData: "test" });
```
```ts
const el = document.querySelector("#myElement");
if (el) bubble(el, "myEvent");
```


### onDOMReady

Runs a callback when the DOM is ready (`DOMContentLoaded`).
If already ready, executes immediately.

| Function | Type |
| ---------- | ---------- |
| `onDOMReady` | `(cb: (e?: Event or undefined) => void, isAutoInit?: boolean or undefined) => { handler: (e?: Event or undefined) => void; addListener: () => void; removeListener: () => void; }` |

Parameters:

* `cb`: Callback to run on DOM ready
* `isAutoInit`: Attach immediately


Examples:

```ts
onDOMReady(() => console.log("DOM ready"));
```


### onSwipe

Adds a device-agnostic swipe detector for an element (pointer, touch, or mouse).
Dispatches a "swipe" `CustomEvent` or calls the provided callback.

| Function | Type |
| ---------- | ---------- |
| `onSwipe` | `<TDetail extends { originEvent: Event; dir: "left" or "right" or "up" or "down"; dist: number; time: number; supportedEvents: TSupportedEvents; } = { originEvent: Event; dir: "left" or ... 2 more ... or "down"; dist: number; time: number; supportedEvents: TSupportedEvents; }>(el: Document or Element, props?: { ...; }, isA...` |

Parameters:

* `el`: Target to listen for gestures
* `props`: Swipe configuration
* `isAutoInit`: Attach listeners immediately


Examples:

```ts
onSwipe(document.getElementById("box")!, { callback: ({ dir }) => console.log(dir) });
```


### onWindowLoad

Runs a callback when the window load event fires.
Executes immediately if already loaded.

| Function | Type |
| ---------- | ---------- |
| `onWindowLoad` | `(cb: (e?: Event or undefined) => void, isAutoInit?: boolean or undefined) => { handler: (e?: Event or undefined) => void; addListener: () => void; removeListener: () => void; }` |

Parameters:

* `cb`: Callback to run on load
* `isAutoInit`: Attach immediately


Examples:

```ts
const { removeListener } = onWindowLoad(() => console.log("Loaded"));
```


### onWindowResize

Runs a callback on window resize. If `delay` is provided, the callback is debounced.

| Function | Type |
| ---------- | ---------- |
| `onWindowResize` | `(cb: (e: Event) => void, delay?: number or undefined, isAutoInit?: boolean or undefined) => { handler: (e: Event) => void; addListener: () => void; removeListener: () => void; }` |

Parameters:

* `cb`: Resize callback
* `delay`: Debounce delay in ms; falsy to call immediately
* `isAutoInit`: Attach immediately


Examples:

```ts
onWindowResize(() => console.log("resized"));
```



