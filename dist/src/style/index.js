var H=Object.defineProperty;var n=(s,r)=>H(s,"name",{value:r,configurable:!0});var $=n((s,r)=>{let e=5381;for(let l=0;l<s.length;l++)e=e*33^s.charCodeAt(l);return`${r}-${(e>>>0).toString(36)}`},"createHash");var b=new Map,h=n(s=>{let r=b.get(s);if(r!==void 0)return r;let e=document.createElement("style");return e.setAttribute("data-component",s),document.head.appendChild(e),b.set(s,e),e},"createStyleElement");var M=n(({style:s,selector:r})=>{let e=s.split(`
`),l=/^\s*([\w-]+)\s*:\s*[^;]+;/,g={insideBlock:0,globalRules:"",result:""},c=n((t,o,d)=>({globalRules:"",result:`${o}${d} {
${t}}

`}),"processGlobalRules"),a=n((t,o)=>({globalRules:"",result:`${o}${t}
`}),"processRegularLine"),m=n((t,o)=>({globalRules:`${o}${t}
`,result:""}),"addGlobalRule"),u=n(t=>{let o=(t.match(/{/g)||[]).length,d=(t.match(/}/g)||[]).length;return o-d},"countBlocks"),i=n((t,o)=>{if(t.insideBlock+=u(o),t.insideBlock===0&&l.test(o)){let{globalRules:f,result:S}=m(o,t.globalRules);return{...t,globalRules:f,result:t.result+S}}if(t.globalRules){let{globalRules:f,result:S}=c(t.globalRules,t.result,r),E=a(o,"");return{...t,globalRules:f,result:S+E.result}}let{globalRules:d,result:x}=a(o,t.result);return{...t,globalRules:d,result:x}},"processLine"),{result:y,globalRules:p}=e.reduce(i,g);return p?`${y}${r} {
${p}}
`.trim():y.trim()},"wrapLooseRulesOutsideMediaQuery"),P=n(({style:s,selector:r})=>{let e=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g,l=/^\s*([\w-]+)\s*:\s*[^;]+;/;return s.replace(e,(g,c,a)=>{let u=a.trim().split(`
`).map(i=>i.trim()).filter(i=>i).filter(i=>l.test(i)).map(i=>`${r} {
${i.trim()}
}`).join(`
`);return`@media ${c.trim()} {
${u}
}`})},"wrapLooseRulesInsideMediaQuery"),w=n(({style:s,selector:r})=>{let e=/\.(\w+)/g;return s.replace(e,`.${r}_$1`)},"applyClassNameScope"),R=n((s,r)=>{let e=s,l=`.${r}`;return e=w({style:e,selector:r}),e=M({style:e,selector:l}),e=P({style:e,selector:l}),e},"transformStyle");var L=new Map,T=n((s,r=()=>{})=>(e,...l)=>{let g=e.reduce((i,y,p)=>`${i}${y}${l[p]!==void 0?l[p]:""}`,""),c=L.get(g);if(c!==void 0)return c;let a=$(g,s),m=R(g,`${a}`),u=h(`${a}`);return r({hashId:a,scopedStyle:m,styleElement:u}),u.innerHTML.includes(m)||(u.innerHTML+=m),L.set(g,a),a},"css");export{$ as createHash,h as createStyleElement,T as css,R as transformStyle};
//# sourceMappingURL=index.js.map
