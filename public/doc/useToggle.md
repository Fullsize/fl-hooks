# useToggle

使用自定义钩子实现开关切换功能。  
该钩子返回一个当前状态和一个用于切换状态的函数。初始状态由传入的initValue参数决定。  
切换函数可以接受一个布尔值来显式设置状态，如果不传入值，则状态会反转。

```javascript
import React from "react";
import { useToggle } from "fl-hooks";

const Page = () => {
  const [on, toggle] = useToggle(false);
  return (
    <>
      <span>当前状态: {on ? "开" : "关"}</span>
      <button onClick={() => toggle()}>操作</button>
    </>
  );
};
```
