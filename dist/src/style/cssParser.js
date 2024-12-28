var P=Object.defineProperty;var l=(n,r)=>P(n,"name",{value:r,configurable:!0});var S=l(({style:n,selector:r})=>{let t=n.split(`
`),i=/^\s*([\w-]+)\s*:\s*[^;]+;/,R={insideBlock:0,globalRules:"",result:""},a=l((s,e,u)=>({globalRules:"",result:`${e}${u} {
${s}}

`}),"processGlobalRules"),g=l((s,e)=>({globalRules:"",result:`${e}${s}
`}),"processRegularLine"),b=l((s,e)=>({globalRules:`${e}${s}
`,result:""}),"addGlobalRule"),c=l(s=>{let e=(s.match(/{/g)||[]).length,u=(s.match(/}/g)||[]).length;return e-u},"countBlocks"),o=l((s,e)=>{if(s.insideBlock+=c(e),s.insideBlock===0&&i.test(e)){let{globalRules:m,result:p}=b(e,s.globalRules);return{...s,globalRules:m,result:s.result+p}}if(s.globalRules){let{globalRules:m,result:p}=a(s.globalRules,s.result,r),L=g(e,"");return{...s,globalRules:m,result:p+L.result}}let{globalRules:u,result:y}=g(e,s.result);return{...s,globalRules:u,result:y}},"processLine"),{result:$,globalRules:d}=t.reduce(o,R);return d?`${$}${r} {
${d}}
`.trim():$.trim()},"wrapLooseRulesOutsideMediaQuery"),w=l(({style:n,selector:r})=>{let t=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g,i=/^\s*([\w-]+)\s*:\s*[^;]+;/;return n.replace(t,(R,a,g)=>{let c=g.trim().split(`
`).map(o=>o.trim()).filter(o=>o).filter(o=>i.test(o)).map(o=>`${r} {
${o.trim()}
}`).join(`
`);return`@media ${a.trim()} {
${c}
}`})},"wrapLooseRulesInsideMediaQuery"),f=l(({style:n,selector:r})=>{let t=/\.(\w+)/g;return n.replace(t,`.${r}_$1`)},"applyClassNameScope"),k=l((n,r)=>{let t=n,i=`.${r}`;return t=f({style:t,selector:r}),t=S({style:t,selector:i}),t=w({style:t,selector:i}),t},"transformStyle");export{k as transformStyle};
//# sourceMappingURL=cssParser.js.map
