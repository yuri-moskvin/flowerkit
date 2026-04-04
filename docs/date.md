# ⚙️ Dates utils pack API
___
## Usage
```ts
// import functions
import { isValidDate, getPureDate } from "@web3r/flowerkit/date";

// import types
import type { TIsValidDateArgs, TIsValidDateReturn, TGetPureDateArgs, TGetPureDateReturn } from "@web3r/flowerkit/date";
```
___
## Functions

- [isValidDate](#isvaliddate)
- [getPureDate](#getpuredate)

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


### getPureDate

Gets a Date instance without time (hours, minutes, seconds, and milliseconds)

| Function | Type |
| ---------- | ---------- |
| `getPureDate` | `(date?: any) => Date or null` |

Examples:

```ts
// How to get a date without time e.g., hours, minutes, seconds, and milliseconds?
const dateWithTime = new Date();
console.log(dateWithTime.getMilliseconds()); // => {number}
const dateWithoutTime = getPureDate(dateWithTime);
console.log(dateWithoutTime.getMilliseconds()); // => 0
```




## Types

- [TIsValidDateArgs](#tisvaliddateargs)
- [TIsValidDateReturn](#tisvaliddatereturn)
- [TGetPureDateArgs](#tgetpuredateargs)
- [TGetPureDateReturn](#tgetpuredatereturn)

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

