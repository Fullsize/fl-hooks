# useSetState

React 状态钩子可创建 setState 方法，该方法的工作原理与类组件中 this.setState 的工作原理类似--将对象变化合并到当前状态中。

```javascript
import React from "react";
import { useSetState } from "fl-hooks";

const Page = () => {
  const [state, setState] = useSetState<{ [x: string]: any }>({});

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ hello: "world" })}>hello</button>
      <button onClick={() => setState({ foo: "bar" })}>foo</button>
      <button
        onClick={() => {
          setState((prevState) => ({
            count: (prevState.count || 0) + 1,
          }));
        }}
      >
        count
      </button>
    </div>
  );
};
```
