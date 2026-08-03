# ⚙️ Numbers utils pack API

___

## Usage

```ts
// import functions
import { getClampedNum, getCurrencyFormatted, getMaxFromArr, getMinFromArr, getNumberFormatted, getRandomIntFromInterval, getRounded } from "@web3r/flowerkit/num";

// import types
import type { TGetClampedNumArgs, TGetClampedNumReturn, TGetCurrencyFormattedArgs, TGetCurrencyFormattedReturn, TGetMaxFromArrArgs, TGetMaxFromArrReturn, TGetMinFromArrArgs, TGetMinFromArrReturn, TGetNumberFormattedArgs, TGetNumberFormattedReturn, TGetRandomIntFromIntervalArgs, TGetRandomIntFromIntervalReturn, TGetRoundedArgs, TGetRoundedReturn } from "@web3r/flowerkit/num";
```

___

## Functions

- [getClampedNum](#getclampednum)
- [getCurrencyFormatted](#getcurrencyformatted)
- [getMaxFromArr](#getmaxfromarr)
- [getMinFromArr](#getminfromarr)
- [getNumberFormatted](#getnumberformatted)
- [getRandomIntFromInterval](#getrandomintfrominterval)
- [getRounded](#getrounded)

### getClampedNum

Restricts a number to an inclusive range.

| Function | Type |
| ---------- | ---------- |
| `getClampedNum` | `(num: number, min: number, max: number) => number` |

Parameters:

* `num`: Source number
* `min`: Minimum value
* `max`: Maximum value


Returns:

Clamped number

Examples:

```ts
getClampedNum(12, 0, 10); // 10
```

```ts
// Clamp upload progress to a valid percentage between 0 and 100
const progress = getClampedNum((uploadedBytes / totalBytes) * 100, 0, 100);
```


### getCurrencyFormatted

Formats a number as currency using `Intl.NumberFormat`.

| Function | Type |
| ---------- | ---------- |
| `getCurrencyFormatted` | `(num: number, currency: string, locales?: LocalesArgument, options?: Omit<NumberFormatOptions, "style" or "currency">) => string` |

Parameters:

* `num`: Source number
* `currency`: ISO 4217 currency code
* `locales`: Locale or locales
* `options`: Number format options


Returns:

Localized currency value

Examples:

```ts
getCurrencyFormatted(12.5, "USD", "en-US"); // "$12.50"
```

```ts
// Format a product price for a Russian storefront
const priceLabel = getCurrencyFormatted(product.price, "RUB", "ru-RU", {
  maximumFractionDigits: 0,
});
```


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

```ts
// Find the highest value for a chart scale
const chartMax = getMaxFromArr(points.map((point) => point.value));
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

```ts
// Find the lowest product price in a catalog
const lowestPrice = getMinFromArr(products.map((product) => product.price));
```


### getNumberFormatted

Formats a number using `Intl.NumberFormat`.

| Function | Type |
| ---------- | ---------- |
| `getNumberFormatted` | `(num: number, locales?: LocalesArgument, options?: NumberFormatOptions) => string` |

Parameters:

* `num`: Source number
* `locales`: Locale or locales
* `options`: Number format options


Returns:

Localized number

Examples:

```ts
getNumberFormatted(1234.5, "en-US"); // "1,234.5"
```

```ts
// Format a large analytics metric using compact notation
const viewsLabel = getNumberFormatted(1_250_000, "en-US", { notation: "compact" }); // "1.3M"
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

```ts
// Pick a random promotional banner by its array index
const bannerIndex = getRandomIntFromInterval(0, banners.length - 1);
const banner = banners[bannerIndex];
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

```ts
// Round a calculated order total to two decimal places
const total = getRounded(subtotal + (subtotal * taxRate), 2);
```

## Types

- [TGetClampedNumArgs](#tgetclampednumargs)
- [TGetClampedNumReturn](#tgetclampednumreturn)
- [TGetCurrencyFormattedArgs](#tgetcurrencyformattedargs)
- [TGetCurrencyFormattedReturn](#tgetcurrencyformattedreturn)
- [TGetMaxFromArrArgs](#tgetmaxfromarrargs)
- [TGetMaxFromArrReturn](#tgetmaxfromarrreturn)
- [TGetMinFromArrArgs](#tgetminfromarrargs)
- [TGetMinFromArrReturn](#tgetminfromarrreturn)
- [TGetNumberFormattedArgs](#tgetnumberformattedargs)
- [TGetNumberFormattedReturn](#tgetnumberformattedreturn)
- [TGetRandomIntFromIntervalArgs](#tgetrandomintfromintervalargs)
- [TGetRandomIntFromIntervalReturn](#tgetrandomintfromintervalreturn)
- [TGetRoundedArgs](#tgetroundedargs)
- [TGetRoundedReturn](#tgetroundedreturn)

### TGetClampedNumArgs

| Type | Type |
| ---------- | ---------- |
| `TGetClampedNumArgs` | `Parameters<typeof getClampedNum>` |

### TGetClampedNumReturn

| Type | Type |
| ---------- | ---------- |
| `TGetClampedNumReturn` | `ReturnType<typeof getClampedNum>` |

### TGetCurrencyFormattedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCurrencyFormattedArgs` | `Parameters<typeof getCurrencyFormatted>` |

### TGetCurrencyFormattedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCurrencyFormattedReturn` | `ReturnType<typeof getCurrencyFormatted>` |

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

### TGetNumberFormattedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetNumberFormattedArgs` | `Parameters<typeof getNumberFormatted>` |

### TGetNumberFormattedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetNumberFormattedReturn` | `ReturnType<typeof getNumberFormatted>` |

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
