var i=Object.defineProperty;var t=(n,o)=>i(n,"name",{value:o,configurable:!0});var d=t(()=>{let n=new Set;return{add:t(e=>{n.add(e)},"add"),execute:t(()=>{for(let{action:e,validator:a}of n)a()&&e()},"execute")}},"createChain");export{d as createChain};
//# sourceMappingURL=index.js.map
