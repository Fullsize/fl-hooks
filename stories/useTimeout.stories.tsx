import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTimeout } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [count, setCount] = useState(0);

  // 定义定时器回调函数
  const handleTimeout = () => {
    setCount((prevCount) => prevCount + 1);
    console.log("Timeout executed!");
  };

  // 使用自定义 Hook
  const [resetTimeout, clearTimer] = useTimeout(handleTimeout, 1000);

  const handleStartTimer = () => {
    console.log("Timer started!");
    resetTimeout(); // 重置定时器
  };

  const handleStopTimer = () => {
    console.log("Timer stopped!");
    clearTimer(); // 清除定时器
  };

  return (
    <div>
      <h1>Timer Count: {count}</h1>
      <button onClick={handleStartTimer}>Start Timer</button>
      <button onClick={handleStopTimer}>Stop Timer</button>
    </div>
  );
};
const meta: Meta<typeof useTimeout> = {
  title: "base/useTimeout",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useTimeout>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useTimeout.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
