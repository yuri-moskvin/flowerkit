# ⚙️ Numbers utils pack API
___
## Usage
```ts
import { getMaxFromArr, getMinFromArr, getRandomIntFromInterval, getRounded } from "@web3r/flowerkit/num";
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



