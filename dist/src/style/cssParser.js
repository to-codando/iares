var o=Object.defineProperty;var s=(t,r)=>o(t,"name",{value:r,configurable:!0});var S=s(t=>{let r=5381;for(let n=0;n<t.length;n++)r=r*33^t.charCodeAt(n);return`css-${(r>>>0).toString(36)}`},"createScopeStyle"),g=s((t,r)=>{let n=t;return n=n.replace(/&/g,`.${r}`),n.replace(/(?:^|\})([^{]+;)/g,(c,e)=>`.${r} {${e.trim()}}`).replace(/([^{]+\{)/g,(c,e)=>e.includes("@")?c:`${e.includes(r)?e:`.${r} ${e.trim()}`} `)},"processCSS"),d=s((t,r)=>{let n=/(@media[^{]+\{)([\s\S]+?})\s*}/g,i=t,c=[],e;for(e=n.exec(t);e!==null;){if(e){let p=g(e[2].trim(),r);c.push(`${e[1]}
  ${p}
}`),i=i.replace(e[0],"")}e=n.exec(t)}return i=g(i.trim(),r),`${i}
${c.join(`
`)}`.trim()},"transpile");export{S as createScopeStyle,d as transpile};
//# sourceMappingURL=cssParser.js.map
