# useTimeoutFn

## 描述

`useTimeoutFn` 是一个自定义 Hook，旨在帮助在 React 函数组件中实现延时执行函数的功能。

## API

- fn: 要延时执行的函数。
- ms: 延时的毫秒数。

## 示例

```javascript
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTimeoutFn } from "fl-hooks";
const Page = () => {
  const myFunction = () => {
    console.log("Delayed function executed!");
  };

  useTimeoutFn(myFunction, 1000);

  return <></>;
};
export default Page;
```
