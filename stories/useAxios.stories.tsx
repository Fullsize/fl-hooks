import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useAxios } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [{ data, loading, error }] = useAxios({ url: "/myapi" });
  return (
    <>
      {loading && <>....</>}
      {error && <>请求错误</>}
    </>
  );
};
const meta: Meta<typeof useAxios> = {
  title: "base/useAxios",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useAxios>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
