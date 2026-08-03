# ⚙️ Strings utils pack API

___

## Usage

```ts
// import functions
import { getId, getStrDeclination, getStrEscaped, getStrTruncated, getStrUnescaped, getStrWithCamelCase, getStrWithCapitalized, getStrWithKebabCase, getStrWithNormalizedSpaces, getStrWithSlug, getStrWithSnakeCase, getStrWithThousandSeparator, getStrWithZeroFromNum, getWords, isStrInCamelCase, isStrInKebabCase, isStrInSnakeCase, isStrUrl } from "@web3r/flowerkit/str";

// import types
import type { TGetIdArgs, TGetIdReturn, TGetStrDeclinationArgs, TGetStrDeclinationReturn, TGetStrEscapedArgs, TGetStrEscapedReturn, TGetStrTruncatedArgs, TGetStrTruncatedReturn, TGetStrUnescapedArgs, TGetStrUnescapedReturn, TGetStrWithCamelCaseArgs, TGetStrWithCamelCaseReturn, TGetStrWithCapitalizedArgs, TGetStrWithCapitalizedReturn, TGetStrWithKebabCaseArgs, TGetStrWithKebabCaseReturn, TGetStrWithNormalizedSpacesArgs, TGetStrWithNormalizedSpacesReturn, TGetStrWithSlugArgs, TGetStrWithSlugReturn, TGetStrWithSnakeCaseArgs, TGetStrWithSnakeCaseReturn, TGetStrWithThousandSeparatorArgs, TGetStrWithThousandSeparatorReturn, TGetStrWithZeroFromNumArgs, TGetStrWithZeroFromNumReturn, TGetWordsArgs, TGetWordsReturn, TIsStrInCamelCaseArgs, TIsStrInCamelCaseReturn, TIsStrInKebabCaseArgs, TIsStrInKebabCaseReturn, TIsStrInSnakeCaseArgs, TIsStrInSnakeCaseReturn, TIsStrUrlArgs, TIsStrUrlReturn } from "@web3r/flowerkit/str";
```

___

## Functions

- [getId](#getid)
- [getStrDeclination](#getstrdeclination)
- [getStrEscaped](#getstrescaped)
- [getStrTruncated](#getstrtruncated)
- [getStrUnescaped](#getstrunescaped)
- [getStrWithCamelCase](#getstrwithcamelcase)
- [getStrWithCapitalized](#getstrwithcapitalized)
- [getStrWithKebabCase](#getstrwithkebabcase)
- [getStrWithNormalizedSpaces](#getstrwithnormalizedspaces)
- [getStrWithSlug](#getstrwithslug)
- [getStrWithSnakeCase](#getstrwithsnakecase)
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

```ts
// Generate an id for linking a form label to its input
const inputId = `email-${getId(8)}`;
label.htmlFor = inputId;
input.id = inputId;
```


### getStrDeclination

Returns the correct word form (declension) depending on the number.
Commonly used for Cyrillic languages (one, few, many).

| Function | Type |
| ---------- | ---------- |
| `getStrDeclination` | `(num: number, words: readonly [string, string, string]) => string` |

Parameters:

* `num`: Source integer (can be negative)
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

```ts
// Build a localized cart item counter
const itemLabel = `${count} ${getStrDeclination(count, [ "товар", "товара", "товаров" ])}`;
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

```ts
// Escape user-generated text before inserting it into an HTML template
const safeComment = `<p>${getStrEscaped(comment.text)}</p>`;
```


### getStrTruncated

Truncates a string to a maximum number of Unicode code points.
The suffix is included in the maximum length.

| Function | Type |
| ---------- | ---------- |
| `getStrTruncated` | `(str: string, maxLength: number, suffix?: string) => string` |

Parameters:

* `str`: Source string
* `maxLength`: Maximum result length
* `suffix`: Suffix for truncated strings


Returns:

Truncated string

Examples:

```ts
getStrTruncated("Hello world", 8); // "Hello w…"
```

```ts
// Limit a product title to fit inside a compact card
const cardTitle = getStrTruncated(product.title, 48, "...");
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

```ts
// Decode escaped text received from a trusted CMS field
const pageTitle = getStrUnescaped(cmsPage.escapedTitle);
```


### getStrWithCamelCase

Converts a string to camelCase.

| Function | Type |
| ---------- | ---------- |
| `getStrWithCamelCase` | `(str: string) => string` |

Parameters:

* `str`: Source string


Returns:

camelCase string

Examples:

```ts
getStrWithCamelCase("hello-world value"); // "helloWorldValue"
```

```ts
// Convert an API field name into a JavaScript property name
const propertyName = getStrWithCamelCase("billing-address-id"); // "billingAddressId"
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

```ts
// Capitalize a category name for a page heading
const heading = getStrWithCapitalized(category.name);
```


### getStrWithKebabCase

Converts a string to kebab-case.

| Function | Type |
| ---------- | ---------- |
| `getStrWithKebabCase` | `(str: string) => string` |

Parameters:

* `str`: Source string


Returns:

kebab-case string

Examples:

```ts
getStrWithKebabCase("helloWorld value"); // "hello-world-value"
```

```ts
// Convert a component variant into a CSS class modifier
const modifier = `button--${getStrWithKebabCase(variantName)}`;
```


### getStrWithNormalizedSpaces

Trims a string and replaces consecutive whitespace with a single space.

| Function | Type |
| ---------- | ---------- |
| `getStrWithNormalizedSpaces` | `(str: string) => string` |

Parameters:

* `str`: Source string


Returns:

Normalized string

Examples:

```ts
getStrWithNormalizedSpaces("  hello\n world  "); // "hello world"
```

```ts
// Normalize a search query pasted by a user
const query = getStrWithNormalizedSpaces(searchInput.value);
```


### getStrWithSlug

Creates a lowercase Unicode slug. Diacritics are removed, while non-Latin
letters such as Cyrillic are preserved.

| Function | Type |
| ---------- | ---------- |
| `getStrWithSlug` | `(str: string, options?: { separator?: string or undefined; locale?: string or undefined; }) => string` |

Parameters:

* `str`: Source string
* `options`: Slug options


Returns:

Slug

Examples:

```ts
getStrWithSlug("Café: Привет мир!"); // "cafe-привет-мир"
```

```ts
// Create an SEO-friendly article pathname with a custom separator
const pathname = `/blog/${getStrWithSlug(article.title, { separator: "-" })}`;
```


### getStrWithSnakeCase

Converts a string to snake_case.

| Function | Type |
| ---------- | ---------- |
| `getStrWithSnakeCase` | `(str: string) => string` |

Parameters:

* `str`: Source string


Returns:

snake_case string

Examples:

```ts
getStrWithSnakeCase("helloWorld value"); // "hello_world_value"
```

```ts
// Convert an action name into an analytics event key
const eventName = getStrWithSnakeCase("Product Added To Cart"); // "product_added_to_cart"
```


### getStrWithThousandSeparator

Gets a formatted string with thousands separators in the integer part of a number.

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

```ts
// Format a dashboard counter with narrow no-break spaces
const views = getStrWithThousandSeparator(1_250_000, "\u202f");
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

```ts
// Format a countdown timer as mm:ss
const timer = `${getStrWithZeroFromNum(minutes)}:${getStrWithZeroFromNum(seconds)}`;
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

```ts
// Extract searchable words from a camelCase configuration key
const keywords = getWords("productCardImageURL"); // [ "product", "Card", "Image", "URL" ]
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

```ts
// Validate JavaScript-style keys imported from a configuration file
const invalidKeys = Object.keys(config).filter((key) => !isStrInCamelCase(key));
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

```ts
// Validate a CSS class naming convention
const isValidClassName = isStrInKebabCase(className);
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

```ts
// Validate an analytics event name before sending it
if (isStrInSnakeCase(eventName)) analytics.track(eventName);
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

```ts
// Detect whether pasted text should be rendered as a link
const shouldLinkify = isStrUrl(clipboardText.trim());
```

## Types

- [TGetIdArgs](#tgetidargs)
- [TGetIdReturn](#tgetidreturn)
- [TGetStrDeclinationArgs](#tgetstrdeclinationargs)
- [TGetStrDeclinationReturn](#tgetstrdeclinationreturn)
- [TGetStrEscapedArgs](#tgetstrescapedargs)
- [TGetStrEscapedReturn](#tgetstrescapedreturn)
- [TGetStrTruncatedArgs](#tgetstrtruncatedargs)
- [TGetStrTruncatedReturn](#tgetstrtruncatedreturn)
- [TGetStrUnescapedArgs](#tgetstrunescapedargs)
- [TGetStrUnescapedReturn](#tgetstrunescapedreturn)
- [TGetStrWithCamelCaseArgs](#tgetstrwithcamelcaseargs)
- [TGetStrWithCamelCaseReturn](#tgetstrwithcamelcasereturn)
- [TGetStrWithCapitalizedArgs](#tgetstrwithcapitalizedargs)
- [TGetStrWithCapitalizedReturn](#tgetstrwithcapitalizedreturn)
- [TGetStrWithKebabCaseArgs](#tgetstrwithkebabcaseargs)
- [TGetStrWithKebabCaseReturn](#tgetstrwithkebabcasereturn)
- [TGetStrWithNormalizedSpacesArgs](#tgetstrwithnormalizedspacesargs)
- [TGetStrWithNormalizedSpacesReturn](#tgetstrwithnormalizedspacesreturn)
- [TGetStrWithSlugArgs](#tgetstrwithslugargs)
- [TGetStrWithSlugReturn](#tgetstrwithslugreturn)
- [TGetStrWithSnakeCaseArgs](#tgetstrwithsnakecaseargs)
- [TGetStrWithSnakeCaseReturn](#tgetstrwithsnakecasereturn)
- [TGetStrWithThousandSeparatorArgs](#tgetstrwiththousandseparatorargs)
- [TGetStrWithThousandSeparatorReturn](#tgetstrwiththousandseparatorreturn)
- [TGetStrWithZeroFromNumArgs](#tgetstrwithzerofromnumargs)
- [TGetStrWithZeroFromNumReturn](#tgetstrwithzerofromnumreturn)
- [TGetWordsArgs](#tgetwordsargs)
- [TGetWordsReturn](#tgetwordsreturn)
- [TIsStrInCamelCaseArgs](#tisstrincamelcaseargs)
- [TIsStrInCamelCaseReturn](#tisstrincamelcasereturn)
- [TIsStrInKebabCaseArgs](#tisstrinkebabcaseargs)
- [TIsStrInKebabCaseReturn](#tisstrinkebabcasereturn)
- [TIsStrInSnakeCaseArgs](#tisstrinsnakecaseargs)
- [TIsStrInSnakeCaseReturn](#tisstrinsnakecasereturn)
- [TIsStrUrlArgs](#tisstrurlargs)
- [TIsStrUrlReturn](#tisstrurlreturn)

### TGetIdArgs

| Type | Type |
| ---------- | ---------- |
| `TGetIdArgs` | `Parameters<typeof getId>` |

### TGetIdReturn

| Type | Type |
| ---------- | ---------- |
| `TGetIdReturn` | `ReturnType<typeof getId>` |

### TGetStrDeclinationArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrDeclinationArgs` | `Parameters<typeof getStrDeclination>` |

### TGetStrDeclinationReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrDeclinationReturn` | `ReturnType<typeof getStrDeclination>` |

### TGetStrEscapedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrEscapedArgs` | `Parameters<typeof getStrEscaped>` |

### TGetStrEscapedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrEscapedReturn` | `ReturnType<typeof getStrEscaped>` |

### TGetStrTruncatedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrTruncatedArgs` | `Parameters<typeof getStrTruncated>` |

### TGetStrTruncatedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrTruncatedReturn` | `ReturnType<typeof getStrTruncated>` |

### TGetStrUnescapedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrUnescapedArgs` | `Parameters<typeof getStrUnescaped>` |

### TGetStrUnescapedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrUnescapedReturn` | `ReturnType<typeof getStrUnescaped>` |

### TGetStrWithCamelCaseArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithCamelCaseArgs` | `Parameters<typeof getStrWithCamelCase>` |

### TGetStrWithCamelCaseReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithCamelCaseReturn` | `ReturnType<typeof getStrWithCamelCase>` |

### TGetStrWithCapitalizedArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithCapitalizedArgs` | `Parameters<typeof getStrWithCapitalized>` |

### TGetStrWithCapitalizedReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithCapitalizedReturn` | `ReturnType<typeof getStrWithCapitalized>` |

### TGetStrWithKebabCaseArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithKebabCaseArgs` | `Parameters<typeof getStrWithKebabCase>` |

### TGetStrWithKebabCaseReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithKebabCaseReturn` | `ReturnType<typeof getStrWithKebabCase>` |

### TGetStrWithNormalizedSpacesArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithNormalizedSpacesArgs` | `Parameters<typeof getStrWithNormalizedSpaces>` |

### TGetStrWithNormalizedSpacesReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithNormalizedSpacesReturn` | `ReturnType<typeof getStrWithNormalizedSpaces>` |

### TGetStrWithSlugArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithSlugArgs` | `Parameters<typeof getStrWithSlug>` |

### TGetStrWithSlugReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithSlugReturn` | `ReturnType<typeof getStrWithSlug>` |

### TGetStrWithSnakeCaseArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithSnakeCaseArgs` | `Parameters<typeof getStrWithSnakeCase>` |

### TGetStrWithSnakeCaseReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithSnakeCaseReturn` | `ReturnType<typeof getStrWithSnakeCase>` |

### TGetStrWithThousandSeparatorArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithThousandSeparatorArgs` | `Parameters<typeof getStrWithThousandSeparator>` |

### TGetStrWithThousandSeparatorReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithThousandSeparatorReturn` | `ReturnType<typeof getStrWithThousandSeparator>` |

### TGetStrWithZeroFromNumArgs

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithZeroFromNumArgs` | `Parameters<typeof getStrWithZeroFromNum>` |

### TGetStrWithZeroFromNumReturn

| Type | Type |
| ---------- | ---------- |
| `TGetStrWithZeroFromNumReturn` | `ReturnType<typeof getStrWithZeroFromNum>` |

### TGetWordsArgs

| Type | Type |
| ---------- | ---------- |
| `TGetWordsArgs` | `Parameters<typeof getWords>` |

### TGetWordsReturn

| Type | Type |
| ---------- | ---------- |
| `TGetWordsReturn` | `ReturnType<typeof getWords>` |

### TIsStrInCamelCaseArgs

| Type | Type |
| ---------- | ---------- |
| `TIsStrInCamelCaseArgs` | `Parameters<typeof isStrInCamelCase>` |

### TIsStrInCamelCaseReturn

| Type | Type |
| ---------- | ---------- |
| `TIsStrInCamelCaseReturn` | `ReturnType<typeof isStrInCamelCase>` |

### TIsStrInKebabCaseArgs

| Type | Type |
| ---------- | ---------- |
| `TIsStrInKebabCaseArgs` | `Parameters<typeof isStrInKebabCase>` |

### TIsStrInKebabCaseReturn

| Type | Type |
| ---------- | ---------- |
| `TIsStrInKebabCaseReturn` | `ReturnType<typeof isStrInKebabCase>` |

### TIsStrInSnakeCaseArgs

| Type | Type |
| ---------- | ---------- |
| `TIsStrInSnakeCaseArgs` | `Parameters<typeof isStrInSnakeCase>` |

### TIsStrInSnakeCaseReturn

| Type | Type |
| ---------- | ---------- |
| `TIsStrInSnakeCaseReturn` | `ReturnType<typeof isStrInSnakeCase>` |

### TIsStrUrlArgs

| Type | Type |
| ---------- | ---------- |
| `TIsStrUrlArgs` | `Parameters<typeof isStrUrl>` |

### TIsStrUrlReturn

| Type | Type |
| ---------- | ---------- |
| `TIsStrUrlReturn` | `ReturnType<typeof isStrUrl>` |
