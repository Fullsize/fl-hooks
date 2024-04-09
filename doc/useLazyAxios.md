# useLazyAxios

`useLazyAxios` 自定义钩子提供了一种在 React 函数组件中使用 Axios 执行惰性数据获取的方法。

```javascript
import React from "react";
import { useLazyAxios } from "fl-hooks";
const Page = () => {
  const [{ data, loading, error }, fetchData] = useLazyAxios({ url: "/myapi" });
  return (
    <>
      {loading && <>....</>}
      {error && <>请求错误</>}
      <button onClick={() => fetchData()}>点击请求</button>
    </>
  );
};
export default Page;
```

支持继承axios的实例

```javascript
useLazyAxios.extend(AxiosInstance);
```
