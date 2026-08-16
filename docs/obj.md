# ⚙️ Objects utils pack API

___

## Usage

```ts
// import functions
import { getAllSamePropsFromObj, getCopyOfObj, getMapFromObj, getMergedObj, getObjFromFormData, getObjLength, getObjValueByPath, getObjWithFallbacks, getObjWithoutUndefined, getObjWithOmittedProps, getObjWithPickedProps, isObjEmpty, isObjEqual, isObjHasOwnProp, isObjPromise, isObjPrototypeOf } from "@web3r/flowerkit/obj";

// import types
import type { TGetAllSamePropsFromObjArgs, TGetAllSamePropsFromObjReturn, TGetCopyOfObjArgs, TGetCopyOfObjReturn, TGetMapFromObjArgs, TGetMapFromObjReturn, TGetMergedObjArgs, TGetMergedObjReturn, TGetObjFromFormDataArgs, TGetObjFromFormDataReturn, TGetObjLengthArgs, TGetObjLengthReturn, TObjPath, TGetObjValueByPathArgs, TGetObjValueByPathReturn, TGetObjWithFallbacksArgs, TGetObjWithFallbacksReturn, TGetObjWithoutUndefinedArgs, TGetObjWithoutUndefinedReturn, TGetObjWithOmittedPropsArgs, TGetObjWithOmittedPropsReturn, TGetObjWithPickedPropsArgs, TGetObjWithPickedPropsReturn, TIsObjEmptyArgs, TIsObjEmptyReturn, TIsObjEqualArgs, TIsObjEqualReturn, TIsObjHasOwnPropArgs, TIsObjHasOwnPropReturn, TIsObjPromiseArgs, TIsObjPromiseReturn, TIsObjPrototypeOfArgs, TIsObjPrototypeOfReturn } from "@web3r/flowerkit/obj";
```

___

## Functions

- [getAllSamePropsFromObj](#getallsamepropsfromobj)
- [getCopyOfObj](#getcopyofobj)
- [getMapFromObj](#getmapfromobj)
- [getMergedObj](#getmergedobj)
- [getObjFromFormData](#getobjfromformdata)
- [getObjLength](#getobjlength)
- [getObjValueByPath](#getobjvaluebypath)
- [getObjWithFallbacks](#getobjwithfallbacks)
- [getObjWithoutUndefined](#getobjwithoutundefined)
- [getObjWithOmittedProps](#getobjwithomittedprops)
- [getObjWithPickedProps](#getobjwithpickedprops)
- [isObjEmpty](#isobjempty)
- [isObjEqual](#isobjequal)
- [isObjHasOwnProp](#isobjhasownprop)
- [isObjPromise](#isobjpromise)
- [isObjPrototypeOf](#isobjprototypeof)

### getAllSamePropsFromObj

Gets all values inside an object by the specified key, including deeply nested and circular objects.

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

```ts
// Collect every category id from a nested navigation tree
const categoryIds = getAllSamePropsFromObj<string>(navigation, "categoryId");
```


### getCopyOfObj

Gets a deep copy/clone of an object/array without a reference to the original object.
Supports common built-ins including dates, URLs, collections, and binary views.

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

```ts
// Create an editable form draft without mutating the saved profile
const profileDraft = getCopyOfObj(savedProfile);
profileDraft.contacts.email = "new@example.com";
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

```ts
// Convert a permission configuration object into a lookup Map
const permissions = getMapFromObj({ edit: true, delete: false }, (_key, allowed) => allowed);
permissions.has("edit"); // => true
```


### getMergedObj

Gets one deeply merged object from two objects while preserving circular references.

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

```ts
// Merge user preferences with defaults and replace inherited arrays
const settings = getMergedObj(defaultSettings, userSettings, {
  arrayStrategy: "replace",
});
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

```ts
// Convert repeated checkbox values into an array
const filters = new FormData();
filters.append("category", "books");
filters.append("category", "games");
getObjFromFormData(filters); // { category: [ "books", "games" ] }
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

```ts
// Display the number of active filters in a search interface
const activeFilterCount = getObjLength(activeFilters);
```


### getObjValueByPath

Reads a nested own property using a dot path or an array of property keys.
Returns the fallback when traversal fails or the resolved value is `undefined`.

| Function | Type |
| ---------- | ---------- |
| `getObjValueByPath` | `<TValue = unknown>(obj: object, path: TObjPath, fallback?: TValue or undefined) => TValue or undefined` |

Parameters:

* `obj`: Source object or array
* `path`: Dot path or property-key array
* `fallback`: Value returned for a missing path


Returns:

Resolved value or fallback

Examples:

```ts
const sellerName = getObjValueByPath<string>(product, "seller.profile.name", "Unknown");
```

```ts
// Array paths support indexes, symbols, and keys that contain dots
const quantity = getObjValueByPath<number>(order, [ "items", 0, "quantity" ], 0);
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

Examples:

```ts
// Normalize incomplete API data before rendering a user card
const user = getObjWithFallbacks(
  { name: "", age: undefined },
  {
    name: { type: "string", fallback: "Anonymous" },
    age: { type: "number", fallback: 0 },
  }
); // { name: "Anonymous", age: 0 }
```

```ts
// Rename an API field and provide a global fallback for missing strings
const product = getObjWithFallbacks(
  { product_name: null },
  { product_name: { output: "name", type: "string" } },
  { string: "Untitled product" }
); // { name: "Untitled product" }
```


### getObjWithoutUndefined

Creates a shallow copy without own properties whose value is `undefined`.

| Function | Type |
| ---------- | ---------- |
| `getObjWithoutUndefined` | `<T extends object>(obj: T) => TObjectWithoutUndefined<T>` |

Parameters:

* `obj`: Source object


Returns:

Object with defined values

Examples:

```ts
getObjWithoutUndefined({ id: 1, name: undefined }); // { id: 1 }
```

```ts
// Build a PATCH payload while preserving intentional null values
const payload = getObjWithoutUndefined({ name, avatar: null, phone: undefined });
// `phone` is removed, while `avatar` remains null
```


### getObjWithOmittedProps

Creates an object without selected own properties.

| Function | Type |
| ---------- | ---------- |
| `getObjWithOmittedProps` | `<T extends object, TKey extends keyof T>(obj: T, keys: readonly TKey[]) => Omit<T, TKey>` |

Parameters:

* `obj`: Source object
* `keys`: Keys to omit


Returns:

Remaining properties

Examples:

```ts
getObjWithOmittedProps({ id: 1, password: "secret" }, [ "password" ]); // { id: 1 }
```

```ts
// Remove internal fields before sending a public API response
const publicUser = getObjWithOmittedProps(user, [ "passwordHash", "internalNotes" ]);
```


### getObjWithPickedProps

Creates an object containing selected own properties.

| Function | Type |
| ---------- | ---------- |
| `getObjWithPickedProps` | `<T extends object, TKey extends keyof T>(obj: T, keys: readonly TKey[]) => Pick<T, TKey>` |

Parameters:

* `obj`: Source object
* `keys`: Keys to copy


Returns:

Picked properties

Examples:

```ts
getObjWithPickedProps({ id: 1, name: "Ada" }, [ "id" ]); // { id: 1 }
```

```ts
// Select safe fields for a public user profile
const publicProfile = getObjWithPickedProps(user, [ "id", "displayName", "avatarUrl" ]);
```


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

```ts
// Show an empty state when no search filters are selected
const hasActiveFilters = !isObjEmpty(selectedFilters);
```


### isObjEqual

Checks if two objects are deeply equal by keys and values (not by reference),
including collections and binary data.

| Function | Type |
| ---------- | ---------- |
| `isObjEqual` | `(obj1: unknown, obj2: unknown) => boolean` |

Parameters:

* `obj1`: First object
* `obj2`: Second object


Returns:

True if objects are deeply equal

Examples:

```ts
// How to compare two objects by content?
const a = { foo: { bar: 1 } };
const b = { foo: { bar: 1 } };
const isEqual = isObjEqual(a, b);
console.log(isEqual); // => true
```

```ts
// Enable a save button only when a form draft has changed
const hasUnsavedChanges = !isObjEqual(initialValues, formValues);
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

```ts
// Safely check an untrusted API response for an error field
if (isObjHasOwnProp(response, "error")) {
  showError(response.error);
}
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

```ts
// Normalize a handler that can return either a value or a Promise
const result = plugin.run();
const value = isObjPromise(result) ? await result : result;
```


### isObjPrototypeOf

Checks whether a given object exists in the prototype chain of another value.

This is a safe wrapper around Object.prototype.isPrototypeOf that validates inputs and works with non-plain objects and primitives (primitives always return false)

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

```ts
// Check whether an event target is a DOM element
const isElement = isObjPrototypeOf(Element.prototype, event.target);
```

## Types

- [TGetAllSamePropsFromObjArgs](#tgetallsamepropsfromobjargs)
- [TGetAllSamePropsFromObjReturn](#tgetallsamepropsfromobjreturn)
- [TGetCopyOfObjArgs](#tgetcopyofobjargs)
- [TGetCopyOfObjReturn](#tgetcopyofobjreturn)
- [TGetMapFromObjArgs](#tgetmapfromobjargs)
- [TGetMapFromObjReturn](#tgetmapfromobjreturn)
- [TGetMergedObjArgs](#tgetmergedobjargs)
- [TGetMergedObjReturn](#tgetmergedobjreturn)
- [TGetObjFromFormDataArgs](#tgetobjfromformdataargs)
- [TGetObjFromFormDataReturn](#tgetobjfromformdatareturn)
- [TGetObjLengthArgs](#tgetobjlengthargs)
- [TGetObjLengthReturn](#tgetobjlengthreturn)
- [TObjPath](#tobjpath)
- [TGetObjValueByPathArgs](#tgetobjvaluebypathargs)
- [TGetObjValueByPathReturn](#tgetobjvaluebypathreturn)
- [TGetObjWithFallbacksArgs](#tgetobjwithfallbacksargs)
- [TGetObjWithFallbacksReturn](#tgetobjwithfallbacksreturn)
- [TGetObjWithoutUndefinedArgs](#tgetobjwithoutundefinedargs)
- [TGetObjWithoutUndefinedReturn](#tgetobjwithoutundefinedreturn)
- [TGetObjWithOmittedPropsArgs](#tgetobjwithomittedpropsargs)
- [TGetObjWithOmittedPropsReturn](#tgetobjwithomittedpropsreturn)
- [TGetObjWithPickedPropsArgs](#tgetobjwithpickedpropsargs)
- [TGetObjWithPickedPropsReturn](#tgetobjwithpickedpropsreturn)
- [TIsObjEmptyArgs](#tisobjemptyargs)
- [TIsObjEmptyReturn](#tisobjemptyreturn)
- [TIsObjEqualArgs](#tisobjequalargs)
- [TIsObjEqualReturn](#tisobjequalreturn)
- [TIsObjHasOwnPropArgs](#tisobjhasownpropargs)
- [TIsObjHasOwnPropReturn](#tisobjhasownpropreturn)
- [TIsObjPromiseArgs](#tisobjpromiseargs)
- [TIsObjPromiseReturn](#tisobjpromisereturn)
- [TIsObjPrototypeOfArgs](#tisobjprototypeofargs)
- [TIsObjPrototypeOfReturn](#tisobjprototypeofreturn)

### TGetAllSamePropsFromObjArgs

| Type | Type |
| ---------- | ---------- |
| `TGetAllSamePropsFromObjArgs` | `Parameters<typeof getAllSamePropsFromObj>` |

### TGetAllSamePropsFromObjReturn

| Type | Type |
| ---------- | ---------- |
| `TGetAllSamePropsFromObjReturn` | `ReturnType<typeof getAllSamePropsFromObj>` |

### TGetCopyOfObjArgs

| Type | Type |
| ---------- | ---------- |
| `TGetCopyOfObjArgs` | `Parameters<typeof getCopyOfObj>` |

### TGetCopyOfObjReturn

| Type | Type |
| ---------- | ---------- |
| `TGetCopyOfObjReturn` | `ReturnType<typeof getCopyOfObj>` |

### TGetMapFromObjArgs

| Type | Type |
| ---------- | ---------- |
| `TGetMapFromObjArgs` | `Parameters<typeof getMapFromObj>` |

### TGetMapFromObjReturn

| Type | Type |
| ---------- | ---------- |
| `TGetMapFromObjReturn` | `ReturnType<typeof getMapFromObj>` |

### TGetMergedObjArgs

| Type | Type |
| ---------- | ---------- |
| `TGetMergedObjArgs` | `Parameters<typeof getMergedObj>` |

### TGetMergedObjReturn

| Type | Type |
| ---------- | ---------- |
| `TGetMergedObjReturn` | `ReturnType<typeof getMergedObj>` |

### TGetObjFromFormDataArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjFromFormDataArgs` | `Parameters<typeof getObjFromFormData>` |

### TGetObjFromFormDataReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjFromFormDataReturn` | `ReturnType<typeof getObjFromFormData>` |

### TGetObjLengthArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjLengthArgs` | `Parameters<typeof getObjLength>` |

### TGetObjLengthReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjLengthReturn` | `ReturnType<typeof getObjLength>` |

### TObjPath

| Type | Type |
| ---------- | ---------- |
| `TObjPath` | `string or readonly PropertyKey[]` |

### TGetObjValueByPathArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjValueByPathArgs` | `Parameters<typeof getObjValueByPath>` |

### TGetObjValueByPathReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjValueByPathReturn` | `ReturnType<typeof getObjValueByPath>` |

### TGetObjWithFallbacksArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithFallbacksArgs` | `Parameters<typeof getObjWithFallbacks>` |

### TGetObjWithFallbacksReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithFallbacksReturn` | `ReturnType<typeof getObjWithFallbacks>` |

### TGetObjWithoutUndefinedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithoutUndefinedArgs` | `Parameters<typeof getObjWithoutUndefined>` |

### TGetObjWithoutUndefinedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithoutUndefinedReturn` | `ReturnType<typeof getObjWithoutUndefined>` |

### TGetObjWithOmittedPropsArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithOmittedPropsArgs` | `Parameters<typeof getObjWithOmittedProps>` |

### TGetObjWithOmittedPropsReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithOmittedPropsReturn` | `ReturnType<typeof getObjWithOmittedProps>` |

### TGetObjWithPickedPropsArgs

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithPickedPropsArgs` | `Parameters<typeof getObjWithPickedProps>` |

### TGetObjWithPickedPropsReturn

| Type | Type |
| ---------- | ---------- |
| `TGetObjWithPickedPropsReturn` | `ReturnType<typeof getObjWithPickedProps>` |

### TIsObjEmptyArgs

| Type | Type |
| ---------- | ---------- |
| `TIsObjEmptyArgs` | `Parameters<typeof isObjEmpty>` |

### TIsObjEmptyReturn

| Type | Type |
| ---------- | ---------- |
| `TIsObjEmptyReturn` | `ReturnType<typeof isObjEmpty>` |

### TIsObjEqualArgs

| Type | Type |
| ---------- | ---------- |
| `TIsObjEqualArgs` | `Parameters<typeof isObjEqual>` |

### TIsObjEqualReturn

| Type | Type |
| ---------- | ---------- |
| `TIsObjEqualReturn` | `ReturnType<typeof isObjEqual>` |

### TIsObjHasOwnPropArgs

| Type | Type |
| ---------- | ---------- |
| `TIsObjHasOwnPropArgs` | `Parameters<typeof isObjHasOwnProp>` |

### TIsObjHasOwnPropReturn

| Type | Type |
| ---------- | ---------- |
| `TIsObjHasOwnPropReturn` | `ReturnType<typeof isObjHasOwnProp>` |

### TIsObjPromiseArgs

| Type | Type |
| ---------- | ---------- |
| `TIsObjPromiseArgs` | `Parameters<typeof isObjPromise>` |

### TIsObjPromiseReturn

| Type | Type |
| ---------- | ---------- |
| `TIsObjPromiseReturn` | `ReturnType<typeof isObjPromise>` |

### TIsObjPrototypeOfArgs

| Type | Type |
| ---------- | ---------- |
| `TIsObjPrototypeOfArgs` | `Parameters<typeof isObjPrototypeOf>` |

### TIsObjPrototypeOfReturn

| Type | Type |
| ---------- | ---------- |
| `TIsObjPrototypeOfReturn` | `ReturnType<typeof isObjPrototypeOf>` |
