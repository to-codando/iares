var P=Object.defineProperty;var n=(l,r)=>P(l,"name",{value:r,configurable:!0});var S=n(({style:l,selector:r})=>{let e=l.split(`
`),i=/^\s*([\w-]+)\s*:\s*[^;]+;/,g={insideBlock:0,globalRules:"",result:""},a=n((s,t,u)=>({globalRules:"",result:`${t}${u} {
${s}}

`}),"processGlobalRules"),c=n((s,t)=>({globalRules:"",result:`${t}${s}
`}),"processRegularLine"),m=n((s,t)=>({globalRules:`${t}${s}
`,result:""}),"addGlobalRule"),o=n(s=>{let t=(s.match(/{/g)||[]).length,u=(s.match(/}/g)||[]).length;return t-u},"countBlocks"),d=n((s,t)=>{if(s.insideBlock+=o(t),s.insideBlock===0&&i.test(t)){let{globalRules:p,result:R}=m(t,s.globalRules);return{...s,globalRules:p,result:s.result+R}}if(s.globalRules){let{globalRules:p,result:R}=a(s.globalRules,s.result,r),L=c(t,"");return{...s,globalRules:p,result:R+L.result}}let{globalRules:u,result:y}=c(t,s.result);return{...s,globalRules:u,result:y}},"processLine"),{result:b,globalRules:$}=e.reduce(d,g);return $?`${b}${r} {
${$}}
`.trim():b.trim()},"wrapLooseRulesOutsideMediaQuery"),f=n(({style:l,selector:r})=>{let e=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g;return l.replace(e,(i,g,a)=>{let m=a.trim().split(`
`).map(o=>o.trim()).filter(o=>o).map(o=>`    ${r} {
        ${o.trim()}
    }`).join(`
`);return`@media ${g.trim()} {
${m}
}`})},"wrapLooseRulesInsideMediaQuery"),h=n(({style:l,selector:r})=>{let e=/\.(\w+)/g;return l.replace(e,`.${r}_$1`)},"applyClassNameScope"),w=n((l,r)=>{let e=l,i=`.${r}`;return e=h({style:e,selector:r}),e=S({style:e,selector:i}),e=f({style:e,selector:i}),e},"transformStyle");export{w as transformStyle};
//# sourceMappingURL=cssParser.js.map
