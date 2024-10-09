import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useIsClient } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const isClient = useIsClient();
  return <div>是否在客户端?{isClient ? "是" : "否"}</div>;
};
const meta: Meta<typeof useIsClient> = {
  title: "base/useIsClient",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useIsClient>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useIsClient.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
