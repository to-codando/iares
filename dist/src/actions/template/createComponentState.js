var m=Object.defineProperty;var t=(r,e)=>m(r,"name",{value:e,configurable:!0});var o=t(r=>{let e=JSON.parse(JSON.stringify(r)),n=new Set,s=t(a=>{for(let l of n)l(a)},"_notifyHandlers");return{set:t(a=>{Object.assign(e,JSON.parse(JSON.stringify(a))),s(JSON.parse(JSON.stringify(e)))},"set"),get:t(()=>JSON.parse(JSON.stringify(e)),"get"),watch:t(a=>{n.add(a)},"watch")}},"createState");var N=t(({type:r,props:e,children:n},s)=>()=>{o(null).watch(p=>{console.log(p)})},"createComponentState");export{N as createComponentState};
//# sourceMappingURL=createComponentState.js.map
