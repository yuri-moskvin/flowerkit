# ⚙️ Dates utils pack API
___
## Usage
```ts
import { isValidDate, getPureDate } from "@web3r/flowerkit/date";
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



