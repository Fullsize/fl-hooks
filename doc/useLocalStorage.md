# useLocalStorage

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
