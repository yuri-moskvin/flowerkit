/**
 * Creates a standard abort error.
 * @internal
 */
export declare const _getAbortError: (message?: string) => DOMException;
/**
 * Reads an abort reason with a cross-runtime fallback.
 * @internal
 */
export declare const _getAbortReason: (signal: AbortSignal) => unknown;
/**
 * Checks AbortSignal values without relying on the current realm.
 * @internal
 */
export declare const _isAbortSignal: (value: unknown) => value is AbortSignal;
