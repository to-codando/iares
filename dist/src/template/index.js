var y=Object.defineProperty;var i=(s,e)=>y(s,"name",{value:e,configurable:!0});var v=i(function(s,e,l,p){var a;e[0]=0;for(var t=1;t<e.length;t++){var o=e[t++],n=e[t]?(e[0]|=o?1:2,l[e[t++]]):e[++t];o===3?p[0]=n:o===4?p[1]=Object.assign(p[1]||{},n):o===5?(p[1]=p[1]||{})[e[++t]]=n:o===6?p[1][e[++t]]+=n+"":o?(a=s.apply(n,v(s,n,l,["",null])),p.push(a),n[0]?e[0]|=2:(e[t-2]=0,e[t]=a)):p.push(n)}return p},"n"),g=new Map;function x(s){var e=g.get(this);return e||(e=new Map,g.set(this,e)),(e=v(this,e.get(s)||(e.set(s,e=function(l){for(var p,a,t=1,o="",n="",m=[0],f=function(u){t===1&&(u||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?m.push(0,u,o):t===3&&(u||o)?(m.push(3,u,o),t=2):t===2&&o==="..."&&u?m.push(4,u,0):t===2&&o&&!u?m.push(5,0,!0,o):t>=5&&((o||!u&&t===5)&&(m.push(t,0,o,a),t=6),u&&(m.push(t,u,0,a),t=6)),o=""},c=0;c<l.length;c++){c&&(t===1&&f(),f(c));for(var r=0;r<l[c].length;r++)p=l[c][r],t===1?p==="<"?(f(),m=[m],t=3):o+=p:t===4?o==="--"&&p===">"?(t=1,o=""):o=p+o[0]:n?p===n?n="":o+=p:p==='"'||p==="'"?n=p:p===">"?(f(),t=1):t&&(p==="="?(t=5,a=o,o=""):p==="/"&&(t<5||l[c][r+1]===">")?(f(),t===3&&(m=m[0]),t=m,(m=m[0]).push(2,0,t),t=0):p===" "||p==="	"||p===`
`||p==="\r"?(f(),t=2):o+=p),t===3&&o==="!--"&&(t=4,m=m[0])}return f(),m}(s)),e),arguments,[])).length>1?e:e[0]}i(x,"default");var S=i((s,e,...l)=>({type:s,props:e,children:l}),"hypertext"),T=x.bind(S);export{T as html,T as jsx,T as tsx};
//# sourceMappingURL=index.js.map
