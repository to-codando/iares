var H=Object.defineProperty;var t=(e,n)=>H(e,"name",{value:n,configurable:!0});var p=t(()=>{let e=new Set;return{add:t(r=>{e.add(r)},"add"),execute:t(()=>{for(let{action:r,validator:a}of e)a()&&r()},"execute")}},"createChain");var C=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmouseout","onmousemove","onmouseenter","onmouseleave","oncontextmenu","onkeydown","onkeyup","onkeypress","onfocus","onblur","onsubmit","onchange","oninput","onreset","oninvalid","onplay","onpause","onended","onvolumechange","ontouchstart","ontouchmove","ontouchend","ontouchcancel","onanimationstart","onanimationend","onanimationiteration","ontransitionend","onload","onerror","onresize","onscroll"];var h=t(e=>()=>!!e&&!Array.isArray(e)&&typeof e=="object","isObject"),E=t(e=>()=>!!e&&Array.isArray(e),"isArray"),x=t(e=>()=>!!e&&typeof e=="function","isFunction"),v=t(e=>()=>typeof e=="string","isString"),b=t(e=>()=>typeof e!="string"?!1:C.includes(e.toLowerCase()),"isEventName");var l=t((e,n,o={})=>()=>{let r=p();r.add({validator:v(e.type),action:d(e,n,o)}),r.add({validator:x(e.type),action:y(e,n,o)}),r.execute()},"renderTemplateObject");var S=t((e,n,o={})=>()=>{for(let r of e)c(r,n,o)},"renderTemplateArray");var i=t((e,n,o={})=>{for(let r of e)typeof r=="string"?n.innerHTML=r:c(r,n,o)},"renderChildren");var O=t(()=>Math.random().toString(36).substring(2,11),"_createUUID"),N=t(e=>{let n=JSON.parse(JSON.stringify(e)),o=new Set,r=O(),a=t(s=>{for(let T of o)T(s)},"_notifyHandlers");return{set:t(s=>{Object.assign(n,JSON.parse(JSON.stringify(s))),a(JSON.parse(JSON.stringify(n)))},"set"),get:t(()=>JSON.parse(JSON.stringify(n)),"get"),watch:t(s=>{o.add(s)},"watch")}},"createState");var M=t(e=>e.name.split(/(?=[A-Z])/).join("-").toLowerCase(),"_createTagByFactoryName"),j=t(e=>t(o=>{let r=e.get();return e.set({...o,...r}),{get:e.get,set:e.set,watch:e.watch}},"mergeState"),"_mergeState"),F=t(({props:e,state:n})=>o=>o({props:e,state:n}),"_createStyles"),y=t((e,n,o={})=>()=>{let r=e.type,a=M(r),m=document.createElement(a),u=e.props,g=JSON.parse(JSON.stringify(o)),s=N(g),T=j(s),A=F({props:u,state:s}),w=r({props:u,useState:T,useStyles:A});n.insertAdjacentElement("beforeend",m),i(w,m,g),s.watch(k=>{m.innerHTML="",c(e,m,k)})},"createElementByFactoryName");var f=t((e,n)=>{let o=n?Object.keys(n):[];for(let r of o)if(!b(r)())e.setAttribute(r,n[r]);else{let a=r.replace(/on/,"").toLowerCase(),m=n[r];e.addEventListener(a,m)}return e},"setElementAttributes");var d=t((e,n,o={})=>()=>{let r=e.type,a=document.createElement(r);f(a,e.props),n.insertAdjacentElement("beforeend",a),i(e.children,a,o)},"createElementByTagName");var c=t((e,n=document.body,o={})=>{let r=p(),a=n||document.querySelector("body");return r.add({validator:E(e),action:S(e,a,o)}),r.add({validator:h(e),action:l(e,a,o)}),r.execute(),a},"render");export{c as render};
//# sourceMappingURL=index.js.map
