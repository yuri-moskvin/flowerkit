# ⚙️ Arrays utils pack API

___

## Usage

```ts
// import functions
import { getAsyncMap, getChunkedArr, getDiff, getGroupedBy, getIntersection, getLastFromIterable, getUnion, getUniqueBy, isItemsEqual, isIterable, isNonEmptyArr } from "@web3r/flowerkit/arr";

// import types
import type { TGetAsyncMapArgs, TGetAsyncMapReturn, TGetChunkedArrArgs, TGetChunkedArrReturn, TGetDiffArgs, TGetDiffReturn, TGetGroupedByArgs, TGetGroupedByReturn, TGetIntersectionArgs, TGetIntersectionReturn, TGetLastFromIterableArgs, TGetLastFromIterableReturn, TGetUnionArgs, TGetUnionReturn, TGetUniqueByArgs, TGetUniqueByReturn, TIsItemsEqualArgs, TIsItemsEqualReturn, TIsIterableArgs, TIsIterableReturn, TIsNonEmptyArrArgs, TIsNonEmptyArrReturn } from "@web3r/flowerkit/arr";
```

___

## Functions

- [getAsyncMap](#getasyncmap)
- [getChunkedArr](#getchunkedarr)
- [getDiff](#getdiff)
- [getGroupedBy](#getgroupedby)
- [getIntersection](#getintersection)
- [getLastFromIterable](#getlastfromiterable)
- [getUnion](#getunion)
- [getUniqueBy](#getuniqueby)
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
console.log(result); // => [ "success1", "success2", "success3" ]
```

```ts
// Fetch user profiles for every ID in parallel
const users = await getAsyncMap(userIds, async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
});
```


### getChunkedArr

Splits an array into chunks of a fixed size without mutating the source.

| Function | Type |
| ---------- | ---------- |
| `getChunkedArr` | `<T>(arr: T[], size: number) => T[][]` |

Parameters:

* `arr`: Source array
* `size`: Maximum number of items in each chunk


Returns:

Array of chunks

Examples:

```ts
getChunkedArr([ 1, 2, 3, 4, 5 ], 2); // [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
```

```ts
// Split products into rows of three cards for a responsive grid
const productRows = getChunkedArr(products, 3);
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

```ts
// Find permissions that changed between two role configurations
const changedPermissions = getDiff(
  [ "read", "write" ],
  [ "read", "delete" ]
); // [ "write", "delete" ]
```


### getGroupedBy

Groups array items by a key returned from a selector.

| Function | Type |
| ---------- | ---------- |
| `getGroupedBy` | `<T, TKey extends PropertyKey>(arr: T[], getKey: (value: T, index: number, array: T[]) => TKey) => Partial<Record<TKey, T[]>>` |

Parameters:

* `arr`: Source array
* `getKey`: Group key selector


Returns:

Null-prototype object containing grouped items

Examples:

```ts
getGroupedBy([ { type: "a" }, { type: "b" } ], (item) => item.type);
```

```ts
// Group orders by status before rendering dashboard columns
const ordersByStatus = getGroupedBy(orders, (order) => order.status);
const pendingOrders = ordersByStatus.pending ?? [];
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

```ts
// Get tags shared by an article and the active search filters
const matchingTags = getIntersection(
  [ "typescript", "frontend", "seo" ],
  [ "frontend", "accessibility" ]
); // [ "frontend" ]
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

```ts
// Read the last uploaded file from a FileList
const lastFile = getLastFromIterable(input.files ?? []);
console.log(lastFile?.name);
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

```ts
// Combine user and team permissions without duplicate values
const permissions = getUnion(
  [ "profile:read", "profile:write" ],
  [ "profile:read", "billing:read" ]
);
```


### getUniqueBy

Returns the first item for every unique selector result.

| Function | Type |
| ---------- | ---------- |
| `getUniqueBy` | `<T, TKey>(arr: T[], getKey: (value: T, index: number, array: T[]) => TKey) => T[]` |

Parameters:

* `arr`: Source array
* `getKey`: Unique key selector


Returns:

New array containing unique items

Examples:

```ts
getUniqueBy([ { id: 1 }, { id: 1 }, { id: 2 } ], (item) => item.id);
```

```ts
// Remove duplicate products by SKU while preserving the first result
const uniqueProducts = getUniqueBy(products, (product) => product.sku);
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

```ts
// Check whether every selected item has the same availability state
const hasSameAvailability = isItemsEqual(
  selectedProducts.map((product) => product.inStock)
);
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
const myDivs = document.querySelectorAll("div");
const isCanBeIterated = isIterable(myDivs);
console.log(isCanBeIterated); // => true
```

```ts
// Guard a value before using it in a for-of loop
if (isIterable(value)) {
  for (const item of value) console.log(item);
}
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

```ts
// Narrow API data to a non-empty array before reading the first item
if (isNonEmptyArr<User>(response.users)) {
  console.log(response.users[0].name);
}
```

## Types

- [TGetAsyncMapArgs](#tgetasyncmapargs)
- [TGetAsyncMapReturn](#tgetasyncmapreturn)
- [TGetChunkedArrArgs](#tgetchunkedarrargs)
- [TGetChunkedArrReturn](#tgetchunkedarrreturn)
- [TGetDiffArgs](#tgetdiffargs)
- [TGetDiffReturn](#tgetdiffreturn)
- [TGetGroupedByArgs](#tgetgroupedbyargs)
- [TGetGroupedByReturn](#tgetgroupedbyreturn)
- [TGetIntersectionArgs](#tgetintersectionargs)
- [TGetIntersectionReturn](#tgetintersectionreturn)
- [TGetLastFromIterableArgs](#tgetlastfromiterableargs)
- [TGetLastFromIterableReturn](#tgetlastfromiterablereturn)
- [TGetUnionArgs](#tgetunionargs)
- [TGetUnionReturn](#tgetunionreturn)
- [TGetUniqueByArgs](#tgetuniquebyargs)
- [TGetUniqueByReturn](#tgetuniquebyreturn)
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

### TGetChunkedArrArgs

| Type | Type |
| ---------- | ---------- |
| `TGetChunkedArrArgs` | `Parameters<typeof getChunkedArr>` |

### TGetChunkedArrReturn

| Type | Type |
| ---------- | ---------- |
| `TGetChunkedArrReturn` | `ReturnType<typeof getChunkedArr>` |

### TGetDiffArgs

| Type | Type |
| ---------- | ---------- |
| `TGetDiffArgs` | `Parameters<typeof getDiff>` |

### TGetDiffReturn

| Type | Type |
| ---------- | ---------- |
| `TGetDiffReturn` | `ReturnType<typeof getDiff>` |

### TGetGroupedByArgs

| Type | Type |
| ---------- | ---------- |
| `TGetGroupedByArgs` | `Parameters<typeof getGroupedBy>` |

### TGetGroupedByReturn

| Type | Type |
| ---------- | ---------- |
| `TGetGroupedByReturn` | `ReturnType<typeof getGroupedBy>` |

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

### TGetUniqueByArgs

| Type | Type |
| ---------- | ---------- |
| `TGetUniqueByArgs` | `Parameters<typeof getUniqueBy>` |

### TGetUniqueByReturn

| Type | Type |
| ---------- | ---------- |
| `TGetUniqueByReturn` | `ReturnType<typeof getUniqueBy>` |

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
