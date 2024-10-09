# usePortal

使用Portal的自定义钩子.  
该钩子用于创建一个Portal，以便在指定的DOM元素中渲染React子组件.  
它处理了React 18和之前版本的不同Portal创建逻辑，并管理Portal的渲染和清理过程.

```javascript
import React from "react";
import { usePortal } from "fl-hooks";

const Page = () => {
  const Portal = usePortal(document.querySelector("title"));
  console.log(7, Portal);
  return (
    <p>
      Hello world!
      <Portal type="" props={{}} key={""}>
        Portalized Title
      </Portal>
    </p>
  );
};
```
