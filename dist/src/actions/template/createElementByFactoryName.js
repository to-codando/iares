var K=Object.defineProperty;var o=(e,t)=>K(e,"name",{value:t,configurable:!0});var X=o(()=>Math.random().toString(36).substring(2,11),"_createUUID"),j=o(e=>{let t=JSON.parse(JSON.stringify(e)),r=new Set,n=X(),c=o(i=>{for(let p of r)p(i)},"_notifyHandlers");return{set:o(i=>{Object.assign(t,JSON.parse(JSON.stringify(i))),c(JSON.parse(JSON.stringify(t)))},"set"),get:o(()=>JSON.parse(JSON.stringify(t)),"get"),watch:o(i=>{r.add(i)},"watch")}},"createState");var g=o(()=>{let e=new Set;return{add:o(n=>{e.add(n)},"add"),execute:o(()=>{for(let{action:n,validator:c}of e)c()&&n()},"execute")}},"createChain");var L=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmouseout","onmousemove","onmouseenter","onmouseleave","oncontextmenu","onkeydown","onkeyup","onkeypress","onfocus","onblur","onsubmit","onchange","oninput","onreset","oninvalid","onplay","onpause","onended","onvolumechange","ontouchstart","ontouchmove","ontouchend","ontouchcancel","onanimationstart","onanimationend","onanimationiteration","ontransitionend","onload","onerror","onresize","onscroll"];var v=o(e=>()=>!!e&&!Array.isArray(e)&&typeof e=="object","isObject"),A=o(e=>()=>!!e&&Array.isArray(e),"isArray"),M=o(e=>()=>!!e&&typeof e=="function","isFunction"),C=o(e=>()=>typeof e=="string","isString"),O=o(e=>()=>typeof e!="string"?!1:L.includes(e.toLowerCase()),"isEventName");var T=o((e,t,r={})=>()=>{let n=g();n.add({validator:C(e.type),action:h(e,t,r)}),n.add({validator:M(e.type),action:x(e,t,r)}),n.execute()},"renderTemplateObject");var E=o((e,t,r={})=>()=>{for(let n of e)d(n,t,r)},"renderTemplateArray");var f=o((e,t,r={})=>{for(let n of e)typeof n=="string"?t.innerHTML=n:d(n,t,r)},"renderChildren");var b=o((e,t)=>{let r=t?Object.keys(t):[];for(let n of r)if(!O(n)())e.setAttribute(n,t[n]);else{let c=n.replace(/on/,"").toLowerCase(),a=t[n];e.addEventListener(c,a)}return e},"setElementAttributes");var h=o((e,t,r={})=>()=>{let n=e.type,c=document.createElement(n);b(c,e.props),t.insertAdjacentElement("beforeend",c),f(e.children,c,r)},"createElementByTagName");var d=o((e,t=document.body,r={})=>{let n=g(),c=t||document.querySelector("body");return n.add({validator:A(e),action:E(e,c,r)}),n.add({validator:v(e),action:T(e,c,r)}),n.execute(),c},"render");var _=o(function(e,t,r,n){var c;t[0]=0;for(var a=1;a<t.length;a++){var s=t[a++],m=t[a]?(t[0]|=s?1:2,r[t[a++]]):t[++a];s===3?n[0]=m:s===4?n[1]=Object.assign(n[1]||{},m):s===5?(n[1]=n[1]||{})[t[++a]]=m:s===6?n[1][t[++a]]+=m+"":s?(c=e.apply(m,_(e,m,r,["",null])),n.push(c),m[0]?t[0]|=2:(t[a-2]=0,t[a]=c)):n.push(m)}return n},"n"),P=new Map;function H(e){var t=P.get(this);return t||(t=new Map,P.set(this,t)),(t=_(this,t.get(e)||(t.set(e,t=function(r){for(var n,c,a=1,s="",m="",i=[0],p=function(y){a===1&&(y||(s=s.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(0,y,s):a===3&&(y||s)?(i.push(3,y,s),a=2):a===2&&s==="..."&&y?i.push(4,y,0):a===2&&s&&!y?i.push(5,0,!0,s):a>=5&&((s||!y&&a===5)&&(i.push(a,0,s,c),a=6),y&&(i.push(a,y,0,c),a=6)),s=""},l=0;l<r.length;l++){l&&(a===1&&p(),p(l));for(var u=0;u<r[l].length;u++)n=r[l][u],a===1?n==="<"?(p(),i=[i],a=3):s+=n:a===4?s==="--"&&n===">"?(a=1,s=""):s=n+s[0]:m?n===m?m="":s+=n:n==='"'||n==="'"?m=n:n===">"?(p(),a=1):a&&(n==="="?(a=5,c=s,s=""):n==="/"&&(a<5||r[l][u+1]===">")?(p(),a===3&&(i=i[0]),a=i,(i=i[0]).push(2,0,a),a=0):n===" "||n==="	"||n===`
`||n==="\r"?(p(),a=2):s+=n),a===3&&s==="!--"&&(a=4,i=i[0])}return p(),i}(e)),t),arguments,[])).length>1?t:t[0]}o(H,"default");var q=o((e,t,...r)=>({type:e,props:t,children:r}),"hypertext"),S=H.bind(q);var w=o(e=>{let t=5381;for(let r=0;r<e.length;r++)t=t*33^e.charCodeAt(r);return`css-${(t>>>0).toString(36)}`},"createHash");var $=new Map,N=o(e=>{let t=$.get(e);if(t!==void 0)return t;let r=document.createElement("style");return r.setAttribute("data-component",e),document.head.appendChild(r),$.set(e,r),r},"createStyleElement");var W=o(e=>e.split("}").map(t=>t.trim()).filter(t=>t.length>0),"splitIntoRules"),z=o(e=>{let t=e.split("{").map(s=>s.trim());if(t.length!==2)return console.warn(`Regra CSS inv\xE1lida omitida: "${e}"`),null;let[r,n]=t;if(!r||!n)return console.warn(`Regra CSS incompleta omitida: "${e}"`),null;let c=r.split(",").map(s=>s.trim()),a=n.trim();return[c,a]},"parseRule"),V=o((e,t)=>e.startsWith("&")?e.replace("&",`.${t}`):`.${t}${e}`,"prefixSelector"),Z=o((e,t)=>{let r=z(e);if(!r)return"";let[n,c]=r;return`${n.map(s=>s.startsWith(".")?`.${t}`:V(s,t)).join(", ")} { ${c} }
`},"scopeRule"),k=o((e,t)=>W(t).map(r=>Z(r,e)).filter(r=>r.length>0).join(""),"createStyleScope");var J=new Map,B=new Map,Q=o(()=>`component-${Math.random().toString(36).substring(2,8)}`,"generateComponentId"),F=o((e,...t)=>{let r=e.reduce((p,l,u)=>p+l+(t[u]!==void 0?t[u]:""),""),n=J.get(r);if(n!==void 0)return n;let c=w(r),a,s=B.get(c);s!==void 0?a=s:(a=Q(),B.set(c,a));let m=k(c,r),i=N(a);return i.innerHTML.includes(m)||(i.innerHTML+=m),J.set(r,c),c},"css");var Y=o(e=>e.name.split(/(?=[A-Z])/).join("-").toLowerCase(),"_createTagByFactoryName"),ee=o(e=>{let t={};return{currentState:t,useState:o(n=>{let c=e.get();return e.set({...n,...c}),Object.assign(t,e.get()),{get:e.get,set:e.set,watch:e.watch}},"useState")}},"_createUseState"),te=o(({props:e,state:t,css:r})=>{let n={};return{styles:n,useStyle:o(a=>{let s=a(),m={};for(let i in s){let p=s[i],l=p({props:e,state:t,css:r});m[i]=l}return Object.assign(n,m),m},"useStyle")}},"_createUseStyle"),ne=o(e=>o((r,n)=>r(e,n),"useTemplate"),"_createUseTemplate"),re=o(({props:e,state:t})=>{let r={};return{actions:r,useAction:o(c=>{let a=c({props:e,state:t});Object.assign(r,a)},"useAction")}},"_createUseAction"),x=o((e,t,r={})=>()=>{let n=e.type,c=Y(n),a=document.createElement(c),s=e.props,m=JSON.parse(JSON.stringify(r)),i=j(m),{currentState:p,useState:l}=ee(i),{styles:u,useStyle:y}=te({props:s,state:p,css:F}),{actions:I,useAction:U}=re({props:s,state:i}),G=ne({props:s,state:p,html:S,jsx:S,tsx:S,styles:u,actions:I}),R=n({props:s,useState:l,useStyle:y,useTemplate:G,useAction:U});t.insertAdjacentElement("beforeend",a),f(R,a,p),i.watch(D=>{a.innerHTML="",d(e,a,D)})},"createElementByFactoryName");export{x as createElementByFactoryName};
//# sourceMappingURL=createElementByFactoryName.js.map
