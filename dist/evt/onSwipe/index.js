import ow from"ow";import{getWindow}from"ssr-window";import{isNode}from"../../dom/isNode/index.js";import{isTouchDevice}from"../../user/isTouchDevice/index.js";import{bubble}from"../bubble/index.js";
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
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @return {{ handler: Object, addListener: Function, removeListener: Function }}
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
 * // Or manually add/remove listeners:
 * const { addListener, removeListener } = onSwipe(myBlock);
 * addListener(); // adds swipe listeners manually
 * removeListener(); // removes swipe listeners manually
 */const onSwipe=(el,props={},isAutoInit=true)=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:()=>`The object must be node`}))));ow(props,ow.object.exactShape({minDist:ow.optional.number.not.infinite,maxDist:ow.optional.number.not.infinite,maxTime:ow.optional.number.not.infinite,minTime:ow.optional.number.not.infinite,callback:ow.optional.function}));ow(isAutoInit,ow.optional.boolean);const settings={minDist:60,maxDist:120,maxTime:700,minTime:50,callback:null,...props};if(settings.maxTime<settings.minTime)settings.maxTime=settings.minTime+500;if(settings.maxTime<100||settings.minTime<50){settings.maxTime=700;settings.minTime=50}const eventsUnify=e=>e.changedTouches?e.changedTouches[0]:e;const isSupport={pointer:!!("PointerEvent"in getWindow()||"msPointerEnabled"in getWindow().navigator),touch:isTouchDevice()};const getSupportedEvents=()=>{switch(true){case isSupport.pointer:return{type:"pointer",start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel",leave:"pointerleave"};case isSupport.touch:return{type:"touch",start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel",leave:"touchleave"};default:return{type:"mouse",start:"mousedown",move:"mousemove",end:"mouseup",leave:"mouseleave"}}};const events=getSupportedEvents();let dir,swipeType,dist,isMouse=false,isMouseDown=false,startX=0,distX=0,startY=0,distY=0,startTime=0;
/**
   * Pointer first touch handler
   * @param e{Event}
   * @private
   */const checkStart=e=>{const event=eventsUnify(e);if(isSupport.touch&&typeof e.touches!=="undefined"&&e.touches.length!==1)return;dir="none";swipeType="none";dist=0;startX=event.pageX||(event?.detail?._pageX??0),startY=event.pageY||(event?.detail?._pageY??0),startTime=(new Date).getTime();if(isMouse)isMouseDown=true};
/**
   * Pointer movie touch handler
   * @param e{Event}
   * @private
   */const checkMove=e=>{if(isMouse&&!isMouseDown)return;const event=eventsUnify(e);distX=(event.pageX||(event?.detail?._pageX??0))-startX;distY=(event.pageY||(event?.detail?._pageY??0))-startY;if(Math.abs(distX)>Math.abs(distY))dir=distX<0?"left":"right";else dir=distY<0?"up":"down"};
/**
   * Pointer end handler
   * @param e{Event}
   * @private
   */const checkEnd=e=>{if(isMouse&&!isMouseDown){isMouseDown=false;return}const endTime=(new Date).getTime();const time=endTime-startTime;if(time>=settings.minTime&&time<=settings.maxTime)if(Math.abs(distX)>=settings.minDist&&Math.abs(distY)<=settings.maxDist)swipeType=dir;else if(Math.abs(distY)>=settings.minDist&&Math.abs(distX)<=settings.maxDist)swipeType=dir;dist=dir==="left"||dir==="right"?Math.abs(distX):Math.abs(distY);if(e?.detail?._swipeType)swipeType=e.detail._swipeType;if(swipeType!=="none"&&dist>=settings.minDist){const detail={originEvent:e,dir:swipeType,dist:dist,time:time,supportedEvents:events};if(typeof settings.callback==="function")settings.callback(detail);else bubble(el,"swipe",detail,{bubbles:true,cancelable:true})}};const handler={start:e=>checkStart(e),end:e=>checkEnd(e),move:e=>checkMove(e)};if(isSupport.pointer&&!isSupport.touch||events.type==="mouse")isMouse=true;const listenerCtrl=(isBind=true)=>{const action=isBind?"addEventListener":"removeEventListener";el[action](events.start,handler.start);el[action](events.move,handler.move);el[action](events.end,handler.end);if(isSupport.pointer&&isSupport.touch)el[action]("lostpointercapture",handler.end)};const addListener=()=>{listenerCtrl(true)};const removeListener=()=>{listenerCtrl(false)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};export{onSwipe};
//# sourceMappingURL=index.js.map
