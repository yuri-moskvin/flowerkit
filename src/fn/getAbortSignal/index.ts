import { _getAbortReason, _isAbortSignal } from "../_abort/index.ts";

export type TAbortSignalControls = {
  abort: (reason?: unknown) => void;
  dispose: () => void;
  signal: AbortSignal;
};

export type TGetAbortSignalOptions = {
  signals?: readonly (AbortSignal | null | undefined)[];
  timeout?: number;
};

export type TGetAbortSignalArgs = Parameters<typeof getAbortSignal>;

export type TGetAbortSignalReturn = ReturnType<typeof getAbortSignal>;

/**
 * Creates a disposable abort signal that can combine external signals with a timeout.
 * The returned controller can also abort the operation manually.
 * @param {TGetAbortSignalOptions} [options={}] External signals and optional timeout
 * @returns {TAbortSignalControls} Abort signal and lifecycle controls
 * @throws {TypeError} getAbortSignal: options are invalid
 * @example
 * const request = getAbortSignal({ timeout: 5_000 });
 * await fetch("/api/products", { signal: request.signal }).finally(request.dispose);
 * @example
 * // Combine component cleanup with a request timeout
 * const component = new AbortController();
 * const request = getAbortSignal({ signals: [ component.signal ], timeout: 2_000 });
 * component.abort();
 */
export const getAbortSignal = (
  options: TGetAbortSignalOptions = {}
): TAbortSignalControls => {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getAbortSignal: options must be a plain object");
  }
  const { signals = [], timeout } = options;
  if (!Array.isArray(signals)) {
    throw new TypeError("getAbortSignal: signals must be an array");
  }
  if (signals.some((signal) => signal !== null && signal !== undefined && !_isAbortSignal(signal))) {
    throw new TypeError("getAbortSignal: signals must contain AbortSignal values");
  }
  if (timeout !== undefined && (
    typeof timeout !== "number"
    || !Number.isFinite(timeout)
    || timeout < 0
  )) {
    throw new TypeError("getAbortSignal: timeout must be a non-negative finite number");
  }

  const controller = new AbortController();
  const listeners: Array<{
    handler: () => void;
    signal: AbortSignal;
  }> = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  const dispose = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    listeners.splice(0).forEach(({ handler, signal }) => {
      signal.removeEventListener("abort", handler);
    });
  };
  const abort = (reason?: unknown): void => {
    if (!controller.signal.aborted) {
      if (reason === undefined) {
        controller.abort();
      } else {
        controller.abort(reason);
      }
    }
    dispose();
  };

  for (const signal of signals) {
    if (signal === null || signal === undefined) {
      continue;
    }
    if (signal.aborted) {
      abort(_getAbortReason(signal));
      break;
    }
    const handler = (): void => abort(_getAbortReason(signal));
    listeners.push({ handler, signal });
    signal.addEventListener("abort", handler, { once: true });
  }

  if (!controller.signal.aborted && timeout !== undefined) {
    timer = setTimeout(() => {
      abort(new DOMException("The operation timed out", "TimeoutError"));
    }, timeout);
  }

  return { abort, dispose, signal: controller.signal };
};
