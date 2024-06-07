import ow from"ow";
/**
 * Gets one deeply merged object from two objects
 * @param target{Object=} - target object
 * @param source{Object=} - source object
 * @param options{Object=} - merge options
 * @param options.isMergeArrays{Boolean=} - concat nested arrays or use target value
 * @return {Object}
 * @example
 * // How to deeply merge two objects?
 * const targetObj = {
 *   first: [ "foo" ],
 * }
 * const sourceObj = {
 *   first: [ "moo" ],
 *   boo: 12
 * }
 * getMergedObj(targetObj, sourceObj) // => { first: [ "foo", "moo" ], boo: 12 }
 */const getMergedObj=(target={},source={},options={})=>{ow(options,ow.object);const settings={isMergeArrays:true,...options};target=(obj=>{let cloneObj;try{cloneObj=JSON.parse(JSON.stringify(obj));
// eslint-disable-next-line no-unused-vars
}catch(err){cloneObj=Object.assign({},obj)}return cloneObj})(target);const isObject=obj=>obj&&typeof obj==="object";if(!isObject(target)||!isObject(source))return source;Object.keys(source).forEach((key=>{const targetValue=target[key];const sourceValue=source[key];switch(true){case Array.isArray(targetValue)&&Array.isArray(sourceValue):target[key]=settings.isMergeArrays?targetValue.concat(sourceValue):targetValue;break;case isObject(targetValue)&&isObject(sourceValue):target[key]=getMergedObj(Object.assign({},targetValue),sourceValue);break;default:target[key]=sourceValue}}));return target};export{getMergedObj};
//# sourceMappingURL=index.js.map
