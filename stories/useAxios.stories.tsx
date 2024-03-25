import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useAxios } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  useAxios({ url: "/myapi" });
  return <></>;
};
const meta: Meta<typeof useAxios> = {
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useAxios>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Primary: Story = {
  render: () => <Page />,
};
