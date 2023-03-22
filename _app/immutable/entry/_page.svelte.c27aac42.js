import{S as ee,i as te,s as le,k as y,q as L,a as N,l as g,m as E,r as V,h as f,c as P,n as m,b as K,D as i,W as x,E as A,V as B,X as $,e as z,Y as re,Z as se,u as ae,M as ne}from"../chunks/index.02426bf5.js";import{t as G}from"../chunks/stores.9a775d54.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.e89bc69d.js";import{n as q,c as oe}from"../chunks/nostr.f722d3f7.js";function J(o,s,e){const a=o.slice();return a[14]=s[e],a}function ie(o){let s,e,a,u,p=o[2],t=[];for(let l=0;l<p.length;l+=1)t[l]=Q(J(o,p,l));return{c(){s=y("h3"),e=L("Result"),a=N();for(let l=0;l<t.length;l+=1)t[l].c();u=z()},l(l){s=g(l,"H3",{});var c=E(s);e=V(c,"Result"),c.forEach(f),a=P(l);for(let r=0;r<t.length;r+=1)t[r].l(l);u=z()},m(l,c){K(l,s,c),i(s,e),K(l,a,c);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(l,c);K(l,u,c)},p(l,c){if(c&37){p=l[2];let r;for(r=0;r<p.length;r+=1){const d=J(l,p,r);t[r]?t[r].p(d,c):(t[r]=Q(d),t[r].c(),t[r].m(u.parentNode,u))}for(;r<t.length;r+=1)t[r].d(1);t.length=p.length}},d(l){l&&f(s),l&&f(a),re(t,l),l&&f(u)}}}function ce(o){let s;return{c(){s=L("Error 😢")},l(e){s=V(e,"Error 😢")},m(e,a){K(e,s,a)},p:B,d(e){e&&f(s)}}}function Q(o){let s,e,a,u=o[14]+"",p,t,l=o[0].includes(o[14])?"Copied":"Copy",c,r,d,C,w,h;function M(){return o[7](o[14])}return{c(){s=y("div"),e=y("div"),a=y("div"),p=N(),t=y("button"),c=L(l),C=N(),this.h()},l(k){s=g(k,"DIV",{class:!0});var n=E(s);e=g(n,"DIV",{class:!0});var _=E(e);a=g(_,"DIV",{class:!0});var D=E(a);D.forEach(f),_.forEach(f),p=P(n),t=g(n,"BUTTON",{type:!0,class:!0});var W=E(t);c=V(W,l),W.forEach(f),C=P(n),n.forEach(f),this.h()},h(){m(a,"class","p-5 select-all break-all"),m(e,"class","card flex-1"),m(t,"type","button"),m(t,"class","btn variant-filled-primary"),t.disabled=r=o[0].includes(o[14]),m(s,"class","flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0")},m(k,n){K(k,s,n),i(s,e),i(e,a),a.innerHTML=u,i(s,p),i(s,t),i(t,c),i(s,C),w||(h=[A(t,"click",M),se(d=oe.call(null,t,o[14]))],w=!0)},p(k,n){o=k,n&4&&u!==(u=o[14]+"")&&(a.innerHTML=u),n&5&&l!==(l=o[0].includes(o[14])?"Copied":"Copy")&&ae(c,l),n&5&&r!==(r=o[0].includes(o[14]))&&(t.disabled=r),d&&ne(d.update)&&n&4&&d.update.call(null,o[14])},d(k){k&&f(s),w=!1,$(h)}}}function ue(o){let s,e,a,u,p,t,l,c,r,d,C,w,h,M,k,n,_,D,W,S,F;function R(v,I){if(v[1])return ce;if(v[2].length>0)return ie}let H=R(o),b=H&&H(o);return{c(){s=y("div"),e=y("div"),a=y("h1"),u=L("Nostr WTF"),p=N(),t=y("p"),l=L("Convert your nostr keys between hex, npub and nprofile formats. 🔑 🔁 🗝️"),c=N(),r=y("p"),d=L("Note that converting into nprofile doesn't include relays."),C=N(),w=y("label"),h=y("input"),M=N(),b&&b.c(),k=N(),n=y("div"),_=L("Made with 🐨 by "),D=y("a"),W=L("Lightning K0ala"),this.h()},l(v){s=g(v,"DIV",{class:!0});var I=E(s);e=g(I,"DIV",{class:!0});var T=E(e);a=g(T,"H1",{class:!0});var U=E(a);u=V(U,"Nostr WTF"),U.forEach(f),p=P(T),t=g(T,"P",{});var O=E(t);l=V(O,"Convert your nostr keys between hex, npub and nprofile formats. 🔑 🔁 🗝️"),O.forEach(f),c=P(T),r=g(T,"P",{});var X=E(r);d=V(X,"Note that converting into nprofile doesn't include relays."),X.forEach(f),C=P(T),w=g(T,"LABEL",{class:!0});var Y=E(w);h=g(Y,"INPUT",{class:!0,type:!0,placeholder:!0}),Y.forEach(f),M=P(T),b&&b.l(T),T.forEach(f),k=P(I),n=g(I,"DIV",{class:!0});var j=E(n);_=V(j,"Made with 🐨 by "),D=g(j,"A",{href:!0,target:!0});var Z=E(D);W=V(Z,"Lightning K0ala"),Z.forEach(f),j.forEach(f),I.forEach(f),this.h()},h(){m(a,"class","gradient-heading"),m(h,"class","input text-center w-full"),m(h,"type","text"),m(h,"placeholder","Paste hex, npub or nprofile key here"),m(w,"class","label mt-2"),m(e,"class","flex-1 space-y-5 w-full max-w-[800px]"),m(D,"href","https://twitter.com/LightningK0ala"),m(D,"target","_blank"),m(n,"class","text-center p-5 mt-5"),m(s,"class","flex flex-col h-screen w-screen sm:items-center sm:justify-center p-5")},m(v,I){K(v,s,I),i(s,e),i(e,a),i(a,u),i(e,p),i(e,t),i(t,l),i(e,c),i(e,r),i(r,d),i(e,C),i(e,w),i(w,h),x(h,o[3]),i(e,M),b&&b.m(e,null),i(s,k),i(s,n),i(n,_),i(n,D),i(D,W),S||(F=[A(h,"input",o[6]),A(h,"input",o[4])],S=!0)},p(v,[I]){I&8&&h.value!==v[3]&&x(h,v[3]),H===(H=R(v))&&b?b.p(v,I):(b&&b.d(1),b=H&&H(v),b&&(b.c(),b.m(e,null)))},i:B,o:B,d(v){v&&f(s),b&&b.d(),S=!1,$(F)}}}function fe(o,s,e){let a,u,p,t,l,c,r,d;function C(n){try{return q.decode(n).data}catch(_){return e(1,d=!0),G.trigger({message:"Error decoding key",background:"variant-filled-error"}),console.error(_),""}}function w(){var n;if(e(1,d=!1),e(2,t=[]),a.length!==0)try{switch(!0){case a.startsWith("npub"):u=C(a),t.push(u);break;case a.startsWith("nprofile"):const _=C(a);t.push(_.pubkey),_.relays&&t.push((n=_.relays)==null?void 0:n.join(`
`));break;default:p=q.npubEncode(a),l=q.nprofileEncode({pubkey:a,relays:c}),t.push(p),t.push(l);break}}catch(_){e(1,d=!0),console.error(_),G.trigger({message:"Error converting pubkey",background:"variant-filled-warning"})}}function h(n){e(0,r=[...r,n]),setTimeout(()=>{e(0,r=r.filter(_=>_!==n))},1e3)}function M(){a=this.value,e(3,a)}const k=n=>h(n);return e(3,a=""),u="",p="",e(2,t=["82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2"]),l="",c=[],e(0,r=[]),e(1,d=!1),[r,d,t,a,w,h,M,k]}class be extends ee{constructor(s){super(),te(this,s,fe,ue,le,{})}}export{be as default};