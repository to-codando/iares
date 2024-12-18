var M=Object.defineProperty;var n=(s,r)=>M(s,"name",{value:r,configurable:!0});var h=n((s,r)=>{let e=5381;for(let o=0;o<s.length;o++)e=e*33^s.charCodeAt(o);return`${r}-${(e>>>0).toString(36)}`},"createHash");var P=n(({style:s,selector:r})=>{let e=s.split(`
`),o=/^\s*([\w-]+)\s*:\s*[^;]+;/,u={insideBlock:0,globalRules:"",result:""},c=n((t,l,p)=>({globalRules:"",result:`${l}${p} {
${t}}

`}),"processGlobalRules"),a=n((t,l)=>({globalRules:"",result:`${l}${t}
`}),"processRegularLine"),g=n((t,l)=>({globalRules:`${l}${t}
`,result:""}),"addGlobalRule"),i=n(t=>{let l=(t.match(/{/g)||[]).length,p=(t.match(/}/g)||[]).length;return l-p},"countBlocks"),y=n((t,l)=>{if(t.insideBlock+=i(l),t.insideBlock===0&&o.test(l)){let{globalRules:$,result:S}=g(l,t.globalRules);return{...t,globalRules:$,result:t.result+S}}if(t.globalRules){let{globalRules:$,result:S}=c(t.globalRules,t.result,r),H=a(l,"");return{...t,globalRules:$,result:S+H.result}}let{globalRules:p,result:E}=a(l,t.result);return{...t,globalRules:p,result:E}},"processLine"),{result:d,globalRules:m}=e.reduce(y,u);return m?`${d}${r} {
${m}}
`.trim():d.trim()},"wrapLooseRulesOutsideMediaQuery"),w=n(({style:s,selector:r})=>{let e=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g;return s.replace(e,(o,u,c)=>{let g=c.trim().split(`
`).map(i=>i.trim()).filter(i=>i).map(i=>`    ${r} {
        ${i.trim()}
    }`).join(`
`);return`@media ${u.trim()} {
${g}
}`})},"wrapLooseRulesInsideMediaQuery"),A=n(({style:s,selector:r})=>{let e=/\.(\w+)/g;return s.replace(e,`.${r}_$1`)},"applyClassNameScope"),R=n((s,r)=>{let e=s,o=`.${r}`;return e=A({style:e,selector:r}),e=P({style:e,selector:o}),e=w({style:e,selector:o}),e},"transformStyle");var b=new Map,f=n(s=>{let r=b.get(s);if(r!==void 0)return r;let e=document.createElement("style");return e.setAttribute("data-component",s),document.head.appendChild(e),b.set(s,e),e},"createStyleElement");var L=new Map,v=n((s,r=()=>{})=>(e,...o)=>{let u=e.reduce((y,d,m)=>`${y}${d}${o[m]!==void 0?o[m]:""}`,""),c=L.get(u);if(c!==void 0)return c;let a=h(u,s),g=R(u,`${a}`),i=f(`${a}`);return r({hashId:a,scopedStyle:g,styleElement:i}),i.innerHTML.includes(g)||(i.innerHTML+=g),L.set(u,a),a},"css");export{v as css};
//# sourceMappingURL=css.js.map
