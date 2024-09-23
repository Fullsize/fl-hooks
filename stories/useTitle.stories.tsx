import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useTitle } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Alert = () => {
  useTitle("Alert");
  return <p>Alert! Title has changed</p>;
};

const MyApp = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</button>
      {alertOpen && <Alert />}
    </>
  );
};

const meta: Meta<typeof useTitle> = {
  title: "base/useTitle",
  component: MyApp,
};

export default meta;
type Story = StoryObj<typeof useTitle>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useAxios.md"} />,
};
export const Demo: Story = {
  render: () => <MyApp />,
};
