/**
 * Creates a standard abort error.
 * @internal
 */
export const _getAbortError = (message: string = "The operation was aborted"): DOMException => {
  return new DOMException(message, "AbortError");
};

/**
 * Reads an abort reason with a cross-runtime fallback.
 * @internal
 */
export const _getAbortReason = (signal: AbortSignal): unknown => {
  return signal.reason ?? _getAbortError();
};

/**
 * Checks AbortSignal values without relying on the current realm.
 * @internal
 */
export const _isAbortSignal = (value: unknown): value is AbortSignal => {
  return Boolean(
    value
    && typeof value === "object"
    && typeof (value as AbortSignal).aborted === "boolean"
    && typeof (value as AbortSignal).addEventListener === "function"
    && typeof (value as AbortSignal).removeEventListener === "function"
  );
};
