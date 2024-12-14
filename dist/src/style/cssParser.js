var $=Object.defineProperty;var e=(r,s)=>$(r,"name",{value:s,configurable:!0});var w=e(r=>`css-${([...r].reduce((o,c)=>o*33^c.charCodeAt(0),5381)>>>0).toString(36)}`,"createScopeStyle"),S=e((r,s)=>e(n=>n.replace(/([^{]+\{)/g,(g,t)=>t.includes("@")?g:`${t.includes(s)?t:`.${s} ${t.trim()}`} `),"scopeSelectors")(e(n=>n.replace(/(?:^|\})([^{]+;)/g,(g,t)=>`.${s} {${t.trim()}}`),"wrapLooseRules")(e(n=>n.replace(/&/g,`.${s}`),"substituteScope")(r))),"processCSS"),Q=e((r,s)=>{let o=/(@media[^{]+\{)([\s\S]+?})\s*}/g,c=/(@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\}\s*)*?\})/g,p=e(u=>{let i=[];return[u.replace(c,d=>(i.push(d),"")),i]},"extractKeyframes"),[n,g]=p(r),t=e(u=>{let i=[];return[u.replace(o,(d,C,f)=>{let h=S(f.trim(),s);return i.push(`${C}
  ${h}
}`),""}),i]},"processMediaQueries"),[a,l]=t(n);return[S(a.trim(),s),...l,...g].filter(Boolean).join(`
`)},"transpile");export{w as createScopeStyle,Q as transpile};
//# sourceMappingURL=cssParser.js.map
