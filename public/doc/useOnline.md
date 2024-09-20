# 自定义 React Hook: `useOnline`

## 目录

- [介绍](#介绍)
- [安装](#安装)
- [用法](#用法)
- [API](#api)
- [示例](#示例)
- [注意事项](#注意事项)
- [常见问题](#常见问题)
- [许可](#许可)

## 介绍

`useOnline` 是一个自定义的 React Hook，用于 **[功能描述]**。它可以帮助你 **[解决什么问题]**，并且可以 **[带来的好处]**。

## 安装

通过 npm 或 yarn 安装此 Hook：

```bash
npm install fl-hooks
# or
yarn add fl-hooks
```

## 用法

```js
import { useYourHook } from "fl-hooks";
const YourComponent = () => {
  const isOnline = useOnline();
  return <span>You are {isOnline ? "online" : "offline"}.</span>;
};
```
