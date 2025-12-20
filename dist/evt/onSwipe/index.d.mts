type TSupportedEvents = {
    type: "pointer";
    start: "pointerdown";
    move: "pointermove";
    end: "pointerup";
    cancel: "pointercancel";
    leave: "pointerleave";
} | {
    type: "touch";
    start: "touchstart";
    move: "touchmove";
    end: "touchend";
    cancel: "touchcancel";
    leave: "touchleave";
} | {
    type: "mouse";
    start: "mousedown";
    move: "mousemove";
    end: "mouseup";
    leave: "mouseleave";
};
/**
 * Adds a device-agnostic swipe detector for an element (pointer, touch, or mouse).
 * Dispatches a "swipe" `CustomEvent` or calls the provided callback.
 *
 * @template TDetail
 * @param {Element|Document} el Target to listen for gestures
 * @param {{
 *   callback?: (detail: TDetail) => void;
 *   minDist?: number;
 *   maxDist?: number;
 *   minTime?: number;
 *   maxTime?: number;
 * }} [props={}] Swipe configuration
 * @param {boolean} [isAutoInit=true] Attach listeners immediately
 * @returns {{
 *   handler: { start: (e: Event) => void; move: (e: Event) => void; end: (e: Event) => void };
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onSwipe: el must be an Element or Document
 * @throws {TypeError} onSwipe: props must be an object
 * @throws {TypeError} onSwipe: callback must be a function if provided
 * @throws {TypeError} onSwipe: minDist/maxDist/minTime/maxTime must be finite numbers if provided
 *
 * @example
 * onSwipe(document.getElementById("box")!, { callback: ({ dir }) => console.log(dir) });
 */
export declare const onSwipe: <TDetail extends {
    originEvent: Event;
    dir: "left" | "right" | "up" | "down";
    dist: number;
    time: number;
    supportedEvents: TSupportedEvents;
} = {
    originEvent: Event;
    dir: "left" | "right" | "up" | "down";
    dist: number;
    time: number;
    supportedEvents: TSupportedEvents;
}>(el: Element | Document, props?: {
    callback?: (detail: TDetail) => void;
    minDist?: number;
    maxDist?: number;
    minTime?: number;
    maxTime?: number;
}, isAutoInit?: boolean) => {
    handler: {
        start: (e: Event) => void;
        move: (e: Event) => void;
        end: (e: Event) => void;
    };
    addListener: () => void;
    removeListener: () => void;
};
export {};
