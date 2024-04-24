import { DependencyList, useEffect } from 'react';
import { useTimeout } from './index'
export default function useDebounce(fn: Function, ms: number = 0, deps: DependencyList = []) {
  const [resetTimeout] = useTimeout(fn, ms)
  useEffect(resetTimeout, deps)
  return [resetTimeout]
}