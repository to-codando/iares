var X=Object.defineProperty;var a=(e,t)=>X(e,"name",{value:t,configurable:!0});var g=a(()=>{let e=new Set;return{add:a(r=>{e.add(r)},"add"),execute:a(()=>{for(let{action:r,validator:c}of e)c()&&r()},"execute")}},"createChain");var _=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmouseout","onmousemove","onmouseenter","onmouseleave","oncontextmenu","onkeydown","onkeyup","onkeypress","onfocus","onblur","onsubmit","onchange","oninput","onreset","oninvalid","onplay","onpause","onended","onvolumechange","ontouchstart","ontouchmove","ontouchend","ontouchcancel","onanimationstart","onanimationend","onanimationiteration","ontransitionend","onload","onerror","onresize","onscroll"];var j=a(e=>()=>!!e&&!Array.isArray(e)&&typeof e=="object","isObject"),v=a(e=>()=>!!e&&Array.isArray(e),"isArray"),H=a(e=>()=>!!e&&typeof e=="function","isFunction"),O=a(e=>()=>typeof e=="string","isString"),C=a(e=>()=>typeof e!="string"?!1:_.includes(e.toLowerCase()),"isEventName"),M=a(e=>()=>typeof e=="string"||typeof e=="number","isTemplateData");var S=a((e,t=document.body,o={})=>{let r=g(),c=t||document.querySelector("body");return r.add({validator:v(e),action:T(e,c,o)}),r.add({validator:j(e),action:x(e,c,o)}),r.add({validator:M(e),action:h(e,c,o)}),r.execute(),c},"render");var T=a((e,t,o={})=>()=>{for(let r of e)S(r,t,o)},"renderTemplateArray");var f=a((e,t,o={})=>{if(!Array.isArray(e)&&typeof e=="object"){S(e,t,o);return}for(let r of e)S(r,t,o)},"renderChildren");var q=a(()=>Math.random().toString(36).substring(2,11),"_createUUID"),w=a(e=>{let t=JSON.parse(JSON.stringify(e)),o=new Set,r=q(),c=a(m=>{for(let p of o)p(m)},"_notifyHandlers");return{set:a(m=>{Object.assign(t,JSON.parse(JSON.stringify(m))),c(JSON.parse(JSON.stringify(t)))},"set"),get:a(()=>JSON.parse(JSON.stringify(t)),"get"),watch:a(m=>{o.add(m)},"watch")}},"createState");var J=a(function(e,t,o,r){var c;t[0]=0;for(var n=1;n<t.length;n++){var s=t[n++],i=t[n]?(t[0]|=s?1:2,o[t[n++]]):t[++n];s===3?r[0]=i:s===4?r[1]=Object.assign(r[1]||{},i):s===5?(r[1]=r[1]||{})[t[++n]]=i:s===6?r[1][t[++n]]+=i+"":s?(c=e.apply(i,J(e,i,o,["",null])),r.push(c),i[0]?t[0]|=2:(t[n-2]=0,t[n]=c)):r.push(i)}return r},"n"),P=new Map;function N(e){var t=P.get(this);return t||(t=new Map,P.set(this,t)),(t=J(this,t.get(e)||(t.set(e,t=function(o){for(var r,c,n=1,s="",i="",m=[0],p=function(l){n===1&&(l||(s=s.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?m.push(0,l,s):n===3&&(l||s)?(m.push(3,l,s),n=2):n===2&&s==="..."&&l?m.push(4,l,0):n===2&&s&&!l?m.push(5,0,!0,s):n>=5&&((s||!l&&n===5)&&(m.push(n,0,s,c),n=6),l&&(m.push(n,l,0,c),n=6)),s=""},y=0;y<o.length;y++){y&&(n===1&&p(),p(y));for(var u=0;u<o[y].length;u++)r=o[y][u],n===1?r==="<"?(p(),m=[m],n=3):s+=r:n===4?s==="--"&&r===">"?(n=1,s=""):s=r+s[0]:i?r===i?i="":s+=r:r==='"'||r==="'"?i=r:r===">"?(p(),n=1):n&&(r==="="?(n=5,c=s,s=""):r==="/"&&(n<5||o[y][u+1]===">")?(p(),n===3&&(m=m[0]),n=m,(m=m[0]).push(2,0,n),n=0):r===" "||r==="	"||r===`
`||r==="\r"?(p(),n=2):s+=r),n===3&&s==="!--"&&(n=4,m=m[0])}return p(),m}(e)),t),arguments,[])).length>1?t:t[0]}a(N,"default");var z=a((e,t,...o)=>({type:e,props:t,children:o}),"hypertext"),d=N.bind(z);var k=a(e=>{let t=5381;for(let o=0;o<e.length;o++)t=t*33^e.charCodeAt(o);return`css-${(t>>>0).toString(36)}`},"createHash");var U=new Map,L=a(e=>{let t=U.get(e);if(t!==void 0)return t;let o=document.createElement("style");return o.setAttribute("data-component",e),document.head.appendChild(o),U.set(e,o),o},"createStyleElement");var D=a((e,t)=>{let o=e;return o=o.replace(/&/g,`.${t}`),o.replace(/(?:^|\})([^{]+;)/g,(c,n)=>`.${t} {${n.trim()}}`).replace(/([^{]+\{)/g,(c,n)=>n.includes("@")?c:`${n.includes(t)?n:`.${t} ${n.trim()}`} `)},"processCSS"),$=a((e,t)=>{let o=/(@media[^{]+\{)([\s\S]+?})\s*}/g,r=e,c=[],n;for(n=o.exec(e);n!==null;){if(n){let s=D(n[2].trim(),t);c.push(`${n[1]}
  ${s}
}`),r=r.replace(n[0],"")}n=o.exec(e)}return r=D(r.trim(),t),`${r}
${c.join(`
`)}`.trim()},"transpile");var G=new Map,F=a((e,...t)=>{let o=e.reduce((i,m,p)=>`${i}${m}${t[p]!==void 0?t[p]:""}`,""),r=G.get(o);if(r!==void 0)return r;let c=k(o),n=$(o,c),s=L(`component-${c}`);return s.innerHTML.includes(n)||(s.innerHTML+=n),G.set(o,c),c},"css");var V=a(e=>e.name.split(/(?=[A-Z])/).join("-").toLowerCase(),"_createTagByFactoryName"),Z=a(e=>{let t={};return{currentState:t,useState:a(r=>{let c=e.get();return e.set({...r,...c}),Object.assign(t,e.get()),{get:e.get,set:e.set,watch:e.watch}},"useState")}},"_createUseState"),W=a(({props:e,state:t,css:o})=>{let r={};return{styles:r,useStyle:a(n=>{let s=n(),i={};for(let m in s){let p=s[m],y=p({props:e,state:t,css:o});i[m]=y}return Object.assign(r,i),i},"useStyle")}},"_createUseStyle"),Y=a(e=>a((o,r)=>o(e,r),"useTemplate"),"_createUseTemplate"),ee=a(({props:e,state:t})=>{let o={};return{actions:o,useAction:a(c=>{let n=c({props:e,state:t});Object.assign(o,n)},"useAction")}},"_createUseAction"),E=a((e,t,o={})=>()=>{let r=e.type,c=V(r),n=document.createElement(c),s=e.props,i=JSON.parse(JSON.stringify(o)),m=w(i),{currentState:p,useState:y}=Z(m),{styles:u,useStyle:l}=W({props:s,state:p,css:F}),{actions:B,useAction:I}=ee({props:s,state:m}),K=Y({props:s,state:p,html:d,jsx:d,tsx:d,styles:u,actions:B}),Q=r({props:s,useState:y,useStyle:l,useTemplate:K,useAction:I});t.insertAdjacentElement("beforeend",n),f(Q,n,p),m.watch(R=>{n.innerHTML="",S(e,n,R)})},"createElementByFactoryName");var b=a((e,t)=>{let o=t?Object.keys(t):[];for(let r of o)if(!C(r)())e.setAttribute(r,t[r]);else{let c=r.replace(/on/,"").toLowerCase(),n=t[r];e.addEventListener(c,n)}return e},"setElementAttributes");var A=a((e,t,o={})=>()=>{let r=e.type,c=document.createElement(r);b(c,e.props),t.insertAdjacentElement("beforeend",c),f(e.children,c,o)},"createElementByTagName");var h=a((e,t,o={})=>()=>{if(typeof e=="string"&&t.insertAdjacentHTML("beforeend",e),typeof e=="number"){let c=Number(e).toString();t.insertAdjacentHTML("beforeend",c)}},"renderTemplateData");var x=a((e,t,o={})=>()=>{let r=g();r.add({validator:O(e.type),action:A(e,t,o)}),r.add({validator:H(e.type),action:E(e,t,o)}),r.execute()},"renderTemplateObject");export{x as renderTemplateObject};
//# sourceMappingURL=renderTemplateObject.js.map
