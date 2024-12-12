var y=Object.defineProperty;var c=(n,t)=>y(n,"name",{value:t,configurable:!0});var l=c(n=>{let t=5381;for(let e=0;e<n.length;e++)t=t*33^n.charCodeAt(e);return`css-${(t>>>0).toString(36)}`},"createHash");var p=c((n,t)=>{let e=n;return e=e.replace(/&/g,`.${t}`),e.replace(/(?:^|\})([^{]+;)/g,(s,r)=>`.${t} {${r.trim()}}`).replace(/([^{]+\{)/g,(s,r)=>r.includes("@")?s:`${r.includes(t)?r:`.${t} ${r.trim()}`} `)},"processCSS"),g=c((n,t)=>{let e=/(@media[^{]+\{)([\s\S]+?})\s*}/g,i=n,s=[],r;for(r=e.exec(n);r!==null;){if(r){let o=p(r[2].trim(),t);s.push(`${r[1]}
  ${o}
}`),i=i.replace(r[0],"")}r=e.exec(n)}return i=p(i.trim(),t),`${i}
${s.join(`
`)}`.trim()},"transpile");var m=new Map,d=c(n=>{let t=m.get(n);if(t!==void 0)return t;let e=document.createElement("style");return e.setAttribute("data-component",n),document.head.appendChild(e),m.set(n,e),e},"createStyleElement");var u=new Map,L=c((n,...t)=>{let e=n.reduce((S,h,a)=>`${S}${h}${t[a]!==void 0?t[a]:""}`,""),i=u.get(e);if(i!==void 0)return i;let s=l(e),r=g(e,s),o=d(`component-${s}`);return o.innerHTML.includes(r)||(o.innerHTML+=r),u.set(e,s),s},"css");export{L as css};
//# sourceMappingURL=css.js.map
