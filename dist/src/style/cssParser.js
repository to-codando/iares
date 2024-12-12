var S=Object.defineProperty;var l=(n,e)=>S(n,"name",{value:e,configurable:!0});var m=l(n=>{let e=5381;for(let t=0;t<n.length;t++)e=e*33^n.charCodeAt(t);return`css-${(e>>>0).toString(36)}`},"createScopeStyle"),a=l((n,e)=>{let t=n;return t=t.replace(/&/g,`.${e}`),t.replace(/(?:^|\})([^{]+;)/g,(r,i)=>`.${e} {${i.trim()}}`).replace(/([^{]+\{)/g,(r,i)=>i.includes("@")?r:`${i.includes(e)?i:`.${e} ${i.trim()}`} `)},"processCSS"),d=l((n,e)=>{let t=/(@media[^{]+\{)([\s\S]+?})\s*}/gm,g=/(@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\}\s*)*?\})/gm,r=n,i=[],c;for(;(c=g.exec(n))!==null;)c&&(i.push(c[0]),r=r.replace(c[0],""));let p=[],s;for(s=t.exec(r);s!==null;){if(s){let o=a(s[2].trim(),e);p.push(`${s[1]}
  ${o}
}`),r=r.replace(s[0],"")}s=t.exec(r)}return r=a(r.trim(),e),`${r}
${p.join(`
`)}
${i.join(`
`)}`.trim()},"transpile");export{m as createScopeStyle,d as transpile};
//# sourceMappingURL=cssParser.js.map
