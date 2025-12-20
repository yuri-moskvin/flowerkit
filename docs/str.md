# ⚙️ Strings utils pack API
___
## Usage
```ts
import { getId, getStrDeclination, getStrEscaped, getStrUnescaped, getStrWithCapitalized, getStrWithThousandSeparator, getStrWithZeroFromNum, getWords, isStrInCamelCase, isStrInKebabCase, isStrInSnakeCase, isStrUrl } from "@web3r/flowerkit/str";
```
___
## Functions

- [getId](#getid)
- [getStrDeclination](#getstrdeclination)
- [getStrEscaped](#getstrescaped)
- [getStrUnescaped](#getstrunescaped)
- [getStrWithCapitalized](#getstrwithcapitalized)
- [getStrWithThousandSeparator](#getstrwiththousandseparator)
- [getStrWithZeroFromNum](#getstrwithzerofromnum)
- [getWords](#getwords)
- [isStrInCamelCase](#isstrincamelcase)
- [isStrInKebabCase](#isstrinkebabcase)
- [isStrInSnakeCase](#isstrinsnakecase)
- [isStrUrl](#isstrurl)

### getId

Gets unique string ID.

| Function | Type |
| ---------- | ---------- |
| `getId` | `(length?: number) => string` |

Parameters:

* `length`: length of ID


Examples:

```ts
// How to generate unique string ID?
const uniqueId = getId(100);
console.log(uniqueId.length); // 100
```


### getStrDeclination

Returns the correct word form (declension) depending on the number.
Commonly used for Cyrillic languages (one, few, many).

| Function | Type |
| ---------- | ---------- |
| `getStrDeclination` | `(num: number, words: readonly [string, string, string]) => string` |

Parameters:

* `num`: Source number (can be negative)
* `words`: Exactly three declensions: [one, few, many]


Returns:

Selected declension

Examples:

```ts
const words: [ string, string, string ] = [ "товар", "товара", "товаров" ];
getStrDeclination(1, words); // "товар"
getStrDeclination(2, words); // "товара"
getStrDeclination(5, words); // "товаров"
```


### getStrEscaped

Escapes special HTML characters to their corresponding entities.
Escaped: `& < > " '`

| Function | Type |
| ---------- | ---------- |
| `getStrEscaped` | `(str: string) => string` |

Parameters:

* `str`: Source string


Returns:

Escaped string safe for HTML text context

Examples:

```ts
getStrEscaped('<b>Hello & "world"</b>');
// => "&lt;b&gt;Hello &amp; &quot;world&quot;&lt;/b&gt;"
```


### getStrUnescaped

Unescapes HTML entities back to their characters.
Unescaped: `&amp; &lt; &gt; &quot; &#39;`

| Function | Type |
| ---------- | ---------- |
| `getStrUnescaped` | `(str: string) => string` |

Parameters:

* `str`: Source string


Returns:

Unescaped string

Examples:

```ts
getStrUnescaped("&lt;b&gt;Hello &amp; world&lt;/b&gt;");
// => "<b>Hello & world</b>"
```


### getStrWithCapitalized

Gets a string with uppercase first letter

| Function | Type |
| ---------- | ---------- |
| `getStrWithCapitalized` | `(str: string) => string` |

Parameters:

* `str`: source string


Returns:

String with first character uppercased

Examples:

```ts
getStrWithCapitalized("hello world"); // "Hello world"
```


### getStrWithThousandSeparator

Gets a formatted string with thousands separators from given number. This is a simple formatter for integer parts and does not handle locales or decimals.

| Function | Type |
| ---------- | ---------- |
| `getStrWithThousandSeparator` | `(num: number, separator?: string) => string` |

Parameters:

* `num`: Source number
* `separator`: Separator to insert between each group of three digits


Returns:

Formatted string

Examples:

```ts
getStrWithThousandSeparator(1000000, ","); // "1,000,000"
```


### getStrWithZeroFromNum

Pads a number with leading zeros to match the desired digit count. Preserves sign for negative numbers.

| Function | Type |
| ---------- | ---------- |
| `getStrWithZeroFromNum` | `(num: number, digits?: number) => string` |

Parameters:

* `num`: Source number
* `digits`: Desired total digits for the absolute value


Returns:

Zero-padded string

Examples:

```ts
getStrWithZeroFromNum(9, 3); // "009"
getStrWithZeroFromNum(-10, 5); // "-00010"
```


### getWords

Splits a string into words:
Splits camelCase boundaries: "helloWorld" -> "hello World"
Removes non-letter separators

| Function | Type |
| ---------- | ---------- |
| `getWords` | `(str: string) => string[]` |

Parameters:

* `str`: Source string


Returns:

Array of words (letters-only segments)

Examples:

```ts
getWords("helloWorld! what's_up?"); // ["hello","World","what","s","up"]
```


### isStrInCamelCase

Checks if a string is in camelCase.
Rules:
Starts with lowercase letters
Contains one or more capitalized segments (e.g., "abcDef")

| Function | Type |
| ---------- | ---------- |
| `isStrInCamelCase` | `(str: string) => boolean` |

Parameters:

* `str`: Source string


Returns:

True if string is camelCase

Examples:

```ts
isStrInCamelCase("abcDef"); // true
isStrInCamelCase("Word"); // false
```


### isStrInKebabCase

Checks if a string is in kebab-case.
Rules:
Lowercase letters separated by single hyphens
No leading or trailing hyphen

| Function | Type |
| ---------- | ---------- |
| `isStrInKebabCase` | `(str: string) => boolean` |

Parameters:

* `str`: Source string


Returns:

True if string is kebab-case

Examples:

```ts
isStrInKebabCase("good-kebab"); // true
```


### isStrInSnakeCase

Checks if a string is in snake_case.
Rules:
Lowercase letters separated by single underscores
No leading or trailing underscore

| Function | Type |
| ---------- | ---------- |
| `isStrInSnakeCase` | `(str: string) => boolean` |

Parameters:

* `str`: Source string


Returns:

True if string is snake_case

Examples:

```ts
isStrInSnakeCase("good_snake"); // true
```


### isStrUrl

Heuristically checks if a string looks like a URL or URL pathname. This is a permissive regex-based check and not a full URL validator.

| Function | Type |
| ---------- | ---------- |
| `isStrUrl` | `(str: string) => boolean` |

Parameters:

* `str`: Source string


Returns:

True if string looks like a URL/pathname

Examples:

```ts
isStrUrl("www.example.com"); // true
isStrUrl("file.php"); // true
```



