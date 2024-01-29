/**
 * Adds custom `swipe` event on element.
 * Works on desktop and mobile browsers.
 * Supports speed, time and direction.
 * Generates custom `swipe` event on element or uses your own callback.
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @param props{Object=} - swipe params
 * @param props.callback{Function=} - callback function after `swipe`
 * @param props.minDist{Number=} - min distance for swipe in `px`
 * @param props.maxDist{Number=} - max distance for swipe in `px`
 * @param props.minTime{Number=} - min duration of swipe in `ms`
 * @param props.maxTime{Number=} - max duration of swipe in `ms`
 * @param props.instanceName{String=} - instance name to access it from node itself
 * @example
 * // How to listen `swipe` event on element in JS?
 * // <div id="myBlock"></div>
 * const myBlock = document.getElementById("myBlock");
 * onSwipe(myBlock, {
 *   callback: ({ dist, dir, time }) => {
 *     console.log(dir, dist, time); // swipe direction, swipe distant, swipe time
 *     if(dir === "right") {
 *       // logic for right swipe
 *     }
 *   }
 * });
 * // Or with custom events:
 * onSwipe(myBlock);
 * myBlock.addEventListener("swipe", (e) => console.log(e.detail));
 *
 * // To destroy whole instance or remove listeners:
 * myBlock._swipeCtrl.destroy(); // or other name given in `options.instanceName`;
 */
export function onSwipe(el: HTMLElement | Node | Element | Document, props?: any | undefined): void;
//# sourceMappingURL=index.d.ts.map