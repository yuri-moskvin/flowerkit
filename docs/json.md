# ⚙️ JSON utils pack API
___
## Usage
```ts
import { getJSONFromStr, isJSON } from "@web3r/flowerkit/json";
```
___
## Functions

- [getJSONFromStr](#getjsonfromstr)
- [isJSON](#isjson)

### getJSONFromStr

Safely parses a JSON string.

| Function | Type |
| ---------- | ---------- |
| `getJSONFromStr` | `<T = unknown>(str: string, reviver?: ((this: any, key: string, value: any) => any) or undefined, onError?: ((err: unknown) => void) or undefined) => T or Record<string, never>` |

Parameters:

* `str`: Source string to parse
* `reviver`: Optional reviver function
* `onError`: Optional error callback


Returns:

Parsed object or empty object on error

References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)


Examples:

```ts
// How to convert string to JSON?
const json = getJSONFromStr<{ hello: string }>('{"hello":"world"}');
console.log(json.hello); // => "world"
```


### isJSON

Checks if a string is a valid JSON string

| Function | Type |
| ---------- | ---------- |
| `isJSON` | `(str: unknown) => boolean` |

Parameters:

* `str`: source String


Examples:

```ts
// How to check if string is a JSON?
const str = '{ "hello": "world" }';
const isStrJSON = isJSON(str);
console.log(isStrJSON); // => true
```



