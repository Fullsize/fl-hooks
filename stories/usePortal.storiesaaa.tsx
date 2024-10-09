import type { Meta, StoryObj } from "@storybook/react";
import React, { useRef } from "react";
import { usePortal } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const Portal = usePortal(document.querySelector("title"));
  console.log(7, Portal);
  return (
    <p>
      Hello world!
      <Portal type="" props={{}} key={""}>
        Portalized Title
      </Portal>
    </p>
  );
};
const meta: Meta<typeof usePortal> = {
  title: "base/usePortal",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof usePortal>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/usePortal.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
