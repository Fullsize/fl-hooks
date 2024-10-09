# useRenderCount

该钩子用于追踪组件的渲染次数

```javascript
import React, { useState } from "react";
import { useRenderCount } from "fl-hooks";

const Page = () => {
  const count = useRenderCount();
  const [num, setNum] = useState(0);
  return (
    <>
      <span>当前渲染次数: {count}</span>
      <div>
        <span>个数: {num}</span>
        <button onClick={() => setNum(num + 1)}>增加</button>
        <button onClick={() => setNum(num - 1)}>减少</button>
      </div>
    </>
  );
};
```
