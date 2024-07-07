import{getDocument,getWindow}from"ssr-window";import{wait}from"../../fn/wait/index.js";import{getId}from"../../str/getId/index.js";
/**
 * Checks if the user has adblock
 * @return {boolean}
 * @example
 * // How to detect if user has adblock in browser?
 * const isAdblock = isAdblock();
 * console.log(isAdblock); // => false
 */const isAdblock=()=>{const id=`adv_${getId()}`;const css=`position: fixed; bottom: -100vh; left: -100vh; overflow: hidden;`;if(!getDocument().getElementById(id))getDocument().body.insertAdjacentHTML("beforeend",`\n    <div aria-hidden="true" style="${css}" id="${id}">\n      <div style="width: 100px; height: 100px;" class="ad_box ad-richmedia-overlay ads ad adsbox doubleclick ad-placement carbon-ads"></div>\n    </div>`);const block=getDocument().getElementById(id);const ad=block.children[0];getWindow().getComputedStyle(block).getPropertyValue("visibility");wait(2000).then((()=>{block?.remove()}));return getWindow().getComputedStyle(ad).getPropertyValue("display")==="none"};export{isAdblock};
//# sourceMappingURL=index.js.map
