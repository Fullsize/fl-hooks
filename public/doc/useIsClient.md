# useIsClient

自定义Hook，用于确定当前执行环境是否在客户端。  
在React组件中，由于组件最初在服务器（服务端渲染）和浏览器（客户端渲染）上都可能执行，  
这个Hook可以帮助我们识别当前的执行环境，以便进行相应的逻辑处理。

```javascript
import React from "react";
import { useIsClient } from "fl-hooks";

const Page = () => {
  const isClient = useIsClient();
  return <div>是否在客户端?{isClient ? "是" : "否"}</div>;
};
```
