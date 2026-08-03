# ⚙️ DOM utils pack API

___

## Usage

```ts
// import functions
import { getElSiblings, getElWrapper, getHTMLFromStr, getIndexOfEl, isNode, removeChildNodes } from "@web3r/flowerkit/dom";

// import types
import type { TGetElSiblingsArgs, TGetElSiblingsReturn, TGetElWrapperArgs, TGetElWrapperReturn, TGetHTMLFromStrArgs, TGetHTMLFromStrReturn, TGetIndexOfElArgs, TGetIndexOfElReturn, TIsNodeArgs, TIsNodeReturn, TRemoveChildNodesArgs, TRemoveChildNodesReturn } from "@web3r/flowerkit/dom";
```

___

## Functions

- [getElSiblings](#getelsiblings)
- [getElWrapper](#getelwrapper)
- [getHTMLFromStr](#gethtmlfromstr)
- [getIndexOfEl](#getindexofel)
- [isNode](#isnode)
- [removeChildNodes](#removechildnodes)

### getElSiblings

Gets an array of all siblings of given node

| Function | Type |
| ---------- | ---------- |
| `getElSiblings` | `(el: HTMLElement) => ChildNode[]` |

Parameters:

* `el`: node


Examples:

```ts
// How to get all siblings of `li` DOM-element with specific ID?
// <ul>
//   <li id="item1">One</li>
//   <li id="item2">Two</li>
//   <li id="item3">Three</li>
// <ul>
const secondItem = document.getElementById("item2");
getElSiblings(secondItem).filter(item => item !== secondItem) // [ li#item1, li#item3 ]
```

```ts
// Remove the active state from sibling tabs before selecting a new tab
getElSiblings(activeTab).forEach((tab) => tab.classList.remove("active"));
```


### getElWrapper

Gets a wrapper for specific element

| Function | Type |
| ---------- | ---------- |
| `getElWrapper` | `(el: HTMLElement, str: string) => HTMLElement` |

Parameters:

* `el`: DOM element
* `str`: string of wrapper HTML layout (supports nested blocks)


Examples:

```ts
// How to wrap content to the few nested `div` blocks?
// <div id="block">My Element</div>
const wrapperLayout = `
 <div class="wrapper">
   <div class="wrapper__inner"></div>
 </div>
`;
const el = document.getElementById("block");
const wrapped = getElWrapper(el, wrapperLayout);
console.log(wrapped.outerHTML); // => `<div class="wrapper"><div class="wrapper__inner"><div id="block">My Element</div></div></div>`
```

```ts
// Wrap a form field with reusable validation markup
const fieldWrapper = getElWrapper(input, `
  <label class="field"><span class="field__control"></span></label>
`);
```


### getHTMLFromStr

Get parsed HTML from string and return NodeList that includes elements and text

| Function | Type |
| ---------- | ---------- |
| `getHTMLFromStr` | `(str?: string, type?: DOMParserSupportedType) => Promise<NodeList>` |

Parameters:

* `str`: - source string
* `type`: - content type:
"application/xhtml+xml", "application/xml", "image/svg+xml",
"text/html" (default), or "text/xml"


Returns:

Promise resolving to NodeList, or rejecting with TypeError on invalid arguments.

References:

* [https://developer.mozilla.org/en-US/docs/Web/API/DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)


Examples:

```ts
// How to get parsed HTML elements from string?
const nodes = await getHTMLFromStr(`
  <p>Hello world!</p>
  <p>Hello world!</p>
`);
const elements = Array.from(nodes); // array of two paragraph nodes
```

```ts
// Parse an SVG string into DOM nodes on the browser or server
const iconNodes = await getHTMLFromStr(
  `<svg viewBox="0 0 24 24"><path d="M4 12h16" /></svg>`,
  "image/svg+xml"
);
```


### getIndexOfEl

Gets index of Node from relatively its siblings

| Function | Type |
| ---------- | ---------- |
| `getIndexOfEl` | `(el: HTMLElement or Element or Node or Document) => number` |

Parameters:

* `el`: DOM element


Examples:

```ts
// <ul>
//  <li id="a">A</li>
//  Text node
//  <li id="b">B</li>
//  <li id="c">C</li>
// </ul>
getIndexOfEl(document.querySelector("#c")!) // 2
```

```ts
// Find the index of a clicked tab among its element siblings
tabs.addEventListener("click", (event) => {
  if (event.target instanceof Element) selectTab(getIndexOfEl(event.target));
});
```


### isNode

Checks whether the specified object is a DOM element

| Function | Type |
| ---------- | ---------- |
| `isNode` | `(el: any) => boolean` |

Parameters:

* `el`: source object


Examples:

```ts
// How to check if an object is dom node?
const isMyElNode = isNode(document.getElementById("test"));
console.log(isMyElNode) // => boolean
```

```ts
// Guard an event target before using DOM Node methods
if (isNode(event.target) && container.contains(event.target)) {
  console.log("The event came from inside the container");
}
```


### removeChildNodes

Removes all child nodes of given node

| Function | Type |
| ---------- | ---------- |
| `removeChildNodes` | `(el: Node) => void` |

Parameters:

* `el`: node


Examples:

```ts
// How to remove all child elements of a DOM node?
// <div id="myBlock"><div>Block with child nodes</div></div>
const myDiv = document.getElementById("myBlock");
removeChildNodes(myDiv);
console.log(Array.from(myDiv.children).length); // => 0
```

```ts
// Clear old autocomplete results before rendering a new response
removeChildNodes(searchResults);
searchResults.append(...nextResultItems);
```

## Types

- [TGetElSiblingsArgs](#tgetelsiblingsargs)
- [TGetElSiblingsReturn](#tgetelsiblingsreturn)
- [TGetElWrapperArgs](#tgetelwrapperargs)
- [TGetElWrapperReturn](#tgetelwrapperreturn)
- [TGetHTMLFromStrArgs](#tgethtmlfromstrargs)
- [TGetHTMLFromStrReturn](#tgethtmlfromstrreturn)
- [TGetIndexOfElArgs](#tgetindexofelargs)
- [TGetIndexOfElReturn](#tgetindexofelreturn)
- [TIsNodeArgs](#tisnodeargs)
- [TIsNodeReturn](#tisnodereturn)
- [TRemoveChildNodesArgs](#tremovechildnodesargs)
- [TRemoveChildNodesReturn](#tremovechildnodesreturn)

### TGetElSiblingsArgs

| Type | Type |
| ---------- | ---------- |
| `TGetElSiblingsArgs` | `Parameters<typeof getElSiblings>` |

### TGetElSiblingsReturn

| Type | Type |
| ---------- | ---------- |
| `TGetElSiblingsReturn` | `ReturnType<typeof getElSiblings>` |

### TGetElWrapperArgs

| Type | Type |
| ---------- | ---------- |
| `TGetElWrapperArgs` | `Parameters<typeof getElWrapper>` |

### TGetElWrapperReturn

| Type | Type |
| ---------- | ---------- |
| `TGetElWrapperReturn` | `ReturnType<typeof getElWrapper>` |

### TGetHTMLFromStrArgs

| Type | Type |
| ---------- | ---------- |
| `TGetHTMLFromStrArgs` | `Parameters<typeof getHTMLFromStr>` |

### TGetHTMLFromStrReturn

| Type | Type |
| ---------- | ---------- |
| `TGetHTMLFromStrReturn` | `ReturnType<typeof getHTMLFromStr>` |

### TGetIndexOfElArgs

| Type | Type |
| ---------- | ---------- |
| `TGetIndexOfElArgs` | `Parameters<typeof getIndexOfEl>` |

### TGetIndexOfElReturn

| Type | Type |
| ---------- | ---------- |
| `TGetIndexOfElReturn` | `ReturnType<typeof getIndexOfEl>` |

### TIsNodeArgs

| Type | Type |
| ---------- | ---------- |
| `TIsNodeArgs` | `Parameters<typeof isNode>` |

### TIsNodeReturn

| Type | Type |
| ---------- | ---------- |
| `TIsNodeReturn` | `ReturnType<typeof isNode>` |

### TRemoveChildNodesArgs

| Type | Type |
| ---------- | ---------- |
| `TRemoveChildNodesArgs` | `Parameters<typeof removeChildNodes>` |

### TRemoveChildNodesReturn

| Type | Type |
| ---------- | ---------- |
| `TRemoveChildNodesReturn` | `ReturnType<typeof removeChildNodes>` |
