import{r as c,R as e}from"./index-uubelm5h.js";import{S as f}from"./ShowDocs-CEFBxudd.js";import"./client-DnFX9VPo.js";function D(s){const[r,a]=c.useState(s),E=c.useCallback(n=>{a(n!==void 0?n:!r)},[r]);return[r,E]}const i=()=>{const[s,r]=D(!1);return e.createElement(e.Fragment,null,e.createElement("span",null,"当前状态: ",s?"开":"关"),e.createElement("button",{onClick:()=>r()},"操作"))},x={title:"base/useToggle",component:i},o={render:()=>e.createElement(f,{md:"doc/useToggle.md"})},t={render:()=>e.createElement(i,null)};var m,l,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <ShowDocs md={"doc/useToggle.md"} />
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var d,g,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Page />
}`,...(p=(g=t.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const h=["Doc","Demo"];export{t as Demo,o as Doc,h as __namedExportsOrder,x as default};
