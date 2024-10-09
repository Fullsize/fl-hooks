# useLocalStorage

使用本地存储功能的钩子函数  
此函数用于在React组件中管理本地存储功能它提供了读取、写入和删除本地存储数据的能力

```javascript
import React from "react";
import { useLocalStorage } from "fl-hooks";
const Page = () => {
  const [testValue, setTestValue] = useLocalStorage("test", null);
  return (
    <>
      <input
        value={testValue}
        type="text"
        onInput={(e: any) => setTestValue(e.target.value)}
      />
      <div>testValue:{testValue}</div>
    </>
  );
};
```
