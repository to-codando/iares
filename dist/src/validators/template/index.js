var r=Object.defineProperty;var o=(n,t)=>r(n,"name",{value:t,configurable:!0});var e=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmouseout","onmousemove","onmouseenter","onmouseleave","oncontextmenu","onkeydown","onkeyup","onkeypress","onfocus","onblur","onsubmit","onchange","oninput","onreset","oninvalid","onplay","onpause","onended","onvolumechange","ontouchstart","ontouchmove","ontouchend","ontouchcancel","onanimationstart","onanimationend","onanimationiteration","ontransitionend","onload","onerror","onresize","onscroll"];var a=o(n=>()=>!!n&&!Array.isArray(n)&&typeof n=="object","isObject"),p=o(n=>()=>!!n&&Array.isArray(n),"isArray"),g=o(n=>()=>!!n&&typeof n=="function","isFunction"),l=o(n=>()=>typeof n=="string","isString"),m=o(n=>()=>typeof n!="string"?!1:e.includes(n.toLowerCase()),"isEventName");export{p as isArray,m as isEventName,g as isFunction,a as isObject,l as isString};
//# sourceMappingURL=index.js.map
