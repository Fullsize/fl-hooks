# fl-hooks — 用于日常 UI 开发的 React Hooks 库

[English](./README.md) | **简体中文**

[![npm version](https://img.shields.io/npm/v/fl-hooks)](https://www.npmjs.com/package/fl-hooks)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./package.json)

**fl-hooks** 是一个使用 TypeScript 编写的 React Hooks 库，涵盖基于 Axios 的数据请求、localStorage 本地存储、组件状态、定时器、DOM 交互和 Apache ECharts 图表集成。它提供 16 个具名导出的 Hook，可直接在 React 函数组件中使用。

[npm 包](https://www.npmjs.com/package/fl-hooks) · [源代码](https://github.com/Fullsize/fl-hooks) · [反馈问题](https://github.com/Fullsize/fl-hooks/issues)

## 目录

- [安装](#安装)
- [快速开始](#快速开始)
- [Hook 列表](#hook-列表)
- [使用 Axios 请求数据](#使用-axios-请求数据)
- [使用 localStorage 持久化状态](#使用-localstorage-持久化状态)
- [浏览器与图表 Hook](#浏览器与图表-hook)
- [使用说明](#使用说明)
- [本地开发](#本地开发)
- [参与贡献](#参与贡献)
- [许可证](#许可证)

## 安装

安装库及其声明的 peer dependencies。如果项目已安装这些依赖，请保留适合项目的版本。

```sh
npm install fl-hooks react react-dom axios echarts
```

也可以使用 pnpm 或 Yarn：

```sh
pnpm add fl-hooks react react-dom axios echarts
# 或
yarn add fl-hooks react react-dom axios echarts
```

包内包含 TypeScript 类型声明，以及 ES module 和 UMD 构建产物。通过 `fl-hooks` 具名导入所需 Hook。

## 快速开始

使用 `useToggle` 控制内容显示，使用 `useInputValue` 绑定输入框，省去单独编写 change handler 的步骤：

```tsx
import { useInputValue, useToggle } from 'fl-hooks';

export default function Greeting() {
  const name = useInputValue('');
  const [visible, toggle] = useToggle(false);

  return (
    <section>
      <input {...name} placeholder="你的名字" />
      <button onClick={() => toggle()}>
        {visible ? '隐藏问候' : '显示问候'}
      </button>
      {visible && <p>你好，{name.value || '朋友'}！</p>}
    </section>
  );
}
```

## Hook 列表

以下列表对应 [`src/index.ts`](./src/index.ts) 的公开导出。点击名称可查看 API 文档或实现源码。

| Hook | 用途 | 返回值 |
| --- | --- | --- |
| [useAxios](./public/doc/useAxios.md) | 挂载时自动请求，更新配置后再次请求 | `[state, updateConfig]` |
| [useLazyAxios](./public/doc/useLazyAxios.md) | 显式触发后执行 Axios 请求 | `[state, trigger]` |
| [useLocalStorage](./public/doc/useLocalStorage.md) | 将可 JSON 序列化的状态保存到 localStorage | `[value, setValue, remove]` |
| [useSetState](./public/doc/useSetState.md) | 浅合并对象状态的局部更新 | `[state, updateState]` |
| [useToggle](./public/doc/useToggle.md) | 切换布尔状态或显式设置值 | `[value, toggle]` |
| [useInputValue](./public/doc/useInputValue.md) | 管理输入框的值和 change handler | `{ value, onChange }` |
| [useMap](./src/useMap.ts) | 通过不可变更新管理 JavaScript Map | `[map, { set, remove, clear }]` |
| [useTimeout](./public/doc/useTimeout.md) | 手动启动或重新启动延时任务 | `[resetTimeout, clearTimer]` |
| [useTimeoutFn](./public/doc/useTimeoutFn.md) | 挂载时启动延时任务，并支持重新启动 | `{ resetTimeout }` |
| [useMeasure](./src/useNodeBoundingRect.ts) | 使用 ResizeObserver 观察元素内容尺寸 | `[ref, rect, cleanObserver]` |
| [useHover](./public/doc/useHover.md) | 跟踪绑定元素的鼠标悬停状态 | `[ref, isHover]` |
| [useOnline](./public/doc/useOnline.md) | 跟踪浏览器在线或离线状态 | `boolean` |
| [useTitle](./public/doc/useTitle.md) | 挂载时设置页面标题，卸载时恢复原始标题 | 无返回值 |
| [useIsClient](./public/doc/useIsClient.md) | 判断组件是否已在客户端挂载 | `boolean` |
| [useRenderCount](./public/doc/useRenderCount.md) | 统计组件渲染次数，辅助调试 | `number` |
| [useEcharts](./public/doc/useEcharts.md) | 在 DOM 元素上初始化 Apache ECharts 实例 | `[chart, ref]` |

## 使用 Axios 请求数据

### 自动请求

`useAxios(config)` 返回包含 `loading`、`error` 和 `data` 的请求状态，以及更新配置的方法。更新配置会合并传入参数并触发新请求；`data` 是 Axios 响应体，即 `response.data`。

```tsx
import { useAxios } from 'fl-hooks';

export default function UserProfile() {
  const [{ data, loading, error }, updateConfig] = useAxios({
    url: '/api/user',
    method: 'GET',
    params: { id: 1 },
  });

  return (
    <section>
      <button onClick={() => updateConfig({ params: { id: 2 } })}>
        加载用户 2
      </button>
      {loading && <p>加载中…</p>}
      {error && <p>请求失败。</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
```

### 用户操作触发请求

`useLazyAxios(config)` 会等待你调用触发方法。例如，点击按钮后再执行搜索：

```tsx
import { useInputValue, useLazyAxios } from 'fl-hooks';

export default function Search() {
  const query = useInputValue('');
  const [{ data, loading, error }, search] = useLazyAxios({
    url: '/api/search',
    method: 'GET',
  });

  return (
    <section>
      <input {...query} placeholder="搜索内容" />
      <button
        disabled={loading}
        onClick={() => search({ params: { q: query.value } })}
      >
        搜索
      </button>
      {error && <p>搜索失败。</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
```

`/api/user` 和 `/api/search` 是示例地址，请替换成项目中的接口。配置更新和请求触发方法返回 `void`，请求结果通过 Hook 状态读取。

### 自定义 Axios 实例

在组件外配置共享实例，统一设置 base URL 或拦截器：

```ts
import axios from 'axios';
import { useAxios } from 'fl-hooks';

const api = axios.create({ baseURL: 'https://api.example.com' });
useAxios.extend(api);
```

`useAxios.extend()` 和 `useLazyAxios.extend()` 修改的是同一个模块级实例，会同时影响应用中的两种请求 Hook。

## 使用 localStorage 持久化状态

`useLocalStorage(key, initialValue)` 读取已有的 JSON 数据，并在状态变化后自动保存：

```tsx
import { useLocalStorage } from 'fl-hooks';

export default function ThemePreference() {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前主题：{theme}
    </button>
  );
}
```

保存的值必须支持 JSON 序列化。此 Hook 不会在多个标签页之间同步状态。`remove()` 会删除存储键并将状态设为空字符串，之后持久化 effect 可能再次把空字符串写入存储。

## 浏览器与图表 Hook

使用 `useMeasure` 获取元素被观察到的内容区域尺寸：

```tsx
import { useMeasure } from 'fl-hooks';

export default function PanelSize() {
  const [ref, rect] = useMeasure();

  return (
    <div ref={ref}>
      宽度：{rect ? `${Math.round(rect.width)}px` : '测量中…'}
    </div>
  );
}
```

初始化 ECharts 图表，在实例可用后设置图表配置：

```tsx
import { useEffect } from 'react';
import { useEcharts } from 'fl-hooks';

export default function SalesChart() {
  const [chart, ref] = useEcharts();

  useEffect(() => {
    chart?.setOption({
      xAxis: { type: 'category', data: ['周一', '周二', '周三'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [12, 20, 15] }],
    });
  }, [chart]);

  return <div ref={ref} style={{ width: '100%', height: 300 }} />;
}
```

图表容器需要明确的高度。布局变化后，请自行调用 `chart.resize()`；此 Hook 未提供图表自动调整尺寸的功能。

## 使用说明

- 按照 React 的 [Hooks 规则](https://react.dev/reference/rules/rules-of-hooks)，在函数组件或自定义 Hook 的顶层调用 Hook。
- 浏览器相关 Hook 使用 `window`、`document`、localStorage 和 ResizeObserver 等 API。服务端渲染项目应将依赖浏览器的组件放在客户端使用，并检查框架的 hydration 要求。`useIsClient` 在挂载后变为 `true`，不代表其他 Hook 都可以安全地在服务端渲染。
- 当前 `useTitle` 实现在挂载时应用初始标题，之后修改传入参数不会更新标题。
- `useOnline` 表示浏览器报告的网络状态，不保证业务接口可以访问。
- `useRenderCount` 统计渲染调用次数，包括 React Strict Mode 在开发环境触发的额外渲染。

## 本地开发

```sh
git clone https://github.com/Fullsize/fl-hooks.git
cd fl-hooks
npm install
npm run dev
```

Storybook 默认运行在 `http://localhost:6006`，交互示例位于 [`stories`](./stories)。

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动本地 Storybook |
| `npm run build:lib` | 构建库和 TypeScript 类型声明，输出到 `dist` |
| `npm run build-storybook` | 构建静态 Storybook 站点 |

Hook 实现位于 [`src`](./src)，现有 API 文档位于 [`public/doc`](./public/doc)。

## 参与贡献

欢迎提交问题反馈、文档改进和 Pull Request。报告问题时，请提供 React 版本、涉及的 Hook 和最小复现示例。修改 Hook 后，请同步更新对应文档和 Storybook 示例，并执行库构建和 Storybook 构建。

## 许可证

ISC，声明见 [`package.json`](./package.json)。
