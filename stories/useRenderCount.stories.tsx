import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { useRenderCount } from "../src";
import ShowDocs from "./utl/ShowDocs";
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
const meta: Meta<typeof useRenderCount> = {
  title: "base/useRenderCount",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useRenderCount>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useRenderCount.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
