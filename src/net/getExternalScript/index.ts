import { getDocument } from "ssr-window";

type TGetExternalScriptProps = {
  isAsync?: boolean;
  isDefer?: boolean;
  src: string;
  appendTo?: Node | HTMLElement;
  id?: string;
  crossorigin?: string;
  type?: string;
};

export type TGetExternalScriptArgs = Parameters<typeof getExternalScript>;

export type TGetExternalScriptReturn = ReturnType<typeof getExternalScript>;

/**
 * Appends an external script to the page and resolves when it's loaded.
 *
 * @param {TGetExternalScriptProps} props Options
 * @param {boolean} [props.isAsync=true] `async` attribute
 * @param {boolean} [props.isDefer=false] `defer` attribute
 * @param {string} props.src Script source URL
 * @param {Node|HTMLElement} [props.appendTo=document.body] Element to append the script to
 * @param {string} [props.id] Script element id
 * @param {string} [props.crossorigin] `crossorigin` attribute
 * @param {string} [props.type] `type` attribute
 * @returns {Promise<HTMLScriptElement>} Promise that resolves to the created script element
 * @example
 * getExternalScript({ src: "https://cdn.example.com/lib.js", id: "lib" })
 *   .then(() => console.log("Loaded"));
 */
export const getExternalScript = (props: TGetExternalScriptProps): Promise<HTMLScriptElement> => {
  const {
    isAsync = true,
    isDefer = false,
    src,
    type,
    appendTo = getDocument().body,
    id,
    crossorigin,
  } = props ?? ({} as TGetExternalScriptProps);

  if (typeof src !== "string" || !src) {
    return Promise.reject(new TypeError("getExternalScript: props.src must be a non-empty string"));
  }
  if (!!crossorigin && typeof crossorigin !== "string") {
    return Promise.reject(new TypeError("getExternalScript: props.crossorigin must be a string if provided"));
  }
  if (!appendTo || typeof (appendTo as any).appendChild !== "function") {
    return Promise.reject(new TypeError("getExternalScript: props.appendTo must be a Node/HTMLElement if provided"));
  }

  return new Promise<HTMLScriptElement>((resolve, reject) => {
    let isReady = false;
    const script = getDocument().createElement("script");
    script.src = src;
    script.async = isAsync;
    script.defer = isDefer;

    if (id) {
      script.id = id;
    }
    if (crossorigin) {
      (script as any).crossorigin = crossorigin;
    }
    if (type) {
      script.type = type;
    }

    script.onerror = (err: Event | string) => {
      reject(err);
      script.onerror = null;
    };
    script.onload = script.onreadystatechange = function (this: any): void {
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
