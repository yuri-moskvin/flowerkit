# ⚙️ DOM Events utils pack API

___

## Usage

```ts
// import functions
import { bubble, on, onClickOutside, onDOMReady, onIntersection, onMediaQueryChange, onResizeObserved, onSwipe, onWindowLoad, onWindowResize } from "@web3r/flowerkit/evt";

// import types
import type { TBubbleArgs, TBubbleReturn, TOnControls, TOnArgs, TOnReturn, TOnClickOutsideOptions, TOnClickOutsideArgs, TOnClickOutsideReturn, TOnDOMReadyArgs, TOnDOMReadyReturn, TOnIntersectionArgs, TOnIntersectionReturn, TOnMediaQueryChangeArgs, TOnMediaQueryChangeReturn, TOnResizeObservedArgs, TOnResizeObservedReturn, TOnSwipeArgs, TOnSwipeReturn, TOnWindowLoadArgs, TOnWindowLoadReturn, TOnWindowResizeArgs, TOnWindowResizeReturn } from "@web3r/flowerkit/evt";
```

___

## Functions

- [bubble](#bubble)
- [on](#on)
- [onClickOutside](#onclickoutside)
- [onDOMReady](#ondomready)
- [onIntersection](#onintersection)
- [onMediaQueryChange](#onmediaquerychange)
- [onResizeObserved](#onresizeobserved)
- [onSwipe](#onswipe)
- [onWindowLoad](#onwindowload)
- [onWindowResize](#onwindowresize)

### bubble

Dispatches a bubbling `CustomEvent` on the provided target.

| Function | Type |
| ---------- | ---------- |
| `bubble` | `<T = unknown>(el: Document or Window or Element or HTMLElement or undefined, name: string, detail?: T or undefined, params?: CustomEventInit<T> and Record<...>) => void` |

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

```ts
// Notify parent components after the shopping cart changes
bubble(cartElement, "cart:update", { itemCount: cart.items.length });
```


### on

Creates a managed event listener with explicit add and remove controls.

| Function | Type |
| ---------- | ---------- |
| `on` | `<TEvent extends Event = Event>(target: EventTarget, type: string, callback: (event: TEvent) => void, options?: boolean or AddEventListenerOptions, isAutoInit?: boolean) => TOnControls<...>` |

Parameters:

* `target`: Event target
* `type`: Event type
* `callback`: Event callback
* `options`: Native listener options
* `isAutoInit`: Attach immediately


Returns:

Listener controls

Examples:

```ts
const listener = on(window, "online", () => sync());
listener.removeListener();
```

```ts
// Attach a keyboard shortcut now and remove it during component cleanup
const escapeKey = on<KeyboardEvent>(document, "keydown", (event) => {
  if (event.key === "Escape") closeDialog();
});
escapeKey.removeListener();
```


### onClickOutside

Calls a callback when an event occurs outside one or more elements.

| Function | Type |
| ---------- | ---------- |
| `onClickOutside` | `(elements: Element or readonly Element[], callback: (event: Event) => void, options?: TOnClickOutsideOptions) => { addListener: () => void; handler: (event: Event) => void; removeListener: () => void; }` |

Parameters:

* `elements`: Elements treated as inside
* `callback`: Outside-event callback
* `options`: Listener options


Returns:

Controls

Examples:

```ts
const listener = onClickOutside(menu, () => closeMenu());
```

```ts
// Close a dropdown on outside click but ignore its toggle button
const outside = onClickOutside(dropdown, closeDropdown, {
  ignored: [ toggleButton ],
  eventName: "pointerdown",
});
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

```ts
// Initialize client-side widgets after the HTML document is parsed
const ready = onDOMReady(() => initializeWidgets("[data-widget]"));
ready.removeListener();
```


### onIntersection

Observes intersection changes for one or more elements.
It is a no-op when IntersectionObserver is unavailable.

| Function | Type |
| ---------- | ---------- |
| `onIntersection` | `(elements: Element or readonly Element[], callback: IntersectionObserverCallback, options?: IntersectionObserverInit, isAutoInit?: boolean) => { ...; }` |

Parameters:

* `elements`: Elements to observe
* `callback`: Observer callback
* `options`: Observer options
* `isAutoInit`: Start observing immediately


Returns:

Controls

Examples:

```ts
const visibility = onIntersection(card, ([ entry ]) => setVisible(entry.isIntersecting));
```

```ts
// Lazy-load an image when it approaches the viewport
const lazyImage = onIntersection(image, ([ entry ]) => {
  if (entry.isIntersecting) image.src = image.dataset.src ?? "";
}, { rootMargin: "200px" });
```


### onMediaQueryChange

Creates a managed listener for changes to a CSS media query.
It is a no-op when `matchMedia` is unavailable, including SSR.

| Function | Type |
| ---------- | ---------- |
| `onMediaQueryChange` | `(query: string, callback: (event: MediaQueryListEvent) => void, isAutoInit?: boolean) => { addListener: () => void; handler: (event: MediaQueryListEvent) => void; mediaQueryList: MediaQueryList or null; removeListener: () => void; }` |

Parameters:

* `query`: Media query
* `callback`: Change callback
* `isAutoInit`: Attach immediately


Returns:

Controls

Examples:

```ts
onMediaQueryChange("(prefers-color-scheme: dark)", ({ matches }) => setDark(matches));
```

```ts
// React to a desktop breakpoint without leaking a matchMedia listener
const desktop = onMediaQueryChange("(min-width: 1024px)", ({ matches }) => {
  setSidebarExpanded(matches);
});
desktop.removeListener();
```


### onResizeObserved

Observes size changes for one or more elements.
It is a no-op when ResizeObserver is unavailable.

| Function | Type |
| ---------- | ---------- |
| `onResizeObserved` | `(elements: Element or readonly Element[], callback: ResizeObserverCallback, options?: ResizeObserverOptions, isAutoInit?: boolean) => { ...; }` |

Parameters:

* `elements`: Elements to observe
* `callback`: Observer callback
* `options`: Per-element observer options
* `isAutoInit`: Start observing immediately


Returns:

Controls

Examples:

```ts
const sizing = onResizeObserved(panel, ([ entry ]) => update(entry.contentRect));
```

```ts
// Resize a canvas when its container dimensions change
const canvasSizing = onResizeObserved(container, ([ entry ]) => {
  canvas.width = entry.contentRect.width;
  canvas.height = entry.contentRect.height;
});
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

```ts
// Navigate a touch carousel with left and right swipe gestures
const carouselSwipe = onSwipe(carousel, {
  minDist: 50,
  callback: ({ dir }) => dir === "left" ? showNextSlide() : showPreviousSlide(),
});
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

```ts
// Hide a loading screen after images and stylesheets finish loading
onWindowLoad(() => document.querySelector("[data-loader]")?.remove());
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

```ts
// Recalculate a responsive grid after resize with a 200 ms debounce
const resize = onWindowResize(() => updateGridColumns(window.innerWidth), 200);
resize.removeListener();
```

## Types

- [TBubbleArgs](#tbubbleargs)
- [TBubbleReturn](#tbubblereturn)
- [TOnControls](#toncontrols)
- [TOnArgs](#tonargs)
- [TOnReturn](#tonreturn)
- [TOnClickOutsideOptions](#tonclickoutsideoptions)
- [TOnClickOutsideArgs](#tonclickoutsideargs)
- [TOnClickOutsideReturn](#tonclickoutsidereturn)
- [TOnDOMReadyArgs](#tondomreadyargs)
- [TOnDOMReadyReturn](#tondomreadyreturn)
- [TOnIntersectionArgs](#tonintersectionargs)
- [TOnIntersectionReturn](#tonintersectionreturn)
- [TOnMediaQueryChangeArgs](#tonmediaquerychangeargs)
- [TOnMediaQueryChangeReturn](#tonmediaquerychangereturn)
- [TOnResizeObservedArgs](#tonresizeobservedargs)
- [TOnResizeObservedReturn](#tonresizeobservedreturn)
- [TOnSwipeArgs](#tonswipeargs)
- [TOnSwipeReturn](#tonswipereturn)
- [TOnWindowLoadArgs](#tonwindowloadargs)
- [TOnWindowLoadReturn](#tonwindowloadreturn)
- [TOnWindowResizeArgs](#tonwindowresizeargs)
- [TOnWindowResizeReturn](#tonwindowresizereturn)

### TBubbleArgs

| Type | Type |
| ---------- | ---------- |
| `TBubbleArgs` | `Parameters<typeof bubble>` |

### TBubbleReturn

| Type | Type |
| ---------- | ---------- |
| `TBubbleReturn` | `ReturnType<typeof bubble>` |

### TOnControls

| Type | Type |
| ---------- | ---------- |
| `TOnControls` | `{ addListener: () => void; handler: (event: TEvent) => void; removeListener: () => void; }` |

### TOnArgs

| Type | Type |
| ---------- | ---------- |
| `TOnArgs` | `Parameters<typeof on>` |

### TOnReturn

| Type | Type |
| ---------- | ---------- |
| `TOnReturn` | `ReturnType<typeof on>` |

### TOnClickOutsideOptions

| Type | Type |
| ---------- | ---------- |
| `TOnClickOutsideOptions` | `{ document?: Document; eventName?: "click" or "mousedown" or "pointerdown" or "touchstart"; ignored?: readonly Element[]; isAutoInit?: boolean; listenerOptions?: boolean or AddEventListenerOptions; }` |

### TOnClickOutsideArgs

| Type | Type |
| ---------- | ---------- |
| `TOnClickOutsideArgs` | `Parameters<typeof onClickOutside>` |

### TOnClickOutsideReturn

| Type | Type |
| ---------- | ---------- |
| `TOnClickOutsideReturn` | `ReturnType<typeof onClickOutside>` |

### TOnDOMReadyArgs

| Type | Type |
| ---------- | ---------- |
| `TOnDOMReadyArgs` | `Parameters<typeof onDOMReady>` |

### TOnDOMReadyReturn

| Type | Type |
| ---------- | ---------- |
| `TOnDOMReadyReturn` | `ReturnType<typeof onDOMReady>` |

### TOnIntersectionArgs

| Type | Type |
| ---------- | ---------- |
| `TOnIntersectionArgs` | `Parameters<typeof onIntersection>` |

### TOnIntersectionReturn

| Type | Type |
| ---------- | ---------- |
| `TOnIntersectionReturn` | `ReturnType<typeof onIntersection>` |

### TOnMediaQueryChangeArgs

| Type | Type |
| ---------- | ---------- |
| `TOnMediaQueryChangeArgs` | `Parameters<typeof onMediaQueryChange>` |

### TOnMediaQueryChangeReturn

| Type | Type |
| ---------- | ---------- |
| `TOnMediaQueryChangeReturn` | `ReturnType<typeof onMediaQueryChange>` |

### TOnResizeObservedArgs

| Type | Type |
| ---------- | ---------- |
| `TOnResizeObservedArgs` | `Parameters<typeof onResizeObserved>` |

### TOnResizeObservedReturn

| Type | Type |
| ---------- | ---------- |
| `TOnResizeObservedReturn` | `ReturnType<typeof onResizeObserved>` |

### TOnSwipeArgs

| Type | Type |
| ---------- | ---------- |
| `TOnSwipeArgs` | `Parameters<typeof onSwipe>` |

### TOnSwipeReturn

| Type | Type |
| ---------- | ---------- |
| `TOnSwipeReturn` | `ReturnType<typeof onSwipe>` |

### TOnWindowLoadArgs

| Type | Type |
| ---------- | ---------- |
| `TOnWindowLoadArgs` | `Parameters<typeof onWindowLoad>` |

### TOnWindowLoadReturn

| Type | Type |
| ---------- | ---------- |
| `TOnWindowLoadReturn` | `ReturnType<typeof onWindowLoad>` |

### TOnWindowResizeArgs

| Type | Type |
| ---------- | ---------- |
| `TOnWindowResizeArgs` | `Parameters<typeof onWindowResize>` |

### TOnWindowResizeReturn

| Type | Type |
| ---------- | ---------- |
| `TOnWindowResizeReturn` | `ReturnType<typeof onWindowResize>` |
