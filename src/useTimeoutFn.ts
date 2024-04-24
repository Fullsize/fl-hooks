import { useEffect } from "react";
import { useTimeout } from "./index";

// 自定义 Hook: useTimeoutFn
// 用于在 React 组件中实现延时执行函数的功能
export default function useTimeoutFn(fn: Function, ms: number) {
  const [resetTimeout] = useTimeout(fn, ms);
  useEffect(() => {
    resetTimeout();
  }, []);
  return { resetTimeout };
}
