var s=Object.defineProperty;var n=(e,t)=>s(e,"name",{value:t,configurable:!0});var o=n(e=>{let t=5381;for(let r=0;r<e.length;r++)t=t*33^e.charCodeAt(r);return`css-${(t>>>0).toString(36)}`},"createHash");export{o as createHash};
//# sourceMappingURL=createHash.js.map
