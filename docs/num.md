# ⚙️ Numbers utils pack API
___
## Usage
```ts
// import functions
import { getMaxFromArr, getMinFromArr, getRandomIntFromInterval, getRounded } from "@web3r/flowerkit/num";

// import types
import type { TGetMaxFromArrArgs, TGetMaxFromArrReturn, TGetMinFromArrArgs, TGetMinFromArrReturn, TGetRandomIntFromIntervalArgs, TGetRandomIntFromIntervalReturn, TGetRoundedArgs, TGetRoundedReturn } from "@web3r/flowerkit/num";
```
___
## Functions

- [getMaxFromArr](#getmaxfromarr)
- [getMinFromArr](#getminfromarr)
- [getRandomIntFromInterval](#getrandomintfrominterval)
- [getRounded](#getrounded)

### getMaxFromArr

Gets max number from an array of numbers

| Function | Type |
| ---------- | ---------- |
| `getMaxFromArr` | `(arr: number[]) => number` |

Parameters:

* `arr`: Source array of numbers (must be non-empty)


Returns:

Maximum value

Examples:

```ts
// How to get max number from Array of numbers?
const arr = [ 100, 200, 300 ];
const max = getMaxFromArr(arr);
console.log(max); // 300
```


### getMinFromArr

Gets min number from an array of numbers

| Function | Type |
| ---------- | ---------- |
| `getMinFromArr` | `(arr: number[]) => number` |

Parameters:

* `arr`: Source array of numbers (must be non-empty)


Returns:

Minimum value

Examples:

```ts
// How to get min number from Array of numbers?
const arr = [ 100, 200, 300 ];
const min = getMinFromArr(arr);
console.log(min); // 100
```


### getRandomIntFromInterval

Gets a random integer between min and max (inclusive)

| Function | Type |
| ---------- | ---------- |
| `getRandomIntFromInterval` | `(min?: number, max?: number) => number` |

Parameters:

* `min`: Min value
* `max`: Max value


Returns:

Random integer in [min, max]

Examples:

```ts
// How to generate random number between two numbers?
const randomNumber = getRandomIntFromInterval(1, 10);
console.log(randomNumber >= 1 && randomNumber <= 10); // => true
```


### getRounded

Rounds a number to specific decimal places

| Function | Type |
| ---------- | ---------- |
| `getRounded` | `(num: number, places?: number) => number` |

Parameters:

* `num`: Source number
* `places`: Decimal places (0..100)


Returns:

Rounded number

Examples:

```ts
// How to round number to 4 decimal places?
const num = 0.00025;
const rounded = getRounded(num, 4);
console.log(rounded); // => 0.0003
```




## Types

- [TGetMaxFromArrArgs](#tgetmaxfromarrargs)
- [TGetMaxFromArrReturn](#tgetmaxfromarrreturn)
- [TGetMinFromArrArgs](#tgetminfromarrargs)
- [TGetMinFromArrReturn](#tgetminfromarrreturn)
- [TGetRandomIntFromIntervalArgs](#tgetrandomintfromintervalargs)
- [TGetRandomIntFromIntervalReturn](#tgetrandomintfromintervalreturn)
- [TGetRoundedArgs](#tgetroundedargs)
- [TGetRoundedReturn](#tgetroundedreturn)

### TGetMaxFromArrArgs

| Type | Type |
| ---------- | ---------- |
| `TGetMaxFromArrArgs` | `Parameters<typeof getMaxFromArr>` |

### TGetMaxFromArrReturn

| Type | Type |
| ---------- | ---------- |
| `TGetMaxFromArrReturn` | `ReturnType<typeof getMaxFromArr>` |

### TGetMinFromArrArgs

| Type | Type |
| ---------- | ---------- |
| `TGetMinFromArrArgs` | `Parameters<typeof getMinFromArr>` |

### TGetMinFromArrReturn

| Type | Type |
| ---------- | ---------- |
| `TGetMinFromArrReturn` | `ReturnType<typeof getMinFromArr>` |

### TGetRandomIntFromIntervalArgs

| Type | Type |
| ---------- | ---------- |
| `TGetRandomIntFromIntervalArgs` | `Parameters<typeof getRandomIntFromInterval>` |

### TGetRandomIntFromIntervalReturn

| Type | Type |
| ---------- | ---------- |
| `TGetRandomIntFromIntervalReturn` | `ReturnType<typeof getRandomIntFromInterval>` |

### TGetRoundedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetRoundedArgs` | `Parameters<typeof getRounded>` |

### TGetRoundedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetRoundedReturn` | `ReturnType<typeof getRounded>` |

