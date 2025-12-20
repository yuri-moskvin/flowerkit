import{getWindow}from"ssr-window";import{isTouchDevice}from"../../user/isTouchDevice/index.mjs";import{bubble}from"../bubble/index.mjs";
/**
 * Adds a device-agnostic swipe detector for an element (pointer, touch, or mouse).
 * Dispatches a "swipe" `CustomEvent` or calls the provided callback.
 *
 * @template TDetail
 * @param {Element|Document} el Target to listen for gestures
 * @param {{
 *   callback?: (detail: TDetail) => void;
 *   minDist?: number;
 *   maxDist?: number;
 *   minTime?: number;
 *   maxTime?: number;
 * }} [props={}] Swipe configuration
 * @param {boolean} [isAutoInit=true] Attach listeners immediately
 * @returns {{
 *   handler: { start: (e: Event) => void; move: (e: Event) => void; end: (e: Event) => void };
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onSwipe: el must be an Element or Document
 * @throws {TypeError} onSwipe: props must be an object
 * @throws {TypeError} onSwipe: callback must be a function if provided
 * @throws {TypeError} onSwipe: minDist/maxDist/minTime/maxTime must be finite numbers if provided
 *
 * @example
 * onSwipe(document.getElementById("box")!, { callback: ({ dir }) => console.log(dir) });
 */const onSwipe=(el,props={},isAutoInit=true)=>{if(!el||typeof el.addEventListener!=="function")throw new TypeError("onSwipe: el must be an Element or Document");if(props===null||typeof props!=="object")throw new TypeError("onSwipe: props must be an object");const{callback:callback,minDist:minDist,maxDist:maxDist,minTime:minTime,maxTime:maxTime}=props;if(typeof callback!=="undefined"&&typeof callback!=="function")throw new TypeError("onSwipe: callback must be a function if provided");for(const[k,v]of Object.entries({minDist:minDist,maxDist:maxDist,minTime:minTime,maxTime:maxTime}))if(typeof v!=="undefined"&&(typeof v!=="number"||!Number.isFinite(v)))throw new TypeError(`onSwipe: ${k} must be a finite number if provided`);const settings={minDist:60,maxDist:120,maxTime:700,minTime:50,callback:null,...props};if(settings.maxTime<settings.minTime)settings.maxTime=settings.minTime+500;if(settings.maxTime<100||settings.minTime<50){settings.maxTime=700;settings.minTime=50}const eventsUnify=e=>{const te=e;if(typeof te.changedTouches!=="undefined"&&te.changedTouches&&te.changedTouches.length)return te.changedTouches[0];return e};const isSupport={pointer:"PointerEvent"in getWindow()||"msPointerEnabled"in getWindow().navigator,touch:isTouchDevice()};const getSupportedEvents=()=>{if(isSupport.pointer)return{type:"pointer",start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel",leave:"pointerleave"};if(isSupport.touch)return{type:"touch",start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel",leave:"touchleave"};return{type:"mouse",start:"mousedown",move:"mousemove",end:"mouseup",leave:"mouseleave"}};const events=getSupportedEvents();let dir,swipeType,dist,isMouse=false,isMouseDown=false,startX=0,distX=0,startY=0,distY=0,startTime=0;const checkStart=e=>{const event=eventsUnify(e);const t=e;if(isSupport.touch&&typeof t.touches!=="undefined"&&t.touches.length!==1)return;dir="none";swipeType="none";dist=0;startX=event.pageX??e?.detail?._pageX??0;startY=event.pageY??e?.detail?._pageY??0;startTime=Date.now();if(isMouse)isMouseDown=true};const checkMove=e=>{if(isMouse&&!isMouseDown)return;const event=eventsUnify(e);distX=(event.pageX??e?.detail?._pageX??0)-startX;distY=(event.pageY??e?.detail?._pageY??0)-startY;if(Math.abs(distX)>Math.abs(distY))dir=distX<0?"left":"right";else dir=distY<0?"up":"down"};const checkEnd=e=>{if(isMouse&&!isMouseDown){isMouseDown=false;return}const endTime=Date.now();const time=endTime-startTime;if(time>=settings.minTime&&time<=settings.maxTime)if(Math.abs(distX)>=settings.minDist&&Math.abs(distY)<=settings.maxDist)swipeType=dir;else if(Math.abs(distY)>=settings.minDist&&Math.abs(distX)<=settings.maxDist)swipeType=dir;dist=dir==="left"||dir==="right"?Math.abs(distX):Math.abs(distY);const ce=e;if(ce?.detail?._swipeType)swipeType=ce.detail._swipeType;if(swipeType!=="none"&&dist>=settings.minDist){const detail={originEvent:e,dir:swipeType,dist:dist,time:time,supportedEvents:events};if(typeof settings.callback==="function")settings.callback(detail);else bubble(el,"swipe",detail,{bubbles:true,cancelable:true})}};const handler={start:e=>checkStart(e),end:e=>checkEnd(e),move:e=>checkMove(e)};if(isSupport.pointer&&!isSupport.touch||events.type==="mouse")isMouse=true;const listenerCtrl=(isBind=true)=>{const action=isBind?"addEventListener":"removeEventListener";el[action](events.start,handler.start);el[action](events.move,handler.move);el[action](events.end,handler.end);if(isSupport.pointer&&isSupport.touch)el[action]("lostpointercapture",handler.end)};const addListener=()=>{listenerCtrl(true)};const removeListener=()=>{listenerCtrl(false)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};export{onSwipe};
//# sourceMappingURL=index.mjs.map
