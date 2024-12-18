var f=Object.defineProperty;var n=(l,r)=>f(l,"name",{value:r,configurable:!0});var P=n(({style:l,selector:r})=>{let e=l.split(`
`),i=/^\s*([\w-]+)\s*:\s*[^;]+;/,R={insideBlock:0,globalRules:"",result:""},a=n((s,t,u)=>({globalRules:"",result:`${t}${u} {
${s}}

`}),"processGlobalRules"),g=n((s,t)=>({globalRules:"",result:`${t}${s}
`}),"processRegularLine"),b=n((s,t)=>({globalRules:`${t}${s}
`,result:""}),"addGlobalRule"),c=n(s=>{let t=(s.match(/{/g)||[]).length,u=(s.match(/}/g)||[]).length;return t-u},"countBlocks"),o=n((s,t)=>{if(s.insideBlock+=c(t),s.insideBlock===0&&i.test(t)){let{globalRules:m,result:p}=b(t,s.globalRules);return{...s,globalRules:m,result:s.result+p}}if(s.globalRules){let{globalRules:m,result:p}=a(s.globalRules,s.result,r),L=g(t,"");return{...s,globalRules:m,result:p+L.result}}let{globalRules:u,result:y}=g(t,s.result);return{...s,globalRules:u,result:y}},"processLine"),{result:$,globalRules:d}=e.reduce(o,R);return d?`${$}${r} {
${d}}
`.trim():$.trim()},"wrapLooseRulesOutsideMediaQuery"),S=n(({style:l,selector:r})=>{let e=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g,i=/^\s*([\w-]+)\s*:\s*[^;]+;/;return l.replace(e,(R,a,g)=>{let c=g.trim().split(`
`).map(o=>o.trim()).filter(o=>o).filter(o=>i.test(o)).map(o=>`${r} {
${o.trim()}
}`).join(`
`);return`@media ${a.trim()} {
${c}
}`})},"wrapLooseRulesInsideMediaQuery"),w=n(({style:l,selector:r})=>{let e=/\.(\w+)/g;return l.replace(e,`.${r}_$1`)},"applyClassNameScope"),k=n((l,r)=>{let e=l,i=`.${r}`;return e=w({style:e,selector:r}),e=P({style:e,selector:i}),e=S({style:e,selector:i}),e},"transformStyle");export{k as transformStyle};
//# sourceMappingURL=cssParser.js.map
