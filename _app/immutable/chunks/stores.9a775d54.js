import{w as o}from"./index.ad5ada93.js";const r={message:"Missing Toast Message",autohide:!0,timeout:5e3};function l(){const t=Math.random();return Number(t).toString(32)}function d(t){t.autohide===!0&&setTimeout(()=>{m.close(t.id)},t.timeout)}function f(){const{subscribe:t,set:a,update:i}=o([]);return{subscribe:t,trigger:s=>i(e=>{const c=l();s&&s.callback&&s.callback({id:c,status:"queued"});const n={...r,...s,id:c};return e.push(n),d(n),e}),close:s=>i(e=>{if(e.length>0){const c=e.findIndex(u=>u.id===s),n=e[c];n&&n.callback&&n.callback({id:s,status:"closed"}),e.splice(c,1)}return e}),clear:()=>a([])}}const m=f();export{m as t};