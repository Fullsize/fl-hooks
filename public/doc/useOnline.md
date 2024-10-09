# useOnline

自定义钩子useOnline，用于监听网络连接状态  
该钩子通过监听浏览器的online和offline事件来判断网络连接状态，并相应更新状态

```javascript
import React from "react";
import { useOnline } from "fl-hooks";

const Page = () => {
  const isOnline = useOnline();
  return <span>You are {isOnline ? "online" : "offline"}.</span>;
};
```
