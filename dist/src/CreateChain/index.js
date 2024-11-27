var o=Object.defineProperty;var t=(n,a)=>o(n,"name",{value:a,configurable:!0});var d=t(()=>{let n=new Set;return{add:t(e=>{n.add(e)},"add"),execute:t(()=>{for(let{action:e,validator:i}of n)i()&&e()},"execute")}},"createChain");export{d as createChain};
//# sourceMappingURL=index.js.map
