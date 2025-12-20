type TGetExternalScriptProps = {
    isAsync?: boolean;
    isDefer?: boolean;
    src: string;
    appendTo?: Node | HTMLElement;
    id?: string;
    crossorigin?: string;
    type?: string;
};
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
export declare const getExternalScript: (props: TGetExternalScriptProps) => Promise<HTMLScriptElement>;
export {};
