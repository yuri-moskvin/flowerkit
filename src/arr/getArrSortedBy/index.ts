export type TArrSortDirection = "asc" | "desc";

export type TArrSortNulls = "first" | "last";

export type TArrSortValue = bigint | boolean | Date | null | number | string | undefined;

export type TGetArrSortedByOptions<TValue extends TArrSortValue> = {
  compare?: (left: TValue, right: TValue) => number;
  direction?: TArrSortDirection;
  nulls?: TArrSortNulls;
};

export type TGetArrSortedByArgs = Parameters<typeof getArrSortedBy>;

export type TGetArrSortedByReturn = ReturnType<typeof getArrSortedBy>;

const isEmptySortValue = (value: TArrSortValue): boolean => {
  return value === null
    || value === undefined
    || (typeof value === "number" && Number.isNaN(value))
    || (value instanceof Date && Number.isNaN(value.getTime()));
};

const getComparableValue = (value: TArrSortValue): bigint | boolean | number | string => {
  return value instanceof Date ? value.getTime() : value as bigint | boolean | number | string;
};

const compareDefault = (left: TArrSortValue, right: TArrSortValue): number => {
  const leftValue = getComparableValue(left);
  const rightValue = getComparableValue(right);
  if (typeof leftValue === typeof rightValue) {
    if (leftValue < rightValue) {
      return -1;
    }
    if (leftValue > rightValue) {
      return 1;
    }
    return 0;
  }
  return String(leftValue).localeCompare(String(rightValue));
};

/**
 * Returns a stable, sorted copy of an array using a value selector.
 * Nullish values, `NaN`, and invalid dates are placed according to `nulls`.
 * @template T,TValue
 * @param {readonly T[]} arr Source array
 * @param {(value: T, index: number, array: readonly T[]) => TValue} getValue Sort value selector
 * @param {TGetArrSortedByOptions<TValue>} [options={}] Direction, empty-value placement, and comparator
 * @returns {T[]} Stable sorted copy
 * @throws {TypeError} getArrSortedBy: arguments are invalid
 * @example
 * const productsByPrice = getArrSortedBy(products, (product) => product.price, {
 *   direction: "desc",
 * });
 * @example
 * // Sort localized names while keeping missing names at the end
 * const collator = new Intl.Collator("ru-RU", { sensitivity: "base" });
 * const usersByName = getArrSortedBy(users, (user) => user.name, {
 *   compare: collator.compare,
 *   nulls: "last",
 * });
 */
export const getArrSortedBy = <T, TValue extends TArrSortValue>(
  arr: readonly T[],
  getValue: (value: T, index: number, array: readonly T[]) => TValue,
  options: TGetArrSortedByOptions<TValue> = {}
): T[] => {
  if (!Array.isArray(arr)) {
    throw new TypeError("getArrSortedBy: arr must be an array");
  }
  if (typeof getValue !== "function") {
    throw new TypeError("getArrSortedBy: getValue must be a function");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getArrSortedBy: options must be a plain object");
  }
  const {
    compare = compareDefault as (left: TValue, right: TValue) => number,
    direction = "asc",
    nulls = "last",
  } = options;
  if (typeof compare !== "function") {
    throw new TypeError("getArrSortedBy: compare must be a function");
  }
  if (direction !== "asc" && direction !== "desc") {
    throw new TypeError('getArrSortedBy: direction must be "asc" or "desc"');
  }
  if (nulls !== "first" && nulls !== "last") {
    throw new TypeError('getArrSortedBy: nulls must be "first" or "last"');
  }

  return arr
    .map((value, index, array) => ({ index, sortValue: getValue(value, index, array), value }))
    .sort((left, right) => {
      const leftIsEmpty = isEmptySortValue(left.sortValue);
      const rightIsEmpty = isEmptySortValue(right.sortValue);
      if (leftIsEmpty || rightIsEmpty) {
        if (leftIsEmpty && rightIsEmpty) {
          return left.index - right.index;
        }
        return leftIsEmpty === (nulls === "first") ? -1 : 1;
      }
      const compared = compare(left.sortValue, right.sortValue);
      if (typeof compared !== "number" || !Number.isFinite(compared)) {
        throw new TypeError("getArrSortedBy: compare must return a finite number");
      }
      return compared === 0
        ? left.index - right.index
        : compared * (direction === "asc" ? 1 : -1);
    })
    .map(({ value }) => value);
};
