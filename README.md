# fl-hooks — React Hooks for Everyday UI Development

**English** | [简体中文](./README_CN.md)

[![npm version](https://img.shields.io/npm/v/fl-hooks)](https://www.npmjs.com/package/fl-hooks)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./package.json)

**fl-hooks** is a React Hooks library written in TypeScript for data fetching with Axios, localStorage persistence, component state, timers, DOM interactions, and Apache ECharts integration. It provides 16 named hooks with small APIs you can use directly in React function components.

[npm package](https://www.npmjs.com/package/fl-hooks) · [Source code](https://github.com/Fullsize/fl-hooks) · [Report an issue](https://github.com/Fullsize/fl-hooks/issues)

## Contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Available hooks](#available-hooks)
- [Data fetching with Axios](#data-fetching-with-axios)
- [Persisting state in localStorage](#persisting-state-in-localstorage)
- [Browser and chart hooks](#browser-and-chart-hooks)
- [Usage notes](#usage-notes)
- [Local development](#local-development)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the library and its declared peer dependencies. If your application already has these dependencies, keep the versions appropriate for your project.

```sh
npm install fl-hooks react react-dom axios echarts
```

Or with pnpm or Yarn:

```sh
pnpm add fl-hooks react react-dom axios echarts
# or
yarn add fl-hooks react react-dom axios echarts
```

The package includes TypeScript declarations and ES module and UMD builds. Import hooks by name from `fl-hooks`.

## Quick start

Use `useToggle` to control UI visibility and `useInputValue` to bind an input without writing a separate change handler:

```tsx
import { useInputValue, useToggle } from 'fl-hooks';

export default function Greeting() {
  const name = useInputValue('');
  const [visible, toggle] = useToggle(false);

  return (
    <section>
      <input {...name} placeholder="Your name" />
      <button onClick={() => toggle()}>
        {visible ? 'Hide greeting' : 'Show greeting'}
      </button>
      {visible && <p>Hello, {name.value || 'world'}!</p>}
    </section>
  );
}
```

## Available hooks

These are the public exports from [`src/index.ts`](./src/index.ts). Linked API guides contain additional examples, primarily in Chinese.

| Hook | Purpose | Return value |
| --- | --- | --- |
| [useAxios](./public/doc/useAxios.md) | Send an Axios request on mount and when its configuration is updated | `[state, updateConfig]` |
| [useLazyAxios](./public/doc/useLazyAxios.md) | Send an Axios request after an explicit trigger | `[state, trigger]` |
| [useLocalStorage](./public/doc/useLocalStorage.md) | Store JSON-serializable state in localStorage | `[value, setValue, remove]` |
| [useSetState](./public/doc/useSetState.md) | Shallow-merge partial object state updates | `[state, updateState]` |
| [useToggle](./public/doc/useToggle.md) | Toggle a boolean or set an explicit boolean value | `[value, toggle]` |
| [useInputValue](./public/doc/useInputValue.md) | Manage an input's value and change handler | `{ value, onChange }` |
| [useMap](./src/useMap.ts) | Manage a JavaScript Map with immutable updates | `[map, { set, remove, clear }]` |
| [useTimeout](./public/doc/useTimeout.md) | Start or restart a timeout manually | `[resetTimeout, clearTimer]` |
| [useTimeoutFn](./public/doc/useTimeoutFn.md) | Start a timeout on mount and allow restarting it | `{ resetTimeout }` |
| [useMeasure](./src/useNodeBoundingRect.ts) | Observe an element's content dimensions with ResizeObserver | `[ref, rect, cleanObserver]` |
| [useHover](./public/doc/useHover.md) | Track mouse hover on an attached element | `[ref, isHover]` |
| [useOnline](./public/doc/useOnline.md) | Track the browser's online/offline status | `boolean` |
| [useTitle](./public/doc/useTitle.md) | Set the document title on mount and restore it on unmount | No return value |
| [useIsClient](./public/doc/useIsClient.md) | Detect when a component has mounted on the client | `boolean` |
| [useRenderCount](./public/doc/useRenderCount.md) | Count component renders for debugging | `number` |
| [useEcharts](./public/doc/useEcharts.md) | Initialize an Apache ECharts instance on a DOM element | `[chart, ref]` |

## Data fetching with Axios

### Automatic requests

`useAxios(config)` returns a request state containing `loading`, `error`, and `data`, plus a function that merges configuration updates and triggers another request. `data` contains the Axios response body (`response.data`).

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
        Load user 2
      </button>
      {loading && <p>Loading…</p>}
      {error && <p>Request failed.</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
```

### Requests triggered by user actions

`useLazyAxios(config)` waits until you call its trigger function. For example, submit a search only after the user clicks a button:

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
      <input {...query} placeholder="Search" />
      <button
        disabled={loading}
        onClick={() => search({ params: { q: query.value } })}
      >
        Search
      </button>
      {error && <p>Search failed.</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
```

The `/api/user` and `/api/search` URLs are examples; replace them with your application's endpoints. The update and trigger functions return `void`; read results from the hook state.

### Custom Axios instance

Configure a shared Axios instance outside your components to use a base URL or interceptors:

```ts
import axios from 'axios';
import { useAxios } from 'fl-hooks';

const api = axios.create({ baseURL: 'https://api.example.com' });
useAxios.extend(api);
```

`useAxios.extend()` and `useLazyAxios.extend()` configure the same module-level instance. The change applies to both request hooks throughout the application.

## Persisting state in localStorage

`useLocalStorage(key, initialValue)` reads an existing JSON value and persists subsequent state changes:

```tsx
import { useLocalStorage } from 'fl-hooks';

export default function ThemePreference() {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  );
}
```

Values must be JSON-serializable. This hook does not synchronize state between tabs. Its `remove()` function removes the key and sets state to an empty string; the persistence effect can subsequently write that empty string back to storage.

## Browser and chart hooks

Measure an element using its observed content rectangle:

```tsx
import { useMeasure } from 'fl-hooks';

export default function PanelSize() {
  const [ref, rect] = useMeasure();

  return (
    <div ref={ref}>
      Width: {rect ? `${Math.round(rect.width)}px` : 'Measuring…'}
    </div>
  );
}
```

Initialize an ECharts chart, then set its options once the instance is available:

```tsx
import { useEffect } from 'react';
import { useEcharts } from 'fl-hooks';

export default function SalesChart() {
  const [chart, ref] = useEcharts();

  useEffect(() => {
    chart?.setOption({
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [12, 20, 15] }],
    });
  }, [chart]);

  return <div ref={ref} style={{ width: '100%', height: 300 }} />;
}
```

Give chart containers an explicit height. Call `chart.resize()` when your layout changes; automatic chart resizing is not provided.

## Usage notes

- Call hooks at the top level of React function components or custom hooks, following the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks).
- Browser hooks use APIs such as `window`, `document`, localStorage, and ResizeObserver. For server-rendered applications, use browser-dependent components on the client and check your framework's hydration requirements. `useIsClient` becomes `true` after mount; it does not make every other hook safe for server rendering.
- `useTitle` applies the initial title on mount. Later changes to its argument do not update the title in the current implementation.
- `useOnline` reports the browser's connectivity status, which does not guarantee that your API is reachable.
- `useRenderCount` counts render calls, including additional development renders caused by React Strict Mode.

## Local development

```sh
git clone https://github.com/Fullsize/fl-hooks.git
cd fl-hooks
npm install
npm run dev
```

Storybook runs at `http://localhost:6006` and contains interactive hook examples from [`stories`](./stories).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Storybook for local development |
| `npm run build:lib` | Build the library and TypeScript declarations into `dist` |
| `npm run build-storybook` | Build the static Storybook site |

Hook implementations live in [`src`](./src), and existing API guides live in [`public/doc`](./public/doc).

## Contributing

Bug reports, documentation improvements, and pull requests are welcome. When reporting a bug, include your React version, the hook involved, and a minimal reproduction. For hook changes, update the corresponding documentation and Storybook example, then run the library and Storybook builds.

## License

ISC, as declared in [`package.json`](./package.json).
