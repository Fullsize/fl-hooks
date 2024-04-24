import { DependencyList, useEffect } from 'react';
import { useTimeout } from './index'
/**
 * 使用防抖逻辑来调用函数。
 * @param fn 要防抖的函数。
 * @param ms 防抖时间，单位为毫秒，默认为0。
 * @param deps 依赖项列表，默认为空数组。当依赖项改变时，将重新设置防抖计时。
 * @returns 返回一个数组，包含一个重置防抖计时器的函数。
 */
export default function useDebounce(fn: Function, ms: number = 0, deps: DependencyList = []) {
  const [resetTimeout] = useTimeout(fn, ms)
  useEffect(resetTimeout, deps)
  return [resetTimeout]
}