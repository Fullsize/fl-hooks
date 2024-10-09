# useInputValue

使用useInputValue钩子来管理输入框的值。  
这个钩子接受一个初始值作为参数，并返回当前值和一个onChange处理函数。  
它封装了状态管理和事件处理的逻辑，使得在组件中使用输入框的值变得更加简便。

```javascript
import React from "react";
import { useInputValue } from "fl-hooks";

const Page = () => {
  const name = useInputValue("初始化");
  return (
    <>
      <input {...name} />
      <div>输入值: {name.value}</div>
    </>
  );
};
```
