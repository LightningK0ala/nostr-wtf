import{S as K,i as Q,s as $,k as y,q as L,a as D,y as ee,l as g,m as w,r as B,h,c as N,z as te,n as k,b as M,D as c,W as O,A as le,E as j,g as re,d as se,B as ne,X as J,e as X,Y as ae,V as oe,Z as ie,u as ce,M as ue}from"../chunks/index.02426bf5.js";import{C as fe,n as S,c as pe}from"../chunks/nostr.1ab9abbf.js";import{t as Y}from"../chunks/stores.9a775d54.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.e89bc69d.js";function Z(a,s,e){const n=a.slice();return n[14]=s[e],n}function de(a){let s,e,n,f,p=a[2],t=[];for(let l=0;l<p.length;l+=1)t[l]=G(Z(a,p,l));return{c(){s=y("h3"),e=L("Result"),n=D();for(let l=0;l<t.length;l+=1)t[l].c();f=X()},l(l){s=g(l,"H3",{});var i=w(s);e=B(i,"Result"),i.forEach(h),n=N(l);for(let r=0;r<t.length;r+=1)t[r].l(l);f=X()},m(l,i){M(l,s,i),c(s,e),M(l,n,i);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(l,i);M(l,f,i)},p(l,i){if(i&37){p=l[2];let r;for(r=0;r<p.length;r+=1){const _=Z(l,p,r);t[r]?t[r].p(_,i):(t[r]=G(_),t[r].c(),t[r].m(f.parentNode,f))}for(;r<t.length;r+=1)t[r].d(1);t.length=p.length}},d(l){l&&h(s),l&&h(n),ae(t,l),l&&h(f)}}}function he(a){let s;return{c(){s=L("Error 😢")},l(e){s=B(e,"Error 😢")},m(e,n){M(e,s,n)},p:oe,d(e){e&&h(s)}}}function G(a){let s,e,n,f=a[14]+"",p,t,l=a[0].includes(a[14])?"Copied":"Copy",i,r,_,C,E,m;function V(){return a[7](a[14])}return{c(){s=y("div"),e=y("div"),n=y("div"),p=D(),t=y("button"),i=L(l),C=D(),this.h()},l(v){s=g(v,"DIV",{class:!0});var o=w(s);e=g(o,"DIV",{class:!0});var u=w(e);n=g(u,"DIV",{class:!0});var P=w(n);P.forEach(h),u.forEach(h),p=N(o),t=g(o,"BUTTON",{type:!0,class:!0});var W=w(t);i=B(W,l),W.forEach(h),C=N(o),o.forEach(h),this.h()},h(){k(n,"class","p-5 select-all break-all"),k(e,"class","card flex-1"),k(t,"type","button"),k(t,"class","btn variant-filled-primary"),t.disabled=r=a[0].includes(a[14]),k(s,"class","flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0")},m(v,o){M(v,s,o),c(s,e),c(e,n),n.innerHTML=f,c(s,p),c(s,t),c(t,i),c(s,C),E||(m=[j(t,"click",V),ie(_=pe.call(null,t,a[14]))],E=!0)},p(v,o){a=v,o&4&&f!==(f=a[14]+"")&&(n.innerHTML=f),o&5&&l!==(l=a[0].includes(a[14])?"Copied":"Copy")&&ce(i,l),o&5&&r!==(r=a[0].includes(a[14]))&&(t.disabled=r),_&&ue(_.update)&&o&4&&_.update.call(null,a[14])},d(v){v&&h(s),E=!1,J(m)}}}function _e(a){let s,e,n,f,p,t,l,i,r,_,C,E,m,V,v,o,u,P,W,q;function x(d,I){if(d[1])return he;if(d[2].length>0)return de}let H=x(a),b=H&&H(a);return u=new fe({}),{c(){s=y("div"),e=y("div"),n=y("h1"),f=L("Nostr WTF"),p=D(),t=y("p"),l=L("Convert your nostr keys between hex, npub and nprofile formats. 🔑 🔁 🗝️"),i=D(),r=y("p"),_=L("Note that converting into nprofile doesn't include relays."),C=D(),E=y("label"),m=y("input"),V=D(),b&&b.c(),v=D(),o=y("div"),ee(u.$$.fragment),this.h()},l(d){s=g(d,"DIV",{class:!0});var I=w(s);e=g(I,"DIV",{class:!0});var T=w(e);n=g(T,"H1",{class:!0});var A=w(n);f=B(A,"Nostr WTF"),A.forEach(h),p=N(T),t=g(T,"P",{});var F=w(t);l=B(F,"Convert your nostr keys between hex, npub and nprofile formats. 🔑 🔁 🗝️"),F.forEach(h),i=N(T),r=g(T,"P",{});var R=w(r);_=B(R,"Note that converting into nprofile doesn't include relays."),R.forEach(h),C=N(T),E=g(T,"LABEL",{class:!0});var U=w(E);m=g(U,"INPUT",{class:!0,type:!0,placeholder:!0}),U.forEach(h),V=N(T),b&&b.l(T),T.forEach(h),v=N(I),o=g(I,"DIV",{class:!0});var z=w(o);te(u.$$.fragment,z),z.forEach(h),I.forEach(h),this.h()},h(){k(n,"class","gradient-heading"),k(m,"class","input text-center w-full"),k(m,"type","text"),k(m,"placeholder","Paste hex, npub or nprofile key here"),k(E,"class","label mt-2"),k(e,"class","flex-1 space-y-5 w-full max-w-[800px]"),k(o,"class","flex flex-col text-center p-5 mt-5"),k(s,"class","flex flex-col h-screen w-screen sm:items-center sm:justify-center p-5")},m(d,I){M(d,s,I),c(s,e),c(e,n),c(n,f),c(e,p),c(e,t),c(t,l),c(e,i),c(e,r),c(r,_),c(e,C),c(e,E),c(E,m),O(m,a[3]),c(e,V),b&&b.m(e,null),c(s,v),c(s,o),le(u,o,null),P=!0,W||(q=[j(m,"input",a[6]),j(m,"input",a[4])],W=!0)},p(d,[I]){I&8&&m.value!==d[3]&&O(m,d[3]),H===(H=x(d))&&b?b.p(d,I):(b&&b.d(1),b=H&&H(d),b&&(b.c(),b.m(e,null)))},i(d){P||(re(u.$$.fragment,d),P=!0)},o(d){se(u.$$.fragment,d),P=!1},d(d){d&&h(s),b&&b.d(),ne(u),W=!1,J(q)}}}function me(a,s,e){let n,f,p,t,l,i,r,_;function C(o){try{return S.decode(o).data}catch(u){return e(1,_=!0),Y.trigger({message:"Error decoding key",background:"variant-filled-error"}),console.error(u),""}}function E(){var o;if(e(1,_=!1),e(2,t=[]),n.length!==0)try{switch(!0){case n.startsWith("npub"):f=C(n),t.push(f);break;case n.startsWith("nprofile"):const u=C(n);t.push(u.pubkey),u.relays&&t.push((o=u.relays)==null?void 0:o.join(`
`));break;default:p=S.npubEncode(n),l=S.nprofileEncode({pubkey:n,relays:i}),t.push(p),t.push(l);break}}catch(u){e(1,_=!0),console.error(u),Y.trigger({message:"Error converting pubkey",background:"variant-filled-warning"})}}function m(o){e(0,r=[...r,o]),setTimeout(()=>{e(0,r=r.filter(u=>u!==o))},1e3)}function V(){n=this.value,e(3,n)}const v=o=>m(o);return e(3,n=""),f="",p="",e(2,t=["82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2"]),l="",i=[],e(0,r=[]),e(1,_=!1),[r,_,t,n,E,m,V,v]}class ke extends K{constructor(s){super(),Q(this,s,me,_e,$,{})}}export{ke as default};