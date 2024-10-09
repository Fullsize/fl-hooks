import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useSetState } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [state, setState] = useSetState<{ [x: string]: any }>({});

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ hello: "world" })}>hello</button>
      <button onClick={() => setState({ foo: "bar" })}>foo</button>
      <button
        onClick={() => {
          setState((prevState) => ({
            count: (prevState.count || 0) + 1,
          }));
        }}
      >
        count
      </button>
    </div>
  );
};
const meta: Meta<typeof useSetState> = {
  title: "base/useSetState",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useSetState>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useSetState.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
