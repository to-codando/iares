var f=Object.defineProperty;var o=(n,t)=>f(n,"name",{value:t,configurable:!0});var m=o(n=>{let t=5381;for(let e=0;e<n.length;e++)t=t*33^n.charCodeAt(e);return`css-${(t>>>0).toString(36)}`},"createHash");var S=new Map,g=o(n=>{let t=S.get(n);if(t!==void 0)return t;let e=document.createElement("style");return e.setAttribute("data-component",n),document.head.appendChild(e),S.set(n,e),e},"createStyleElement");var d=o((n,t)=>{let e=n;return e=e.replace(/&/g,`.${t}`),e.replace(/(?:^|\})([^{]+;)/g,(r,s)=>`.${t} {${s.trim()}}`).replace(/([^{]+\{)/g,(r,s)=>s.includes("@")?r:`${s.includes(t)?s:`.${t} ${s.trim()}`} `)},"processCSS"),u=o((n,t)=>{let e=/(@media[^{]+\{)([\s\S]+?})\s*}/gm,a=/(@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\}\s*)*?\})/gm,r=n,s=[],i;for(;(i=a.exec(n))!==null;)i&&(s.push(i[0]),r=r.replace(i[0],""));let l=[],c;for(c=e.exec(r);c!==null;){if(c){let h=d(c[2].trim(),t);l.push(`${c[1]}
  ${h}
}`),r=r.replace(c[0],"")}c=e.exec(r)}return r=d(r.trim(),t),`${r}
${l.join(`
`)}
${s.join(`
`)}`.trim()},"transpile");var y=new Map,x=o((n,...t)=>{let e=n.reduce((l,c,p)=>`${l}${c}${t[p]!==void 0?t[p]:""}`,""),a=y.get(e);if(a!==void 0)return a;let r=m(e),s=u(e,r),i=g(`component-${r}`);return i.innerHTML.includes(s)||(i.innerHTML+=s),y.set(e,r),r},"css");export{m as createHash,g as createStyleElement,x as css,u as transpile};
//# sourceMappingURL=index.js.map
