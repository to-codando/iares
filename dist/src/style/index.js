var x=Object.defineProperty;var n=(s,r)=>x(s,"name",{value:r,configurable:!0});var $=n((s,r)=>{let e=5381;for(let o=0;o<s.length;o++)e=e*33^s.charCodeAt(o);return`${r}-${(e>>>0).toString(36)}`},"createHash");var b=new Map,h=n(s=>{let r=b.get(s);if(r!==void 0)return r;let e=document.createElement("style");return e.setAttribute("data-component",s),document.head.appendChild(e),b.set(s,e),e},"createStyleElement");var M=n(({style:s,selector:r})=>{let e=s.split(`
`),o=/^\s*([\w-]+)\s*:\s*[^;]+;/,g={insideBlock:0,globalRules:"",result:""},c=n((t,l,p)=>({globalRules:"",result:`${l}${p} {
${t}}

`}),"processGlobalRules"),a=n((t,l)=>({globalRules:"",result:`${l}${t}
`}),"processRegularLine"),u=n((t,l)=>({globalRules:`${l}${t}
`,result:""}),"addGlobalRule"),i=n(t=>{let l=(t.match(/{/g)||[]).length,p=(t.match(/}/g)||[]).length;return l-p},"countBlocks"),y=n((t,l)=>{if(t.insideBlock+=i(l),t.insideBlock===0&&o.test(l)){let{globalRules:f,result:S}=u(l,t.globalRules);return{...t,globalRules:f,result:t.result+S}}if(t.globalRules){let{globalRules:f,result:S}=c(t.globalRules,t.result,r),H=a(l,"");return{...t,globalRules:f,result:S+H.result}}let{globalRules:p,result:E}=a(l,t.result);return{...t,globalRules:p,result:E}},"processLine"),{result:d,globalRules:m}=e.reduce(y,g);return m?`${d}${r} {
${m}}
`.trim():d.trim()},"wrapLooseRulesOutsideMediaQuery"),P=n(({style:s,selector:r})=>{let e=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g;return s.replace(e,(o,g,c)=>{let u=c.trim().split(`
`).map(i=>i.trim()).filter(i=>i).map(i=>`    ${r} {
        ${i.trim()}
    }`).join(`
`);return`@media ${g.trim()} {
${u}
}`})},"wrapLooseRulesInsideMediaQuery"),w=n(({style:s,selector:r})=>{let e=/\.(\w+)/g;return s.replace(e,`.${r}_$1`)},"applyClassNameScope"),R=n((s,r)=>{let e=s,o=`.${r}`;return e=w({style:e,selector:r}),e=M({style:e,selector:o}),e=P({style:e,selector:o}),e},"transformStyle");var L=new Map,T=n((s,r=()=>{})=>(e,...o)=>{let g=e.reduce((y,d,m)=>`${y}${d}${o[m]!==void 0?o[m]:""}`,""),c=L.get(g);if(c!==void 0)return c;let a=$(g,s),u=R(g,`${a}`),i=h(`${a}`);return r({hashId:a,scopedStyle:u,styleElement:i}),i.innerHTML.includes(u)||(i.innerHTML+=u),L.set(g,a),a},"css");export{$ as createHash,h as createStyleElement,T as css,R as transformStyle};
//# sourceMappingURL=index.js.map
