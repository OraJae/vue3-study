import{e as l,r as i,l as r,f as c,bC as p,bt as u,u as _,i as o,ay as f,aU as m,aR as v}from"./index-BovZS5Eq.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w=a=>(m("data-v-27a50a77"),a=a(),v(),a),x={class:"iframeInner"},I=w(()=>o("p",null,"grandson",-1)),M=l({__name:"grandson",setup(a){const e=i("");function n(){e.value&&(console.log("向上级页面传递的数据",e.value),window.parent.postMessage(e.value,"*"))}return window.addEventListener("message",function(s){let t=s.data;console.log("son接收到的数据",t)},!1),(d,s)=>(r(),c("div",x,[I,p(o("input",{id:"text",type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>f(e)?e.value=t:null)},null,512),[[u,_(e)]]),o("button",{id:"sendMessage",onClick:n},"发送消息")]))}}),k=g(M,[["__scopeId","data-v-27a50a77"]]);export{k as default};
