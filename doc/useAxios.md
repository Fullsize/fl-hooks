# useAxios

基于axios的react hooks 封装，使用方法如axios(config),[文档链接](https://axios-http.com/docs/api_intro)

```javascript
import React from "react";
import { useAxios } from "fl-hooks";
const Page = () => {
  const [{ data, loading, error }] = useAxios({
    url: "/myapi",
    method: "post",
    data: {
      // my data
    },
  });
  return <></>;
};
export default Page;
```

支持继承axios的实例

```javascript
useAxios.extend(AxiosInstance);
```
