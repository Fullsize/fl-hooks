import{r as e,R as o}from"./index-BBkUAzwr.js";import{S as b}from"./ShowDocs-NmJmU2e-.js";function h(r,n){const[s,c]=e.useState(null),a=e.useRef(r);e.useEffect(()=>{a.current=r},[r]);const m=e.useCallback(()=>{const C=window.setTimeout(()=>{a.current(),c(null)},n);c(C)},[n]),t=e.useCallback(()=>{s&&(clearTimeout(s),c(null))},[s]);return e.useEffect(()=>()=>{t()},[t]),[e.useCallback(()=>{t(),m()},[t,m]),t]}const g=()=>{const[r,n]=e.useState(0),s=()=>{n(i=>i+1),console.log("Timeout executed!")},[c,a]=h(s,1e3),m=()=>{console.log("Timer started!"),c()},t=()=>{console.log("Timer stopped!"),a()};return o.createElement("div",null,o.createElement("h1",null,"Timer Count: ",r),o.createElement("button",{onClick:m},"Start Timer"),o.createElement("button",{onClick:t},"Stop Timer"))},w={title:"base/useTimeout",component:g},u={render:()=>o.createElement(b,{md:"doc/useTimeout.md"})},l={render:()=>o.createElement(g,null)};var d,T,p;u.parameters={...u.parameters,docs:{...(d=u.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <ShowDocs md={"doc/useTimeout.md"} />
}`,...(p=(T=u.parameters)==null?void 0:T.docs)==null?void 0:p.source}}};var S,f,E;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Page />
}`,...(E=(f=l.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};const x=["Doc","Demo"];export{l as Demo,u as Doc,x as __namedExportsOrder,w as default};