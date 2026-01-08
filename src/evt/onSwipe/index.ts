import { getWindow } from "ssr-window";
import { isTouchDevice } from "../../user/isTouchDevice/index.ts";
import { bubble } from "../bubble/index.ts";

type TSupportedEvents =
  | { type: "pointer"; start: "pointerdown"; move: "pointermove"; end: "pointerup"; cancel: "pointercancel"; leave: "pointerleave"; }
  | { type: "touch"; start: "touchstart"; move: "touchmove"; end: "touchend"; cancel: "touchcancel"; leave: "touchleave"; }
  | { type: "mouse"; start: "mousedown"; move: "mousemove"; end: "mouseup"; leave: "mouseleave"; };

export type TOnSwipeArgs = Parameters<typeof onSwipe>;

export type TOnSwipeReturn = ReturnType<typeof onSwipe>;

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
export const onSwipe = <TDetail extends {
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
}>(
  el: Element | Document,
  props: {
    callback?: (detail: TDetail) => void;
    minDist?: number;
    maxDist?: number;
    minTime?: number;
    maxTime?: number;
  } = {},
  isAutoInit: boolean = true
): { handler: { start: (e: Event) => void; move: (e: Event) => void; end: (e: Event) => void; }; addListener: () => void; removeListener: () => void; } => {
  if (!el || typeof (el as any).addEventListener !== "function") {
    throw new TypeError("onSwipe: el must be an Element or Document");
  }
  if (props === null || typeof props !== "object") {
    throw new TypeError("onSwipe: props must be an object");
  }
  const {
    callback, minDist, maxDist, minTime, maxTime,
  } = props as any;
  if (typeof callback !== "undefined" && typeof callback !== "function") {
    throw new TypeError("onSwipe: callback must be a function if provided");
  }
  for (const [ k, v ] of Object.entries({
    minDist, maxDist, minTime, maxTime,
  })) {
    if (typeof v !== "undefined" && (typeof v !== "number" || !Number.isFinite(v))) {
      throw new TypeError(`onSwipe: ${k} must be a finite number if provided`);
    }
  }

  const settings = {
    minDist: 60,
    maxDist: 120,
    maxTime: 700,
    minTime: 50,
    callback: null as null | ((detail: TDetail) => void),
    ...props,
  };

  if (settings.maxTime < settings.minTime) {
    settings.maxTime = settings.minTime + 500;
  }

  if (settings.maxTime < 100 || settings.minTime < 50) {
    settings.maxTime = 700;
    settings.minTime = 50;
  }

  const eventsUnify = (e: MouseEvent | TouchEvent | PointerEvent | CustomEvent | Event) => {
    const te = e as TouchEvent;
    if (typeof te.changedTouches !== "undefined" && te.changedTouches && te.changedTouches.length) {
      return te.changedTouches[0];
    }
    return e as unknown as { pageX?: number; pageY?: number; };
  };

  const isSupport = {
    pointer: ("PointerEvent" in getWindow() || ("msPointerEnabled" in (getWindow().navigator as unknown as { msPointerEnabled?: unknown; }))),
    touch: isTouchDevice(),
  };

  const getSupportedEvents = (): TSupportedEvents => {
    if (isSupport.pointer) {
      return {
        type: "pointer",
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup",
        cancel: "pointercancel",
        leave: "pointerleave",
      };
    }
    if (isSupport.touch) {
      return {
        type: "touch",
        start: "touchstart",
        move: "touchmove",
        end: "touchend",
        cancel: "touchcancel",
        leave: "touchleave",
      };
    }
    return {
      type: "mouse",
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      leave: "mouseleave",
    };
  };

  const events = getSupportedEvents();

  let dir: "none" | "left" | "right" | "up" | "down",
    swipeType: "none" | "left" | "right" | "up" | "down",
    dist: number,
    isMouse = false,
    isMouseDown = false,
    startX = 0,
    distX = 0,
    startY = 0,
    distY = 0,
    startTime = 0;

  const checkStart = (e: Event): void => {
    const event: any = eventsUnify(e);
    const t = e as TouchEvent;
    if (isSupport.touch && typeof t.touches !== "undefined" && t.touches.length !== 1) {
      return;
    }
    dir = "none";
    swipeType = "none";
    dist = 0;
    startX = (event.pageX ?? (e as unknown as { detail?: { _pageX?: number; }; })?.detail?._pageX ?? 0);
    startY = (event.pageY ?? (e as unknown as { detail?: { _pageY?: number; }; })?.detail?._pageY ?? 0);
    startTime = Date.now();
    if (isMouse) {
      isMouseDown = true;
    }
  };

  const checkMove = (e: Event): void => {
    if (isMouse && !isMouseDown) {
      return;
    }
    const event: any = eventsUnify(e);
    distX = (event.pageX ?? (e as any)?.detail?._pageX ?? 0) - startX;
    distY = (event.pageY ?? (e as any)?.detail?._pageY ?? 0) - startY;
    if (Math.abs(distX) > Math.abs(distY)) {
      dir = (distX < 0) ? "left" : "right";
    } else {
      dir = (distY < 0) ? "up" : "down";
    }
  };

  const checkEnd = (e: Event): void => {
    if (isMouse && !isMouseDown) {
      isMouseDown = false;
      return;
    }

    const endTime = Date.now();
    const time = endTime - startTime;

    if (time >= settings.minTime && time <= settings.maxTime) {
      if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
        swipeType = dir;
      } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
        swipeType = dir;
      }
    }

    dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY);

    const ce = e as CustomEvent<{ _swipeType?: "left" | "right" | "up" | "down"; _pageX?: number; _pageY?: number; }>;
    if (ce?.detail?._swipeType) {
      swipeType = ce.detail._swipeType;
    }

    if (swipeType !== "none" && dist >= settings.minDist) {
      const detail = {
        originEvent: e,
        dir: swipeType as "left" | "right" | "up" | "down",
        dist,
        time,
        supportedEvents: events as TSupportedEvents,
      } as TDetail;
      if (typeof settings.callback === "function") {
        settings.callback(detail);
      } else {
        bubble(el as any, "swipe", detail, {
          bubbles: true,
          cancelable: true,
        });
      }
    }
  };

  const handler = {
    start: (e: Event): void => checkStart(e),
    end: (e: Event): void => checkEnd(e),
    move: (e: Event): void => checkMove(e),
  };

  if ((isSupport.pointer && !isSupport.touch) || events.type === "mouse") {
    isMouse = true;
  }

  const listenerCtrl = (isBind: boolean = true): void => {
    const action: "addEventListener" | "removeEventListener" = isBind ? "addEventListener" : "removeEventListener";
    (el as unknown as EventTarget)[action](events.start, handler.start as EventListener);
    (el as unknown as EventTarget)[action](events.move, handler.move as EventListener);
    (el as unknown as EventTarget)[action](events.end, handler.end as EventListener);
    if (isSupport.pointer && isSupport.touch) {
      (el as unknown as EventTarget)[action]("lostpointercapture", handler.end as EventListener);
    }
  };

  const addListener = (): void => {
    listenerCtrl(true);
  };

  const removeListener = (): void => {
    listenerCtrl(false);
  };

  if (isAutoInit) {
    addListener();
  }

  return {
    handler,
    addListener,
    removeListener,
  };
};
