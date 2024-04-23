import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useLayoutEffect } from "react";
import { useEcharts } from "../src";
import ShowDocs from "./utl/ShowDocs";
const Page = () => {
  const [chartRef, ref] = useEcharts();

  const toLine = () => {
    chartRef?.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    });
  };
  const toBar = () => {
    chartRef?.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    });
  };
  useLayoutEffect(() => {
    toLine();
  }, [chartRef]);
  return (
    <>
      <button onClick={toLine}>线图</button>
      <button onClick={toBar}>柱图</button>
      <div ref={ref} style={{ width: 500, height: 300 }}></div>
    </>
  );
};
const meta: Meta<typeof useEcharts> = {
  title: "base/useEcharts",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof useEcharts>;

export const Doc: Story = {
  render: () => <ShowDocs md={"doc/useEcharts.md"} />,
};
export const Demo: Story = {
  render: () => <Page />,
};
