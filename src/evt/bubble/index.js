import ow from "ow";
import { getDocument } from "ssr-window";
import { isNode } from "../../dom/isNode/index.js";

/**
 * Creates a custom event that bubbles up through the DOM
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @param name{String} - name of CustomEvent
 * @param detail{*=} - detail field of CustomEvent
 * @param params{Object=} - other params of CustomEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 * @example
 * // How to create custom event with user data and bubble it on document element?
 * bubble(document, "myEvent", { myData: "test" })
 *
 * // How to create custom event and bubble it on specific node?
 * const myEl = document.querySelector("#myElement");
 * if(myEl) {
 *   bubble(myEl, "myEvent")
 * }
 *
 * // How to listen custom events? Use your listener before calling of bubble function.
 * document.addEventListener("myEvent", (e) => console.log(e));
 */
const bubble = (el = getDocument(), name, detail, params = {}) => {

  ow(el, ow.object.validate(value => ({
    validator: isNode(value),
    message: () => `The object must be node`
  })));

  ow(name, ow.string.not.empty);
  ow(params, ow.optional.object);

  const eventParams = {
    cancelable: true,
    bubbles: true,
    detail,
    ...params,
  };

  if (typeof dispatchEvent === "function" && typeof CustomEvent === "function") {
    const event = new CustomEvent(name, eventParams);
    el?.dispatchEvent(event);
  }

};

export {
  bubble
};
