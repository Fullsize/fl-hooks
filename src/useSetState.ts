import { useCallback, useState } from 'react';
/**
 * 自定义 Hook，用于管理具有设置状态功能的状态。
 * 
 * @param initialState 初始状态，用于在组件首次渲染时设置状态的初始值。
 * @returns 一个由当前状态和更新状态函数组成的元组数组。
 *          - state: 当前的状态值。
 *          - updateState: 一个用于更新状态的函数，接受一个新的状态对象或一个状态更新函数。
 */
const useSetState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  // 更新状态函数
  const updateState = useCallback((newState: Partial<T> | ((prevState: T) => Partial<T> | T)) => {
    setState((prevState) =>
      typeof newState === 'function'
        ? { ...prevState, ...newState(prevState) } // 如果是对象，合并新状态；否则替换整个状态
        : typeof newState === 'object'
          ? { ...prevState, ...newState }
          : (newState as T) // 直接替换非对象类型的状态
    );
  }, []);

  return [state, updateState] as const;
};

export default useSetState;
