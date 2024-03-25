import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useLocalStorage } from "../src";
import ShowDocs from "./utl/ShowDocs";
const DemouseLocalStorage = () => {
  const [testValue, setTestValue, remove] = useLocalStorage("test", null);
  return (
    <>
      <input
        value={testValue}
        type="text"
        onInput={(e: any) => setTestValue(e.target.value)}
      />
      <div>testValue:{testValue}</div>
      <button onClick={() => remove()}>删除</button>
    </>
  );
};
const meta: Meta<typeof useLocalStorage> = {
  title: "base/useLocalStorage",
  component: DemouseLocalStorage,
};

export default meta;
// type Story = StoryObj<typeof useLocalStorage>;

export const Doc = {
  render: () => <ShowDocs md={"doc/useLocalStorage.md"} />,
};
export const Demo = {
  render: () => <DemouseLocalStorage />,
};
