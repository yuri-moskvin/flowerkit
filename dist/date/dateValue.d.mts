export type TDateInput = Date | number | string;
/**
 * Creates a validated copy of a date input.
 * @param {TDateInput} value Source date
 * @param {string} functionName Public function name for validation messages
 * @returns {Date} Valid Date instance
 * @throws {TypeError} Date input must be valid
 * @internal
 */
export declare const getDateValue: (value: TDateInput, functionName: string) => Date;
