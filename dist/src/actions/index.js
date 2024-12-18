var z=Object.defineProperty;var s=(e,t)=>z(e,"name",{value:t,configurable:!0});var E=s(()=>{let e=new Set;return{add:s(r=>{e.add(r)},"add"),execute:s(()=>{for(let{action:r,validator:i}of e)i()&&r()},"execute")}},"createChain");var D=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmouseout","onmousemove","onmouseenter","onmouseleave","oncontextmenu","onkeydown","onkeyup","onkeypress","onfocus","onblur","onsubmit","onchange","oninput","onreset","oninvalid","onplay","onpause","onended","onvolumechange","ontouchstart","ontouchmove","ontouchend","ontouchcancel","onanimationstart","onanimationend","onanimationiteration","ontransitionend","onload","onerror","onresize","onscroll"];var N=s(e=>()=>!!e&&!Array.isArray(e)&&typeof e=="object","isObject"),k=s(e=>()=>!!e&&Array.isArray(e),"isArray"),C=s(e=>()=>!!e&&typeof e=="function","isFunction"),$=s(e=>()=>typeof e=="string","isString"),P=s(e=>()=>typeof e!="string"?!1:D.includes(e.toLowerCase()),"isEventName"),R=s(e=>()=>typeof e=="string"||typeof e=="number","isTemplateData");var j=s((e,t,n={})=>()=>{let r=E();r.add({validator:$(e.type),action:w(e,t,n)}),r.add({validator:C(e.type),action:v(e,t,n)}),r.execute()},"renderTemplateObject");var f=s((e,t=document.body,n={})=>{let r=E(),i=t||document.querySelector("body");return r.add({validator:k(e),action:M(e,i,n)}),r.add({validator:N(e),action:j(e,i,n)}),r.add({validator:R(e),action:O(e,i,n)}),r.execute(),i},"render");var M=s((e,t,n={})=>()=>{for(let r of e)f(r,t,n)},"renderTemplateArray");var T=s((e,t,n={})=>{if(t.innerHTML="",!Array.isArray(e)&&typeof e=="object"){f(e,t,n);return}for(let r of e)f(r,t,n)},"renderChildren");var F=s(e=>{let t=JSON.parse(JSON.stringify(e)),n=new Set,r=s(c=>{for(let l of n)l(c)},"_notifyHandlers");return{set:s(c=>{Object.assign(t,JSON.parse(JSON.stringify(c))),r(JSON.parse(JSON.stringify(t)))},"set"),get:s(()=>JSON.parse(JSON.stringify(t)),"get"),watch:s(c=>{n.add(c)},"watch")}},"createState");var q=s(function(e,t,n,r){var i;t[0]=0;for(var o=1;o<t.length;o++){var a=t[o++],c=t[o]?(t[0]|=a?1:2,n[t[o++]]):t[++o];a===3?r[0]=c:a===4?r[1]=Object.assign(r[1]||{},c):a===5?(r[1]=r[1]||{})[t[++o]]=c:a===6?r[1][t[++o]]+=c+"":a?(i=e.apply(c,q(e,c,n,["",null])),r.push(i),c[0]?t[0]|=2:(t[o-2]=0,t[o]=i)):r.push(c)}return r},"n"),I=new Map;function _(e){var t=I.get(this);return t||(t=new Map,I.set(this,t)),(t=q(this,t.get(e)||(t.set(e,t=function(n){for(var r,i,o=1,a="",c="",l=[0],p=function(m){o===1&&(m||(a=a.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?l.push(0,m,a):o===3&&(m||a)?(l.push(3,m,a),o=2):o===2&&a==="..."&&m?l.push(4,m,0):o===2&&a&&!m?l.push(5,0,!0,a):o>=5&&((a||!m&&o===5)&&(l.push(o,0,a,i),o=6),m&&(l.push(o,m,0,i),o=6)),a=""},u=0;u<n.length;u++){u&&(o===1&&p(),p(u));for(var g=0;g<n[u].length;g++)r=n[u][g],o===1?r==="<"?(p(),l=[l],o=3):a+=r:o===4?a==="--"&&r===">"?(o=1,a=""):a=r+a[0]:c?r===c?c="":a+=r:r==='"'||r==="'"?c=r:r===">"?(p(),o=1):o&&(r==="="?(o=5,i=a,a=""):r==="/"&&(o<5||n[u][g+1]===">")?(p(),o===3&&(l=l[0]),o=l,(l=l[0]).push(2,0,o),o=0):r===" "||r==="	"||r===`
`||r==="\r"?(p(),o=2):a+=r),o===3&&a==="!--"&&(o=4,l=l[0])}return p(),l}(e)),t),arguments,[])).length>1?t:t[0]}s(_,"default");var V=s((e,t,...n)=>({type:e,props:t,children:n}),"hypertext"),d=_.bind(V);var B=s((e,t)=>{let n=5381;for(let r=0;r<e.length;r++)n=n*33^e.charCodeAt(r);return`${t}-${(n>>>0).toString(36)}`},"createHash");var K=new Map,J=s(e=>{let t=K.get(e);if(t!==void 0)return t;let n=document.createElement("style");return n.setAttribute("data-component",e),document.head.appendChild(n),K.set(e,n),n},"createStyleElement");var Z=s(({style:e,selector:t})=>{let n=e.split(`
`),r=/^\s*([\w-]+)\s*:\s*[^;]+;/,i={insideBlock:0,globalRules:"",result:""},o=s((m,y,S)=>({globalRules:"",result:`${y}${S} {
${m}}

`}),"processGlobalRules"),a=s((m,y)=>({globalRules:"",result:`${y}${m}
`}),"processRegularLine"),c=s((m,y)=>({globalRules:`${y}${m}
`,result:""}),"addGlobalRule"),l=s(m=>{let y=(m.match(/{/g)||[]).length,S=(m.match(/}/g)||[]).length;return y-S},"countBlocks"),p=s((m,y)=>{if(m.insideBlock+=l(y),m.insideBlock===0&&r.test(y)){let{globalRules:b,result:x}=c(y,m.globalRules);return{...m,globalRules:b,result:m.result+x}}if(m.globalRules){let{globalRules:b,result:x}=o(m.globalRules,m.result,t),L=a(y,"");return{...m,globalRules:b,result:x+L.result}}let{globalRules:S,result:H}=a(y,m.result);return{...m,globalRules:S,result:H}},"processLine"),{result:u,globalRules:g}=n.reduce(p,i);return g?`${u}${t} {
${g}}
`.trim():u.trim()},"wrapLooseRulesOutsideMediaQuery"),Y=s(({style:e,selector:t})=>{let n=/@media\s*([^{]+)\s*\{([\s\S]*?)\}/g,r=/^\s*([\w-]+)\s*:\s*[^;]+;/;return e.replace(n,(i,o,a)=>{let l=a.trim().split(`
`).map(p=>p.trim()).filter(p=>p).filter(p=>r.test(p)).map(p=>`${t} {
${p.trim()}
}`).join(`
`);return`@media ${o.trim()} {
${l}
}`})},"wrapLooseRulesInsideMediaQuery"),ee=s(({style:e,selector:t})=>{let n=/\.(\w+)/g;return e.replace(n,`.${t}_$1`)},"applyClassNameScope"),W=s((e,t)=>{let n=e,r=`.${t}`;return n=ee({style:n,selector:t}),n=Z({style:n,selector:r}),n=Y({style:n,selector:r}),n},"transformStyle");var X=new Map,G=s((e,t=()=>{})=>(n,...r)=>{let i=n.reduce((p,u,g)=>`${p}${u}${r[g]!==void 0?r[g]:""}`,""),o=X.get(i);if(o!==void 0)return o;let a=B(i,e),c=W(i,`${a}`),l=J(`${a}`);return t({hashId:a,scopedStyle:c,styleElement:l}),l.innerHTML.includes(c)||(l.innerHTML+=c),X.set(i,a),a},"css");var h=s((e,t)=>{let n=t?Object.keys(t):[];for(let r of n)if(!P(r)())e.setAttribute(r,t[r]);else{let i=r.replace(/on/,"").toLowerCase(),o=t[r];e.addEventListener(i,o)}return e},"setElementAttributes");var Q={},te=s(e=>e.name.split(/(?=[A-Z])/).join("-").toLowerCase(),"_createTagByFactoryName"),re=s(e=>{let t={};return{currentState:t,useState:s(r=>{let i=e.get();return e.set({...r,...i}),Object.assign(t,e.get()),{get:e.get,set:e.set,watch:e.watch}},"useState")}},"_createUseState"),ne=s(({props:e,state:t,css:n})=>{let r={};return{styles:r,useStyle:s(o=>{let a=o(),c={};for(let l in a){let p=a[l],u=p({props:e,state:t,css:n});c[l]=u}return Object.assign(r,c),c},"useStyle")}},"_createUseStyle"),se=s(e=>s((n,r)=>n(e,r),"useTemplate"),"_createUseTemplate"),oe=s(({props:e,state:t})=>{let n={};return{actions:n,useAction:s(i=>{let o=i({props:e,state:t});Object.assign(n,o)},"useAction")}},"_createUseAction"),v=s((e,t,n={})=>()=>{let r=e.type,i=te(r),o=i.toLowerCase(),a=document.createElement(i),c=e.props,l=JSON.parse(JSON.stringify(n)),p=F(l),{currentState:u,useState:g}=re(p),m=G(o,({hashId:A})=>{a.classList.add(A),Object.assign(Q,{class:A})}),{styles:y,useStyle:S}=ne({props:c,state:u,css:m}),{actions:H,useAction:b}=oe({props:c,state:p}),x=se({props:c,state:u,html:d,jsx:d,tsx:d,styles:y,actions:H}),L=r({props:c,useState:g,useStyle:S,useTemplate:x,useAction:b}),U=t.querySelector(o);h(a,Q),U?U.replaceWith(a):t.insertAdjacentElement("beforeend",a),T(L,a,u),p.watch(A=>{a.innerHTML="",f(e,t,A)})},"createElementByFactoryName");var w=s((e,t,n={})=>()=>{let r=e.type,i=r.toLowerCase(),o=document.createElement(r),a=t.getAttribute("class"),c=e?.props?.class;if(c&&!c.includes(a)){let l=`${a}_${c}`;h(o,{class:l}),t.insertAdjacentElement("beforeend",o),T(e.children,o,n);return}h(o,e.props),t.insertAdjacentElement("beforeend",o),T(e.children,o,n)},"createElementByTagName");var O=s((e,t,n={})=>()=>{if(typeof e=="string"&&t.insertAdjacentHTML("beforeend",e),typeof e=="number"){let i=Number(e).toString();t.insertAdjacentHTML("beforeend",i)}},"renderTemplateData");export{v as createElementByFactoryName,w as createElementByTagName,T as renderChildren,M as renderTemplateArray,O as renderTemplateData,j as renderTemplateObject,h as setElementAttributes};
//# sourceMappingURL=index.js.map
