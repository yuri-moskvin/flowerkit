# ⚙️ DOM utils pack API
___
## Usage
```ts
import { getElWrapper, getHTMLFromStr, getIndexOfEl, isNode, removeChildNodes } from "@web3r/flowerkit/dom";
```
___
## Functions

- [getElWrapper](#getelwrapper)
- [getHTMLFromStr](#gethtmlfromstr)
- [getIndexOfEl](#getindexofel)
- [isNode](#isnode)
- [removeChildNodes](#removechildnodes)

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


### getHTMLFromStr

Get parsed HTML from string and returns NodeList that include elements and text

| Function | Type |
| ---------- | ---------- |
| `getHTMLFromStr` | `(str?: string, type?: DOMParserSupportedType) => NodeList` |

Parameters:

* `str`: source string
* `type`: content type ("application/xhtml+xml", "application/xml", "image/svg+xml", "text/html" (by default) or "text/xml"


References:

* [https://developer.mozilla.org/en-US/docs/Web/API/DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)


Examples:

```ts
// How to get parsed HTML elements from string?
Array.from(getHTMLFromStr(`
  <p>Hello world!</p>
  <p>Hello world!</p>
`)); // returns array of two paragraph nodes
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



