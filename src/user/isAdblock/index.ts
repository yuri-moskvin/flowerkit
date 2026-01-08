import { getDocument, getWindow } from "ssr-window";
import { wait } from "../../fn/wait/index.ts";
import { getId } from "../../str/getId/index.ts";

export type TIsAdblockArgs = Parameters<typeof isAdblock>;

export type TIsAdblockReturn = ReturnType<typeof isAdblock>;

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
 */
export const isAdblock = (): boolean => {
  const id = `adv_${getId()}`;
  const css = "position: fixed; bottom: -100vh; left: -100vh; overflow: hidden; pointer-events: none;";

  const doc = getDocument();
  if (!doc.getElementById(id)) {
    doc.body.insertAdjacentHTML("beforeend", `
      <div aria-hidden="true" style="${css}" id="${id}">
        <div style="width: 100px; height: 100px;"
             class="ad_box ad-richmedia-overlay ads ad adsbox doubleclick ad-placement carbon-ads"></div>
      </div>`);
  }

  const block = doc.getElementById(id)!;
  const ad = block.children[0] as HTMLElement;

  // Force layout and allow extensions to react
  getWindow().getComputedStyle(block).getPropertyValue("visibility");

  void wait(2000)
    .then(() => block?.remove());

  return getWindow().getComputedStyle(ad).getPropertyValue("display") === "none";
};
