# useHover

使用悬停检测的自定义钩子 该钩子返回一个引用和一个布尔值，表示元素是否处于悬停状态

```javascript
import React from "react";
import { useHover } from "fl-hooks";
const Page = () => {
  const [ref, hovering] = useHover();
  return (
    <>
      <div
        ref={ref}
        style={{
          width: 400,
          height: 400,
          background: hovering ? "red" : "green",
        }}
      >
        是否hover?{hovering ? "是" : "否"}
      </div>
    </>
  );
};
```
