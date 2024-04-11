import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useLazyAxios } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [{ data, loading, error }, get] = useLazyAxios({
    url: "/myapi",
    method: "post",
    data: {
      b: 1,
    },
  });
  return (
    <>
      {loading && <>....</>}
      {error && <>请求错误</>}
      <button
        onClick={() =>
          get({
            data: {
              a: 1,
            },
          })
        }
      >
        点击请求
      </button>
    </>
  );
};
const meta: Meta<typeof useLazyAxios> = {
  title: "base/useLazyAxios",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useLazyAxios>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useLazyAxios.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
