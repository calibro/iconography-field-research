import{b as j,i as X,H as ee,r as re,g as ae,c as $,d as F,e as te,I as ne,q as ie,h as C,s as q,j as O,k as R,m as se,l as z,n as le,o as fe,v as ue,w as G,x as ve,y as oe,S as _e,z as de}from"./runtime.BeukGrTz.js";import{h as w,k as P,l as pe,m as K,d as D,n as ge,e as ce}from"./disclose-version.C_UBWim2.js";let N=null;function ye(e,r){return r}function Ee(e,r,n){for(var s=[],v=e.length,o=0;o<v;o++)le(e[o].e,s,!0);var _=v>0&&s.length===0&&r!==null;if(_){var E=r.parentNode;ge(E),E.append(r),n.clear(),T(e[0].prev,e[v-1].next)}fe(s,()=>{for(var p=0;p<v;p++){var u=e[p];_||(n.delete(u.k),T(u.prev,u.next)),ue(u.e,!_)}})}function he(e,r,n,s,v,o=null){var _={flags:r,items:new Map,next:null},E=(r&G)!==0;if(E){var p=e;e=w?P(p.firstChild):p.appendChild(pe())}var u=null;j(()=>{var A=n(),t=X(A)?A:A==null?[]:Array.from(A),d=t.length,i=_.flags;i&R&&!oe(t)&&!(_e in t)&&(i^=R,i&de&&!(i&C)&&(i^=C));let y=!1;if(w){var g=e.data===ee;(g!==(d===0)||K===void 0)&&(re(ce),D(!1),y=!0)}if(w){for(var f=K,x=_,c,a=0;a<d;a++){if(f.nodeType!==8||f.data!==ae){y=!0,D(!1);break}f=P(f);var l=t[a],m=s(l,a);c=J(f,x,null,l,m,a,v,i),_.items.set(m,c),f=f.nextSibling,x=c}if(d>0)for(;f!==e;){var h=f.nextSibling;f.remove(),f=h}}w||xe(t,_,e,v,i,s),o!==null&&(d===0?u?$(u):u=F(()=>o(e)):u!==null&&te(u,()=>{u=null})),y&&D(!0)})}function xe(e,r,n,s,v,o){var U,M,Y,B;var _=(v&ve)!==0,E=(v&(C|O))!==0,p=e.length,u=r.items,A=r.next,t=A,d=new Set,i=r,y=new Set,g=[],f=[],x,c,a,l;if(_)for(l=0;l<p;l+=1)x=e[l],c=o(x,l),a=u.get(c),a!==void 0&&((U=a.a)==null||U.measure(),y.add(a));for(l=0;l<p;l+=1){if(x=e[l],c=o(x,l),a=u.get(c),a===void 0){var m=t?b(t.e):n;i=J(m,i,i.next,x,c,l,s,v),u.set(c,i),g=[],f=[],t=i.next;continue}if(E&&Ae(a,x,l,v),a.e.f&ne&&($(a.e),_&&((M=a.a)==null||M.unfix(),y.delete(a))),a!==t){if(d.has(a)){if(g.length<f.length){var h=f[0],S;i=h.prev;var L=g[0],H=g[g.length-1];for(S=0;S<g.length;S+=1)W(g[S],h,n);for(S=0;S<f.length;S+=1)d.delete(f[S]);T(L.prev,H.next),T(i,L),T(H,h),t=h,i=H,l-=1,g=[],f=[]}else d.delete(a),W(a,t,n),T(a.prev,a.next),T(a,i.next),T(i,a),i=a;continue}for(g=[],f=[];t!==null&&t.k!==c;)d.add(t),f.push(t),t=t.next;if(t===null)continue;a=t}g.push(a),i=a,t=a.next}const I=Array.from(d);for(;t!==null;)I.push(t),t=t.next;var k=I.length;if(k>0){var Z=v&G&&p===0?n:null;if(_){for(l=0;l<k;l+=1)(Y=I[l].a)==null||Y.measure();for(l=0;l<k;l+=1)(B=I[l].a)==null||B.fix()}Ee(I,Z,u)}_&&ie(()=>{var V;for(a of y)(V=a.a)==null||V.apply()})}function Ae(e,r,n,s){s&C&&q(e.v,r),s&O?q(e.i,n):e.i=n}function J(e,r,n,s,v,o,_,E){var p=N;try{var u=(E&C)!==0,A=(E&R)===0,t=u?A?se(s):z(s):s,d=E&O?z(o):o,i={i:d,v:t,k:v,a:null,e:null,prev:r,next:n};return r.next=i,n!==null&&(n.prev=i),N=i,i.e=F(()=>_(e,t,d)),i}finally{N=p}}function Q(e,r){if(e.nodeType===3&&e.data===""||e.nodeType===8){for(var n=r.first,s;n!==null&&(s=n.first,n.dom===null);){if(s===null)return e.previousSibling;n=s}return b(n)}return e}function b(e){var r=e.dom;return X(r)?Q(r[0],e):Q(r,e)}function W(e,r,n){for(var s=e.next?b(e.next.e):n,v=r?b(r.e):n,o=b(e.e);o!==s;){var _=o.nextSibling;v.before(o),o=_}}function T(e,r){e.next=r,r!==null&&(r.prev=e)}const Ie=e=>!!/^https:\/\/digitalbenin\.org\/catalogue\/[^/]+/.test(e),be=(e,r,n)=>{if(e.length<=r)return e;const s=e.slice(0,r-1);return s.slice(0,s.lastIndexOf(" "))+"…"},Ce=e=>`https://digitalbenin.org/catalogue/${e}`;export{Ie as a,he as e,Ce as g,ye as i,be as t};
