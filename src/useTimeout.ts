import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @description: 自定义 Hook，用于管理定时器
 * @param {Function} fn 执行的回调方法
 * @param {number} ms 毫秒数
 * @return {*}
 */
export default function useTimeout(fn: Function, ms: number) {
  const [timerId, setTimerId] = useState<number | null>(null);
  const fnRef = useRef<Function>(fn);

  // 更新回调函数
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // 设置定时器
  const startTimeout = useCallback(() => {
    const id = window.setTimeout(() => {
      fnRef.current();
      setTimerId(null);
    }, ms);
    setTimerId(id);
  }, [ms]);

  // 清除定时器
  const clearTimer = useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  }, [timerId]);

  // 在组件卸载时清除定时器
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  // 重置定时器
  const resetTimeout = useCallback(() => {
    clearTimer();
    startTimeout();
  }, [clearTimer, startTimeout]);

  return [resetTimeout, clearTimer];
}
