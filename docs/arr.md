# ⚙️ Arrays utils pack API
___
## Usage
```ts
// import functions
import { getAsyncMap, getDiff, getIntersection, getLastFromIterable, getUnion, isItemsEqual, isIterable, isNonEmptyArr } from "@web3r/flowerkit/arr";

// import types
import type { TGetAsyncMapArgs, TGetAsyncMapReturn, TGetDiffArgs, TGetDiffReturn, TGetIntersectionArgs, TGetIntersectionReturn, TGetLastFromIterableArgs, TGetLastFromIterableReturn, TGetUnionArgs, TGetUnionReturn, TIsItemsEqualArgs, TIsItemsEqualReturn, TIsIterableArgs, TIsIterableReturn, TIsNonEmptyArrArgs, TIsNonEmptyArrReturn } from "@web3r/flowerkit/arr";
```
___
## Functions

- [getAsyncMap](#getasyncmap)
- [getDiff](#getdiff)
- [getIntersection](#getintersection)
- [getLastFromIterable](#getlastfromiterable)
- [getUnion](#getunion)
- [isItemsEqual](#isitemsequal)
- [isIterable](#isiterable)
- [isNonEmptyArr](#isnonemptyarr)

### getAsyncMap

Gets an aggregated result of async operation for each element of given Array

| Function | Type |
| ---------- | ---------- |
| `getAsyncMap` | `<T, U>(arr: T[], callback: (value: T, index: number, array: T[]) => U or Promise<U>) => Promise<U[]>` |

Parameters:

* `arr`: source array
* `callback`: callback function (can be sync or async)


References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)


Examples:

```ts
// How to call API for each element of an array and return a result?
const myAPIFn = (item, index, arr) => Promise.resolve("success" + item);
const array = [ 1, 2, 3 ];
const result = await getAsyncMap(array, myAPIFn);
console.log(result); // => [ "success1", "success2, "success3" ]
```


### getDiff

Gets an Array of difference between two given Arrays

| Function | Type |
| ---------- | ---------- |
| `getDiff` | `<T>(arr1: T[], arr2: T[]) => T[]` |

Parameters:

* `arr1`: first source Array
* `arr2`: second source Array


Examples:

```ts
// How to get the difference between two arrays?
const arr1 = [ 1, 2, 3 ];
const arr2 = [ 3, 4, 5, 6 ];
const diff = getDiff(arr1, arr2);
console.log(diff); // => [ 1, 2, 4, 5, 6 ]
```


### getIntersection

Gets Array of intersection of two given Arrays

| Function | Type |
| ---------- | ---------- |
| `getIntersection` | `<T>(arr1: T[], arr2: T[]) => T[]` |

Parameters:

* `arr1`: first source Array
* `arr2`: second source Array


Examples:

```ts
// How to get an intersection of two Arrays?
const arr1 = [ 1, 2, 3 ];
const arr2 = [ 2, 3, 4, 5 ];
const intersection = getIntersection(arr1, arr2);
console.log(intersection); // => [ 2, 3 ]
```


### getLastFromIterable

Gets the last element of an iterable object such as Array, NodeList, HTMLCollection, etc.

| Function | Type |
| ---------- | ---------- |
| `getLastFromIterable` | `<T>(obj: ArrayLike<T> and Iterable<T>) => T or null` |

References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)


Examples:

```ts
// How to get the last element from `NodeList` of `div`?
const lastDiv = getLastFromIterable(document.querySelectorAll("div"));
console.log(lastDiv) // => Node or null
```


### getUnion

Gets union Array of two given Arrays

| Function | Type |
| ---------- | ---------- |
| `getUnion` | `<T>(arr1: T[], arr2: T[]) => T[]` |

Parameters:

* `arr1`: first source Array
* `arr2`: sound source Array


Examples:

```ts
// How to merge two arrays in JavaScript and deduplicate items?
const arr1 = [ 1, 2, 3 ];
const arr2 = [ 2, 3, 4, 5 ];
const union = getUnion(arr1, arr2);
console.log(union); // => [ 1, 2, 3, 4, 5 ];
```


### isItemsEqual

Checks if items of given Array is same

| Function | Type |
| ---------- | ---------- |
| `isItemsEqual` | `<T>(arr: T[]) => boolean` |

Parameters:

* `arr`: source Array


Examples:

```ts
// How to check if all records are equal in an array?
const arr = [ 1, 1, 1 ];
const isSame = isItemsEqual(arr);
console.log(isSame); // => true
```


### isIterable

Check if an object is iterable

| Function | Type |
| ---------- | ---------- |
| `isIterable` | `(obj: any) => boolean` |

References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)


Examples:

```ts
// How to check for iterability?
const myDivs = document.querySelectAll("div");
const isCanBeIterated = isIterable(myDivs);
console.log(isCanBeIterated); // => true
```


### isNonEmptyArr

Check if an object is non-empty array

| Function | Type |
| ---------- | ---------- |
| `isNonEmptyArr` | `<T>(arr: unknown) => arr is T[]` |

Examples:

```ts
// How to check if an array is valid (non-empty)?
const myArr = [ 1, 2, 3 ];
console.log(isNonEmptyArr(myArr)); // => true
const myObj = "string";
console.log(isNonEmptyArr(myObj)); // => false
```




## Types

- [TGetAsyncMapArgs](#tgetasyncmapargs)
- [TGetAsyncMapReturn](#tgetasyncmapreturn)
- [TGetDiffArgs](#tgetdiffargs)
- [TGetDiffReturn](#tgetdiffreturn)
- [TGetIntersectionArgs](#tgetintersectionargs)
- [TGetIntersectionReturn](#tgetintersectionreturn)
- [TGetLastFromIterableArgs](#tgetlastfromiterableargs)
- [TGetLastFromIterableReturn](#tgetlastfromiterablereturn)
- [TGetUnionArgs](#tgetunionargs)
- [TGetUnionReturn](#tgetunionreturn)
- [TIsItemsEqualArgs](#tisitemsequalargs)
- [TIsItemsEqualReturn](#tisitemsequalreturn)
- [TIsIterableArgs](#tisiterableargs)
- [TIsIterableReturn](#tisiterablereturn)
- [TIsNonEmptyArrArgs](#tisnonemptyarrargs)
- [TIsNonEmptyArrReturn](#tisnonemptyarrreturn)

### TGetAsyncMapArgs

| Type | Type |
| ---------- | ---------- |
| `TGetAsyncMapArgs` | `Parameters<typeof getAsyncMap>` |

### TGetAsyncMapReturn

| Type | Type |
| ---------- | ---------- |
| `TGetAsyncMapReturn` | `ReturnType<typeof getAsyncMap>` |

### TGetDiffArgs

| Type | Type |
| ---------- | ---------- |
| `TGetDiffArgs` | `Parameters<typeof getDiff>` |

### TGetDiffReturn

| Type | Type |
| ---------- | ---------- |
| `TGetDiffReturn` | `ReturnType<typeof getDiff>` |

### TGetIntersectionArgs

| Type | Type |
| ---------- | ---------- |
| `TGetIntersectionArgs` | `Parameters<typeof getIntersection>` |

### TGetIntersectionReturn

| Type | Type |
| ---------- | ---------- |
| `TGetIntersectionReturn` | `ReturnType<typeof getIntersection>` |

### TGetLastFromIterableArgs

| Type | Type |
| ---------- | ---------- |
| `TGetLastFromIterableArgs` | `Parameters<typeof getLastFromIterable>` |

### TGetLastFromIterableReturn

| Type | Type |
| ---------- | ---------- |
| `TGetLastFromIterableReturn` | `ReturnType<typeof getLastFromIterable>` |

### TGetUnionArgs

| Type | Type |
| ---------- | ---------- |
| `TGetUnionArgs` | `Parameters<typeof getUnion>` |

### TGetUnionReturn

| Type | Type |
| ---------- | ---------- |
| `TGetUnionReturn` | `ReturnType<typeof getUnion>` |

### TIsItemsEqualArgs

| Type | Type |
| ---------- | ---------- |
| `TIsItemsEqualArgs` | `Parameters<typeof isItemsEqual>` |

### TIsItemsEqualReturn

| Type | Type |
| ---------- | ---------- |
| `TIsItemsEqualReturn` | `ReturnType<typeof isItemsEqual>` |

### TIsIterableArgs

| Type | Type |
| ---------- | ---------- |
| `TIsIterableArgs` | `Parameters<typeof isIterable>` |

### TIsIterableReturn

| Type | Type |
| ---------- | ---------- |
| `TIsIterableReturn` | `ReturnType<typeof isIterable>` |

### TIsNonEmptyArrArgs

| Type | Type |
| ---------- | ---------- |
| `TIsNonEmptyArrArgs` | `Parameters<typeof isNonEmptyArr>` |

### TIsNonEmptyArrReturn

| Type | Type |
| ---------- | ---------- |
| `TIsNonEmptyArrReturn` | `ReturnType<typeof isNonEmptyArr>` |

