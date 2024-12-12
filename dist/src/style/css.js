var f=Object.defineProperty;var i=(n,t)=>f(n,"name",{value:t,configurable:!0});var p=i(n=>{let t=5381;for(let e=0;e<n.length;e++)t=t*33^n.charCodeAt(e);return`css-${(t>>>0).toString(36)}`},"createHash");var m=i((n,t)=>{let e=n;return e=e.replace(/&/g,`.${t}`),e.replace(/(?:^|\})([^{]+;)/g,(r,s)=>`.${t} {${s.trim()}}`).replace(/([^{]+\{)/g,(r,s)=>s.includes("@")?r:`${s.includes(t)?s:`.${t} ${s.trim()}`} `)},"processCSS"),u=i((n,t)=>{let e=/(@media[^{]+\{)([\s\S]+?})\s*}/gm,l=/(@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\}\s*)*?\})/gm,r=n,s=[],a;for(;(a=l.exec(n))!==null;)a&&(s.push(a[0]),r=r.replace(a[0],""));let o=[],c;for(c=e.exec(r);c!==null;){if(c){let y=m(c[2].trim(),t);o.push(`${c[1]}
  ${y}
}`),r=r.replace(c[0],"")}c=e.exec(r)}return r=m(r.trim(),t),`${r}
${o.join(`
`)}
${s.join(`
`)}`.trim()},"transpile");var S=new Map,d=i(n=>{let t=S.get(n);if(t!==void 0)return t;let e=document.createElement("style");return e.setAttribute("data-component",n),document.head.appendChild(e),S.set(n,e),e},"createStyleElement");var h=new Map,R=i((n,...t)=>{let e=n.reduce((o,c,g)=>`${o}${c}${t[g]!==void 0?t[g]:""}`,""),l=h.get(e);if(l!==void 0)return l;let r=p(e),s=u(e,r),a=d(`component-${r}`);return a.innerHTML.includes(s)||(a.innerHTML+=s),h.set(e,r),r},"css");export{R as css};
//# sourceMappingURL=css.js.map
