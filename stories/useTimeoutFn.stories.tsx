import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTimeoutFn } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const myFunction = () => {
    console.log("Delayed function executed!");
  };

  useTimeoutFn(myFunction, 1000);

  return <></>;
};
const meta: Meta<typeof useTimeoutFn> = {
  title: "base/useTimeoutFn",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useTimeoutFn>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useTimeoutFn.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
