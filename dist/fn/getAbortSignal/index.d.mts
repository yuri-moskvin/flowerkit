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
export declare const getAbortSignal: (options?: TGetAbortSignalOptions) => TAbortSignalControls;
