var u=Object.defineProperty;var o=(e,n)=>u(e,"name",{value:n,configurable:!0});var s=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmouseout","onmousemove","onmouseenter","onmouseleave","oncontextmenu","onkeydown","onkeyup","onkeypress","onfocus","onblur","onsubmit","onchange","oninput","onreset","oninvalid","onplay","onpause","onended","onvolumechange","ontouchstart","ontouchmove","ontouchend","ontouchcancel","onanimationstart","onanimationend","onanimationiteration","ontransitionend","onload","onerror","onresize","onscroll"];var r=o(e=>()=>typeof e!="string"?!1:s.includes(e.toLowerCase()),"isEventName");var M=o((e,n)=>{let i=n?Object.keys(n):[];for(let t of i)if(!r(t)())e.setAttribute(t,n[t]);else{let c=t.replace(/on/,"").toLowerCase(),a=n[t];e.addEventListener(c,a)}return e},"setElementAttributes");export{M as setElementAttributes};
//# sourceMappingURL=setElementAttributes.js.map
