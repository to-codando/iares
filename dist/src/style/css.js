var M=Object.defineProperty;var n=(s,r)=>M(s,"name",{value:r,configurable:!0});var S=n((s,r)=>{let e=5381;for(let l=0;l<s.length;l++)e=e*33^s.charCodeAt(l);return`${r}-${(e>>>0).toString(36)}`},"createHash");var P=n(({style:s,selector:r})=>{let e=s.split(`
`),l=/^\s*([\w-]+)\s*:\s*[^;]+;/,u={insideBlock:0,globalRules:"",result:""},c=n((t,o,d)=>({globalRules:"",result:`${o}${d} {
${t}}

`}),"processGlobalRules"),a=n((t,o)=>({globalRules:"",result:`${o}${t}
`}),"processRegularLine"),m=n((t,o)=>({globalRules:`${o}${t}
`,result:""}),"addGlobalRule"),g=n(t=>{let o=(t.match(/{/g)||[]).length,d=(t.match(/}/g)||[]).length;return o-d},"countBlocks"),i=n((t,o)=>{if(t.insideBlock+=g(o),t.insideBlock===0&&l.test(o)){let{globalRules:$,result:R}=m(o,t.globalRules);return{...t,globalRules:$,result:t.result+R}}if(t.globalRules){let{globalRules:$,result:R}=c(t.globalRules,t.result,r),H=a(o,"");return{...t,globalRules:$,result:R+H.result}}let{globalRules:d,result:E}=a(o,t.result);return{...t,globalRules:d,result:E}},"processLine"),{result:y,globalRules:p}=e.reduce(i,u);return p?`${y}${r} {
${p}}
`.trim():y.trim()},"wrapLooseRulesOutsideMediaQuery"),w=n(({style:s,selector:r})=>{let e=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g,l=/^\s*([\w-]+)\s*:\s*[^;]+;/;return s.replace(e,(u,c,a)=>{let g=a.trim().split(`
`).map(i=>i.trim()).filter(i=>i).filter(i=>l.test(i)).map(i=>`${r} {
${i.trim()}
}`).join(`
`);return`@media ${c.trim()} {
${g}
}`})},"wrapLooseRulesInsideMediaQuery"),A=n(({style:s,selector:r})=>{let e=/\.(\w+)/g;return s.replace(e,`.${r}_$1`)},"applyClassNameScope"),f=n((s,r)=>{let e=s,l=`.${r}`;return e=A({style:e,selector:r}),e=P({style:e,selector:l}),e=w({style:e,selector:l}),e},"transformStyle");var h=new Map,b=n(s=>{let r=h.get(s);if(r!==void 0)return r;let e=document.createElement("style");return e.setAttribute("data-component",s),document.head.appendChild(e),h.set(s,e),e},"createStyleElement");var L=new Map,v=n((s,r=()=>{})=>(e,...l)=>{let u=e.reduce((i,y,p)=>`${i}${y}${l[p]!==void 0?l[p]:""}`,""),c=L.get(u);if(c!==void 0)return c;let a=S(u,s),m=f(u,`${a}`),g=b(`${a}`);return r({hashId:a,scopedStyle:m,styleElement:g}),g.innerHTML.includes(m)||(g.innerHTML+=m),L.set(u,a),a},"css");export{v as css};
//# sourceMappingURL=css.js.map
