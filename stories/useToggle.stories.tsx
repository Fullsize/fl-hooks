import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useToggle } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [on, toggle] = useToggle(false);
  return (
    <>
      <span>当前状态: {on ? "开" : "关"}</span>
      <button onClick={() => toggle()}>操作</button>
    </>
  );
};
const meta: Meta<typeof useToggle> = {
  title: "base/useToggle",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useToggle>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
