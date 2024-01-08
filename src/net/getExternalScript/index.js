import ow from "ow";
import { getDocument } from "ssr-window";
import { isNode } from "../../dom/isNode/index.js";

/**
 * Gets result of appending an async external script into the page
 * @param props{Object=} - options
 * @param props.isAsync{Boolean=} - `async` attribute
 * @param props.isDefer{Boolean=} - `defer` attribute
 * @param props.src{String} - script source
 * @param props.appendTo{Node|HTMLElement=} - element for script appending
 * @param props.id{String=} - ID for script
 * @param props.crossorigin{String=} - `crossorigin` attribute
 * @param props.type{String=} - `type` attribute
 * @return {Promise}
 * @example
 * // How to load external CDN script asynchronously?
 * getExternalScript({
 *    src: "https://ajax.googleapis.com/ajax/libs/d3js/7.8.5/d3.min.js",
 *    id: "d3"
 * })
 *   .then((script) => {
 *     console.log("Script is loaded");
 *   });
 */
const getExternalScript = (props = {}) => {

  ow(props, ow.object.exactShape({
    isAsync: ow.optional.boolean,
    isDefer: ow.optional.boolean,
    src: ow.string.not.empty,
    type: ow.optional.string.not.empty,
    appendTo: ow.optional.object.validate(value => ({
      validator: isNode(value),
      message: `The object must be node`
    })),
    id: ow.optional.string.not.empty,
    crossorigin: ow.optional.string.not.empty
  }));

  const {
    isAsync = true,
    isDefer = false,
    src = "",
    type,
    appendTo = getDocument().body,
    id = "",
    crossorigin
  } = props;

  return new Promise((resolve, reject) => {
    let isReady = false;
    const script = getDocument().createElement("script");
    script.src = src;
    script.async = isAsync;
    script.defer = isDefer;
    if (id) {
      script.id = id;
    }
    if (crossorigin) {
      script.crossorigin = crossorigin;
    }
    if (type) {
      script.type = type;
    }
    script.onerror = (err) => {
      reject(err);
      script.onerror = null;
    };
    script.onload = script.onreadystatechange = function () {
      if (!isReady && (!this.readyState || this.readyState === "complete")) {
        isReady = true;
        resolve(script);
        script.onload = null;
        script.onerror = null;
      }
    };
    appendTo.appendChild(script);
  });

};

export {
  getExternalScript
};
