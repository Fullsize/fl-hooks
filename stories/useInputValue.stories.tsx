import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useInputValue } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const name = useInputValue("初始化");
  return (
    <>
      <input {...name} />
      <div>输入值: {name.value}</div>
    </>
  );
};
const meta: Meta<typeof useInputValue> = {
  title: "base/useInputValue",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useInputValue>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
