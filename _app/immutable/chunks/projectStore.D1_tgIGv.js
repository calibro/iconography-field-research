import{h as c,n as y}from"./disclose-version.C_UBWim2.js";import{a5 as h,a6 as p}from"./runtime.BeukGrTz.js";import{w as u,g as f}from"./index.Ycn51gt1.js";function O(e){c&&e.firstChild!==null&&y(e)}let l=!1;function I(){l||(l=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function L(e){if(c){var t=!1,r=()=>{if(!t){if(t=!0,e.hasAttribute("value")){var s=e.value;g(e,"value",null),e.value=s}if(e.hasAttribute("checked")){var v=e.checked;g(e,"checked",null),e.checked=v}}};e.__on_r=r,p(r),I()}}function g(e,t,r){r=r==null?null:r+"";var s=e.__attributes??(e.__attributes={});c&&(s[t]=e.getAttribute(t),t==="src"||t==="href"||t==="srcset")||s[t]!==(s[t]=r)&&(t==="loading"&&(e[h]=r),r===null?e.removeAttribute(t):e.setAttribute(t,r))}var n=[];for(var i=0;i<256;++i)n.push((i+256).toString(16).slice(1));function P(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}var a,S=new Uint8Array(16);function j(){if(!a&&(a=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!a))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(S)}var U=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const _={randomUUID:U};function x(e,t,r){if(_.randomUUID&&!t&&!e)return _.randomUUID();e=e||{};var s=e.random||(e.rng||j)();return s[6]=s[6]&15|64,s[8]=s[8]&63|128,P(s)}const o=u(localStorage.getItem("projects")?JSON.parse(localStorage.getItem("projects")):[]),d=u(null),R=u("init");d.subscribe(e=>{e&&(console.log("saving project",e),D(e))});const V=e=>{e.id=x(),e.date=new Date().toISOString(),o.update(t=>[...t,e])},C=e=>{let t=f(o).find(r=>r.id===e);A(t)},N=e=>{o.update(t=>t.filter(r=>r.id!==e.id)),m()},A=e=>{d.set(e)},T=e=>{d.update(t=>({...t,ids:e}))},B=e=>{d.update(t=>({...t,links:e}))},D=e=>{o.update(t=>{if(t.find(s=>s.id===e.id))return e.date=new Date().toISOString(),t.map(s=>s.id===e.id?e:s)}),m()},m=()=>{localStorage.setItem("projects",JSON.stringify(f(o)))};export{g as a,I as b,d as c,T as d,B as e,O as f,L as g,V as h,A as i,C as j,o as p,N as r,R as s};
