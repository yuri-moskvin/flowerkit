Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");var index$1=require("../../fn/wait/index.cjs");var index=require("../../str/getId/index.cjs");
/**
 * Detects if an ad-blocker likely hides known ad-related elements.
 * Implementation detail:
 * Injects a hidden container with an "ad-like" child element
 * Measures computed style after a tick to infer blocking
 *
 * @returns {boolean} True if ad-blocking likely detected
 * @example
 * const blocked = isAdblock();
 * console.log(blocked); // => false
 */const isAdblock=()=>{const id=`adv_${index.getId()}`;const css="position: fixed; bottom: -100vh; left: -100vh; overflow: hidden; pointer-events: none;";const doc=ssrWindow.getDocument();if(!doc.getElementById(id))doc.body.insertAdjacentHTML("beforeend",`\n      <div aria-hidden="true" style="${css}" id="${id}">\n        <div style="width: 100px; height: 100px;"\n             class="ad_box ad-richmedia-overlay ads ad adsbox doubleclick ad-placement carbon-ads"></div>\n      </div>`);const block=doc.getElementById(id);const ad=block.children[0];
// Force layout and allow extensions to react
ssrWindow.getWindow().getComputedStyle(block).getPropertyValue("visibility");void index$1.wait(2000).then((()=>block?.remove()));return ssrWindow.getWindow().getComputedStyle(ad).getPropertyValue("display")==="none"};exports.isAdblock=isAdblock;
//# sourceMappingURL=index.cjs.map
