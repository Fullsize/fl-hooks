# useTitle

自定义 Hook 用于动态设置和恢复文档标题

```javascript
import React from "react";
import { useTitle } from "fl-hooks";

const Alert = () => {
  useTitle("Alert");
  return <p>Alert! Title has changed</p>;
};

const MyApp = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</button>
      {alertOpen && <Alert />}
    </>
  );
};
```
