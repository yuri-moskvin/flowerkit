# ⚙️ Objects utils pack API
___
## Usage
```ts
import { getAllSamePropsFromObj, getCopyOfObj, getMapFromObj, isObjHasOwnProp, getMergedObj, getObjFromFormData, getObjLength, getObjWithFallbacks, isObjEmpty, isObjPromise, isObjPrototypeOf } from "@web3r/flowerkit/obj";
```
___
## Functions

- [getAllSamePropsFromObj](#getallsamepropsfromobj)
- [getCopyOfObj](#getcopyofobj)
- [getMapFromObj](#getmapfromobj)
- [isObjHasOwnProp](#isobjhasownprop)
- [getMergedObj](#getmergedobj)
- [getObjFromFormData](#getobjfromformdata)
- [getObjLength](#getobjlength)
- [getObjWithFallbacks](#getobjwithfallbacks)
- [isObjEmpty](#isobjempty)
- [isObjPromise](#isobjpromise)
- [isObjPrototypeOf](#isobjprototypeof)

### getAllSamePropsFromObj

Gets all values inside an object by the specified key, including deeply nested objects

| Function | Type |
| ---------- | ---------- |
| `getAllSamePropsFromObj` | `<T = unknown>(obj: unknown, prop: string) => T[]` |

Parameters:

* `obj`: Source object (can be nested)
* `prop`: Property name to collect values for


Returns:

Collected values

Examples:

```ts
// How to get all duplicate key values inside an object?
const myObj = {
  someProp1: {
    a: "value 1",
    b: 2,
    c: 3,
    d: {
      a: 1,
      b: 2
    }
  },
  someProp2: {
    a: "value 3",
    b: 2,
    c: {
      a: "value 4"
    }
  }
}
getAllSamePropsFromObj<string | number>(myObj, "a") // [ "value 1", 1, "value 3", "value 4" ]
```


### getCopyOfObj

Gets a deep copy/clone of an object/array without a reference to the original object

| Function | Type |
| ---------- | ---------- |
| `getCopyOfObj` | `<T>(obj: T) => T` |

Parameters:

* `obj`: source object (array)


References:

* [https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)


Examples:

```ts
// How to make a deep clone of an object?
const originalObject = {
  value: 1,
}
const copy = getCopyOfObj(originalObject);
copy.value = 2;
console.log(originalObject.value === copy.value) // false
```


### getMapFromObj

Gets a Map from object

| Function | Type |
| ---------- | ---------- |
| `getMapFromObj` | `<K extends string = string, V = unknown>(obj?: Record<string, V>, getFiltered?: (key: string, value: V, index: number) => boolean) => Map<K, V>` |

Parameters:

* `obj`: Source object
* `getFiltered`: Filter function for each entry


Returns:

Resulting map

Examples:

```ts
// How to convert an object to ES6 Map and pass only number values?
const sourceObj = { hello: "world", goodbye: 1 };
const targetMap = getMapFromObj<string, number>(sourceObj as any, (_k, v) => typeof v === "number");
console.log(targetMap); // => Map { "goodbye" => 1 }
```


### isObjHasOwnProp

Checks if an object has own property

| Function | Type |
| ---------- | ---------- |
| `isObjHasOwnProp` | `(obj: unknown, prop: PropertyKey) => boolean` |

Parameters:

* `obj`: Source object
* `prop`: Property name


Returns:

True if own property exists

References:

* [https://eslint.org/docs/latest/rules/no-prototype-builtins](https://eslint.org/docs/latest/rules/no-prototype-builtins)


Examples:

```ts
// How to check if an object has property without calling method directly?
const obj = { foo: "bar" };
const isHasOwnProp = isObjHasOwnProp(obj, "foo");
console.log(isHasOwnProp); // => true
```


### getMergedObj

Gets one deeply merged object from two objects

| Function | Type |
| ---------- | ---------- |
| `getMergedObj` | `<TTarget extends Record<string, any> = Record<string, any>, TSource extends Record<string, any> = Record<string, any>>(target?: TTarget, source?: TSource, options?: { isMergeArrays?: boolean or undefined; arrayStrategy?: "concat" or ... 3 more ... or undefined; }) => TTarget and TSource` |

Parameters:

* `target`: Target object (cloned internally)
* `source`: Source object
* `options`: Merge options
* `options.isMergeArrays`: Concat nested arrays or keep target arrays (deprecated; use arrayStrategy)
* `options.arrayStrategy`: Array merge strategy


Returns:

Deeply merged object

Examples:

```ts
// How to deeply merge two objects?
const targetObj = { first: [ "foo" ] };
const sourceObj = { first: [ "moo" ], boo: 12 };
getMergedObj(targetObj, sourceObj) // => { first: [ "foo", "moo" ], boo: 12 }
```


### getObjFromFormData

Gets an object from `FormData` interface

| Function | Type |
| ---------- | ---------- |
| `getObjFromFormData` | `(fd?: FormData) => TFormDataReturn` |

Parameters:

* `fd`: Source `FormData` instance


Returns:

Object representation

Examples:

```ts
// How to convert `FormData` to object?
const fd = new FormData();
fd.append("test", "val");
getObjFromFormData(fd); // { test: "val" }
```


### getObjLength

Gets a length of given object

| Function | Type |
| ---------- | ---------- |
| `getObjLength` | `(obj?: Record<string, unknown> or unknown[]) => number` |

Parameters:

* `obj`: Source Object or Array


Returns:

Number of keys or array length

Examples:

```ts
// How to count number of object keys?
const obj = { key1: "value1", key2: "value2" };
const objLength = getObjLength(obj);
console.log(objLength); // => 2
```


### getObjWithFallbacks

Gets an object with fixed keys and values

| Function | Type |
| ---------- | ---------- |
| `getObjWithFallbacks` | `<TInput extends Record<string, unknown>, TOutput extends Record<string, unknown> = Record<string, unknown>>(data: TInput, rules?: TRulesSchema<TInput, TOutput>, fallbacks?: Partial<...>) => TOutput and Partial<...>` |

Parameters:

* `data`: Source data
* `rules`: Rules for transformation
* `fallbacks`: Fallback for each type of values


Returns:

Transformed object

### isObjEmpty

Checks if an object is empty

| Function | Type |
| ---------- | ---------- |
| `isObjEmpty` | `(obj: unknown) => boolean` |

Parameters:

* `obj`: Source object or array


Returns:

True if empty

Examples:

```ts
// How to check if an object is empty?
const obj = {};
const isEmpty = isObjEmpty(obj);
console.log(isEmpty); // => true
```


### isObjPromise

Checks if an object is promise

| Function | Type |
| ---------- | ---------- |
| `isObjPromise` | `(obj: unknown) => obj is Promise<unknown>` |

Parameters:

* `obj`: source object


Examples:

```ts
// How to check if an object is promise?
const obj = new Promise(() => {});
const isPromise = isObjPromise(obj);
console.log(isPromise); // => true
```


### isObjPrototypeOf

Checks whether a given object exists in the prototype chain of another value.

This is a safe wrapper around Object.prototype.isPrototypeOf that validates inputs and orks with non-plain objects and primitives (primitives always return false)

| Function | Type |
| ---------- | ---------- |
| `isObjPrototypeOf` | `(prototype: object, value: unknown) => boolean` |

Parameters:

* `prototype`: The potential prototype object
* `value`: The value whose prototype chain is checked


Returns:

True if `prototype` is in the prototype chain of `value`

Examples:

```ts
// Basic usage
const proto = {};
const obj = Object.create(proto);
isObjPrototypeOf(proto, obj); // => true
```
```ts
// With classes
class A {}
class B extends A {}
const b = new B();
isObjPrototypeOf(A.prototype, b); // => true
```
```ts
// Primitives
isObjPrototypeOf(Object.prototype, 123); // => false
```



