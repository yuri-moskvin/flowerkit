export type TDateInput = Date | number | string;

/**
 * Creates a validated copy of a date input.
 * @param {TDateInput} value Source date
 * @param {string} functionName Public function name for validation messages
 * @returns {Date} Valid Date instance
 * @throws {TypeError} Date input must be valid
 * @internal
 */
export const _getDateValue = (value: TDateInput, functionName: string): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`${functionName}: date must be a valid date`);
  }
  return date;
};
