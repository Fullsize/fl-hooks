import{r as i,R as o}from"./index-uubelm5h.js";import{S as w}from"./ShowDocs-CEFBxudd.js";import"./client-DnFX9VPo.js";const E=()=>typeof navigator<"u"&&typeof navigator.onLine=="boolean"?navigator.onLine:!0,v=()=>{const[t,r]=i.useState(E()),s=()=>r(!0),a=()=>r(!1);return i.useEffect(()=>(window.addEventListener("online",s),window.addEventListener("offline",a),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",a)}),[]),t},f=()=>{const t=v();return o.createElement("span",null,"You are ",t?"online":"offline",".")},L={title:"base/useOnline",component:f},e={render:()=>o.createElement(w,{md:"doc/useOnline.md"})},n={render:()=>o.createElement(f,null)};var c,d,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <ShowDocs md={"doc/useOnline.md"} />
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,u,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Page />
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const D=["Doc","Demo"];export{n as Demo,e as Doc,D as __namedExportsOrder,L as default};
