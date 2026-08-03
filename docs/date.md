# ⚙️ Dates utils pack API

___

## Usage

```ts
// import functions
import { getDateAdded, getDateDiff, getDateFormatted, isValidDate, getPureDate } from "@web3r/flowerkit/date";

// import types
import type { TDateInput, TGetDateAddedArgs, TGetDateAddedReturn, TGetDateDiffArgs, TGetDateDiffReturn, TGetDateFormattedArgs, TGetDateFormattedReturn, TIsValidDateArgs, TIsValidDateReturn, TGetPureDateArgs, TGetPureDateReturn } from "@web3r/flowerkit/date";
```

___

## Functions

- [getDateAdded](#getdateadded)
- [getDateDiff](#getdatediff)
- [getDateFormatted](#getdateformatted)
- [isValidDate](#isvaliddate)
- [getPureDate](#getpuredate)

### getDateAdded

Adds a calendar or elapsed-time unit to a date without mutating it.
Month and year additions clamp the day to the target month.

| Function | Type |
| ---------- | ---------- |
| `getDateAdded` | `(date: TDateInput, amount: number, unit?: TDateUnit) => Date` |

Parameters:

* `date`: Source date
* `amount`: Integer amount to add; may be negative
* `unit`: Unit


Returns:

New Date instance

Examples:

```ts
getDateAdded(new Date("2024-01-31"), 1, "month"); // 2024-02-29
```

```ts
// Calculate a session expiration date seven days from its creation
const expiresAt = getDateAdded(session.createdAt, 7, "day");
```


### getDateDiff

Gets the signed elapsed-time difference (`left - right`) in a selected unit.

| Function | Type |
| ---------- | ---------- |
| `getDateDiff` | `(left: TDateInput, right: TDateInput, unit?: TDateDiffUnit) => number` |

Parameters:

* `left`: Left date
* `right`: Right date
* `unit`: Unit


Returns:

Signed difference, which may be fractional

Examples:

```ts
getDateDiff("2024-01-03", "2024-01-01", "day"); // 2
```

```ts
// Calculate the number of hours remaining before a deadline
const hoursRemaining = getDateDiff(deadline, new Date(), "hour");
```


### getDateFormatted

Formats a date using `Intl.DateTimeFormat`.

| Function | Type |
| ---------- | ---------- |
| `getDateFormatted` | `(date: TDateInput, locales?: LocalesArgument, options?: DateTimeFormatOptions) => string` |

Parameters:

* `date`: Source date
* `locales`: Locale or locales
* `options`: Date format options


Returns:

Localized date

Examples:

```ts
getDateFormatted(new Date("2024-01-02T00:00:00Z"), "en-US", { timeZone: "UTC" });
```

```ts
// Format an order date for a Russian storefront
const label = getDateFormatted(order.createdAt, "ru-RU", {
  dateStyle: "long",
  timeZone: "Europe/Moscow",
});
```


### isValidDate

Check if a Date instance is valid

| Function | Type |
| ---------- | ---------- |
| `isValidDate` | `(date: any) => boolean` |

Examples:

```ts
// How to detect an "invalid date" Date instance in JavaScript?
const wrongDate = new Date("invalid_date");
console.log(isValidDate(wrongDate)); // => false

const validDate = new Date(0);
console.log(isValidDate(validDate)); // => true
```

```ts
// Validate a date parsed from a form field before submitting it
const birthday = new Date(formData.get("birthday") as string);
if (!isValidDate(birthday)) showDateError();
```


### getPureDate

Gets a new Date instance without time (hours, minutes, seconds, and milliseconds)

| Function | Type |
| ---------- | ---------- |
| `getPureDate` | `(date?: any) => Date or null` |

Returns:

New Date instance or null for an invalid value

Examples:

```ts
// How to get a date without time e.g., hours, minutes, seconds, and milliseconds?
const dateWithTime = new Date();
console.log(dateWithTime.getMilliseconds()); // => {number}
const dateWithoutTime = getPureDate(dateWithTime);
console.log(dateWithoutTime.getMilliseconds()); // => 0
```

```ts
// Compare calendar dates while ignoring their time values
const isDueToday = getPureDate(task.dueAt)?.getTime()
  === getPureDate(new Date())?.getTime();
```

## Types

- [TDateInput](#tdateinput)
- [TGetDateAddedArgs](#tgetdateaddedargs)
- [TGetDateAddedReturn](#tgetdateaddedreturn)
- [TGetDateDiffArgs](#tgetdatediffargs)
- [TGetDateDiffReturn](#tgetdatediffreturn)
- [TGetDateFormattedArgs](#tgetdateformattedargs)
- [TGetDateFormattedReturn](#tgetdateformattedreturn)
- [TIsValidDateArgs](#tisvaliddateargs)
- [TIsValidDateReturn](#tisvaliddatereturn)
- [TGetPureDateArgs](#tgetpuredateargs)
- [TGetPureDateReturn](#tgetpuredatereturn)

### TDateInput

| Type | Type |
| ---------- | ---------- |
| `TDateInput` | `Date or number or string` |

### TGetDateAddedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetDateAddedArgs` | `Parameters<typeof getDateAdded>` |

### TGetDateAddedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetDateAddedReturn` | `ReturnType<typeof getDateAdded>` |

### TGetDateDiffArgs

| Type | Type |
| ---------- | ---------- |
| `TGetDateDiffArgs` | `Parameters<typeof getDateDiff>` |

### TGetDateDiffReturn

| Type | Type |
| ---------- | ---------- |
| `TGetDateDiffReturn` | `ReturnType<typeof getDateDiff>` |

### TGetDateFormattedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetDateFormattedArgs` | `Parameters<typeof getDateFormatted>` |

### TGetDateFormattedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetDateFormattedReturn` | `ReturnType<typeof getDateFormatted>` |

### TIsValidDateArgs

| Type | Type |
| ---------- | ---------- |
| `TIsValidDateArgs` | `Parameters<typeof isValidDate>` |

### TIsValidDateReturn

| Type | Type |
| ---------- | ---------- |
| `TIsValidDateReturn` | `ReturnType<typeof isValidDate>` |

### TGetPureDateArgs

| Type | Type |
| ---------- | ---------- |
| `TGetPureDateArgs` | `Parameters<typeof getPureDate>` |

### TGetPureDateReturn

| Type | Type |
| ---------- | ---------- |
| `TGetPureDateReturn` | `ReturnType<typeof getPureDate>` |
