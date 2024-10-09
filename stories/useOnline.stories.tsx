import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useOnline } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const isOnline = useOnline();
  return <span>You are {isOnline ? "online" : "offline"}.</span>;
};
const meta: Meta<typeof useOnline> = {
  title: "base/useOnline",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useOnline>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useOnline.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
