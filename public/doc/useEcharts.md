# useEcharts

这个自定义的 React Hook，`useEcharts`，用于在 React 组件中集成 ECharts 数据可视化。它管理 ECharts 实例的生命周期，在组件卸载时执行正确的资源清理。

```javascript
import { useEcharts } from "fl-hooks"; // 假设 Hook 文件位于同一目录下
function MyChartComponent() {
  const [chartRef, chartElementRef] = useEcharts();

  // 根据需要使用 chartRef 和 chartElementRef

  return (
    <div ref={chartElementRef} style={{ width: "100%", height: "400px" }} />
  );
}
```
