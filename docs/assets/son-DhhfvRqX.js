import{i as c,r as d,o as p,c as u,bC as f,bt as _,u as n,a as o,ay as m,aU as v,aR as g}from"./index-OI8sJCFS.js";import{_ as h}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w=s=>(v("data-v-904885c9"),s=s(),g(),s),x={class:"iframeInner"},I=w(()=>o("p",null,"son",-1)),M=["src"],b=c({__name:"son",setup(s){let r=location.origin;const e=d("");function i(){e.value&&(console.log("向父页面传递的数据",e.value),window.parent.postMessage(e.value,"*"))}return window.addEventListener("message",function(a){let t=a.data;console.log("son接收到的数据",t)},!1),(l,a)=>(p(),u("div",x,[I,f(o("input",{id:"text",type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>m(e)?e.value=t:null)},null,512),[[_,n(e)]]),o("button",{id:"sendMessage",onClick:i},"发送消息"),o("iframe",{ref:"myIframe",src:n(r)+"/h5/iframe/postMessage/grandson",frameborder:"0"},null,8,M)]))}}),B=h(b,[["__scopeId","data-v-904885c9"]]);export{B as default};