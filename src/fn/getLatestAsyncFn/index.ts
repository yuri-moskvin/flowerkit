import { _getAbortError, _getAbortReason, _isAbortSignal } from "../_abort/index.ts";
import { getAbortSignal } from "../getAbortSignal/index.ts";
import type { TAbortSignalControls } from "../getAbortSignal/index.ts";

export type TGetLatestAsyncFnOptions = {
  signal?: AbortSignal | null;
};

export type TLatestAsyncFn<TArgs extends any[], TResult> = ((
  ...args: TArgs
) => Promise<Awaited<TResult>>) & {
  cancel: (reason?: unknown) => void;
  pending: () => boolean;
};

export type TLatestAsyncSource<TArgs extends any[], TResult> = (
  signal: AbortSignal,
  ...args: TArgs
) => TResult;

export type TGetLatestAsyncFnArgs = Parameters<typeof getLatestAsyncFn>;

export type TGetLatestAsyncFnReturn = ReturnType<typeof getLatestAsyncFn>;

/**
 * Wraps an async operation so a new call aborts the previous pending call.
 * The source function receives a per-call signal as its first argument.
 * @template TArgs,TResult
 * @param {TLatestAsyncSource<TArgs, TResult>} fn Async source function
 * @param {TGetLatestAsyncFnOptions} [options={}] Shared lifecycle signal
 * @returns {TLatestAsyncFn<TArgs, TResult>} Latest-only async function with cancel controls
 * @throws {TypeError} getLatestAsyncFn: arguments are invalid
 * @example
 * const search = getLatestAsyncFn(async (signal, query: string) => {
 *   const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
 *   return response.json();
 * });
 * await search("roses");
 * @example
 * // Abort the active request when a component is disposed
 * const lifecycle = new AbortController();
 * const load = getLatestAsyncFn(loadProduct, { signal: lifecycle.signal });
 * lifecycle.abort();
 */
export const getLatestAsyncFn = <TArgs extends any[], TResult>(
  fn: TLatestAsyncSource<TArgs, TResult>,
  options: TGetLatestAsyncFnOptions = {}
): TLatestAsyncFn<TArgs, TResult> => {
  if (typeof fn !== "function") {
    throw new TypeError("getLatestAsyncFn: fn must be a function");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getLatestAsyncFn: options must be a plain object");
  }
  const { signal: lifecycleSignal = null } = options;
  if (lifecycleSignal !== null && !_isAbortSignal(lifecycleSignal)) {
    throw new TypeError("getLatestAsyncFn: signal must be an AbortSignal or null");
  }

  let current: TAbortSignalControls | null = null;
  const latest = function latestAsyncFunction(
    this: unknown,
    ...args: TArgs
  ): Promise<Awaited<TResult>> {
    current?.abort(_getAbortError("The operation was superseded"));

    const controls = getAbortSignal({ signals: [ lifecycleSignal ] });
    current = controls;
    if (controls.signal.aborted) {
      current = null;
      controls.dispose();
      return Promise.reject(_getAbortReason(controls.signal));
    }

    let removeAbortListener = (): void => {};
    const aborted = new Promise<never>((resolve, reject) => {
      const onAbort = (): void => reject(_getAbortReason(controls.signal));
      controls.signal.addEventListener("abort", onAbort, { once: true });
      removeAbortListener = (): void => controls.signal.removeEventListener("abort", onAbort);
    });
    const task = Promise.resolve().then(async () => {
      if (controls.signal.aborted) {
        throw _getAbortReason(controls.signal);
      }
      return await fn.apply(this, [ controls.signal, ...args ]);
    });

    return Promise.race([ task, aborted ]).finally(() => {
      removeAbortListener();
      if (current === controls) {
        current = null;
      }
      controls.dispose();
    }) as Promise<Awaited<TResult>>;
  } as TLatestAsyncFn<TArgs, TResult>;

  latest.cancel = (reason?: unknown): void => {
    current?.abort(reason ?? _getAbortError());
  };
  latest.pending = (): boolean => current !== null;

  return latest;
};
