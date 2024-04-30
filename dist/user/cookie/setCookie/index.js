import ow from"ow";import{getDocument}from"ssr-window";
/**
 * Sets the Cookie value
 * @param name{String} - name of Cookie
 * @param value{String} - value of Cookie
 * @param options{Object=} - options of Cookie
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to set Cookie for one day or other time?
 * setCookie("myCookie", "value", { expires: 86400 }) // expires in sec
 */const setCookie=(name,value,options={})=>{ow(name,ow.string);ow(value,ow.string);ow(options,ow.object);let expires=options.expires;if(typeof expires==="number"&&!!expires){const d=new Date;d.setTime(d.getTime()+expires*1000);expires=options.expires=d}if(expires&&expires.toUTCString)options.expires=expires.toUTCString();value=encodeURIComponent(value);let updatedCookie=name+"="+value;for(let propName in options){updatedCookie+="; "+propName;let propValue=options[propName];if(propValue!==true)updatedCookie+="="+propValue}getDocument().cookie=updatedCookie};export{setCookie};
//# sourceMappingURL=index.js.map
