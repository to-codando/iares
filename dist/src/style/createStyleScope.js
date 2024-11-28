var c=Object.defineProperty;var n=(r,t)=>c(r,"name",{value:t,configurable:!0});var l=n(r=>r.split("}").map(t=>t.trim()).filter(t=>t.length>0),"splitIntoRules"),p=n(r=>{let[t,s]=r.split("{").map(i=>i.trim()),e=t.split(",").map(i=>i.trim()),o=s.trim();return[e,o]},"parseRule"),a=n((r,t)=>r.startsWith("&")?r.replace("&",`.${t}`):`.${t} ${r}`,"prefixSelector"),g=n((r,t)=>{let[s,e]=p(r);return`${s.map(i=>a(i,t)).join(", ")} { ${e} }
`},"scopeRule"),m=n((r,t)=>l(t).map(s=>g(s,r)).reduce((s,e)=>s+e,""),"createStyleScope");export{m as createStyleScope};
//# sourceMappingURL=createStyleScope.js.map
