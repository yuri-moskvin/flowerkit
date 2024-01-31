import ow from"ow";const allowedFallbacks=ow.optional.any([ow.string,ow.number,ow.boolean,ow.object,ow.function,ow.array]);const isRulesValid=ow.object.exactShape({type:ow.optional.string.not.empty,output:ow.optional.string.not.empty,getValue:ow.optional.function,fallback:allowedFallbacks});
/**
 * Gets an object with fixed keys and values
 * @param data{Object} - source data
 * @param rules{Object=} - rules for fix (see example)
 * @param fallbacks{Object=} - fallback for each type of values
 * @return {Object}
 * @example
 * // How to replace object props and values with own fallback data?
 * const uglyObjectFromAPI = {
 *   userId: 123,
 *   has_access: 0,
 *   something: "",
 *   price: "500.05",
 *   wrongPrice: "500,05",
 *   custom: []
 * };
 *
 * const niceRules =  {
 *   userId: {
 *     output: "idUser",
 *     type: "string"
 *   },
 *   has_access: {
 *     output: "isAccess",
 *     type: "boolean"
 *   },
 *   something: {
 *     output: "something",
 *     fallback: "—"
 *   },
 *   price: {
 *     output: "price",
 *     type: "number"
 *   },
 *   wrongPrice: {
 *     output: "wrongPrice",
 *     type: "number"
 *   },
 *   custom: {
 *     output: "custom",
 *     getValue: (value, fallback) => Array.isArray(value) ? "custom value" : value
 *   }
 * }
 *
 * const result = getObjWithFallbacks(uglyObjectFromAPI, niceRules);
 * console.log(result); // =>
 * // {
 * //  idUser: "123",
 * //  isAccess: false,
 * //  something: "—",
 * //  price: 500.05,
 * //  wrongPrice: 0,
 * //  custom: "custom value"
 * // }
 */const getObjWithFallbacks=(data,rules={},fallbacks={})=>{ow(data,ow.object);ow(rules,ow.object.validate((value=>({message:()=>`prop "rules" does not match schema "{ type?, output?, getValue?, fallback? }"`,validator:Object.values(value).every((item=>ow.isValid(item,isRulesValid)))}))));ow(fallbacks,ow.optional.object.exactShape({string:allowedFallbacks,number:allowedFallbacks,boolean:allowedFallbacks,object:allowedFallbacks,array:allowedFallbacks}));const placeholders={string:"",number:0,boolean:false,object:{},array:[],...fallbacks};const newItem={};Object.entries(data).forEach((([key,value])=>{const rule=rules[key];if(rule){const{getValue:getValue,fallback:fallback,output:output=key?.toString()??"",type:type=typeof value}=rule;const getFallback=type=>typeof fallback==="undefined"?placeholders[type]:fallback;const getActualValue=({type:type,value:value,isValid:isValid})=>{if(typeof value===type)return isValid(value)?value:getFallback(type);else return getFallback(type)};if(output)if(typeof getValue==="function")newItem[output]=getValue(value,getFallback(Array.isArray(value)?"array":typeof value));else switch(type){case"string":newItem[output]=getActualValue({type:type,value:value?.toString()??getFallback(type),isValid:value=>!!value.trim().length});break;case"number":newItem[output]=getActualValue({type:type,value:Number.isNaN(Number(value))||typeof value!=="number"&&Number(value)===0?getFallback(type):Number(value),isValid:value=>value!==Infinity});break;case"boolean":newItem[output]=getActualValue({type:type,value:!!value||getFallback(type),isValid:value=>!!value});break;case"array":newItem[output]=getActualValue({type:"array",value:value,isValid:value=>Array.isArray(value)});break;case"object":newItem[output]=getActualValue({type:Array.isArray(value)?"array":"object",value:value,isValid:value=>value!==null});break;default:newItem[output]=value}}else newItem[key]=value}));return newItem};export{getObjWithFallbacks};
//# sourceMappingURL=index.js.map
