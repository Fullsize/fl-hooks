import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useMap } from "../src";
import ShowDocs from "./utl/ShowDocs";
const MyApp = () => {
  const [map, { set, remove, clear }] = useMap<[string, number]>([
    ["apples", 10],
  ]);

  return (
    <div>
      <button onClick={() => set(Date.now(), new Date().toJSON())}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove("apples")} disabled={!map.has("apples")}>
        Remove apples
      </button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {}
          ),
          null,
          2
        )}
      </pre>
    </div>
  );
};
const meta: Meta<typeof useMap> = {
  title: "base/useMap",
  component: MyApp,
};

export default meta;
type Story = StoryObj<typeof useMap>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Demo: Story = {
  render: () => <MyApp />,
};
