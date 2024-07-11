import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useHover } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [ref, hovering] = useHover();
  return (
    <>
      <div
        ref={ref}
        style={{
          width: 400,
          height: 400,
          background: hovering ? "red" : "green",
        }}
      >
        是否hover?{hovering ? "是" : "否"}
      </div>
    </>
  );
};
const meta: Meta<typeof useHover> = {
  title: "base/useHover",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useHover>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
