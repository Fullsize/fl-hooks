import { useState, useCallback } from 'react';
/**
 * 使用自定义钩子实现开关切换功能。
 * 
 * 该钩子返回一个包含当前状态和用于更改状态的函数的数组。
 * 初始状态由传入的initValue参数决定。
 * 使用useCallback钩子优化性能，确保onClick函数在组件重渲染时不会改变，除非依赖项改变。
 * 
 * @param initValue 初始状态值，必须是布尔值。
 * @returns 返回一个数组，第一个元素是当前的状态值，第二个元素是一个函数，用于切换状态或设置特定的状态值。
 */
export default function useToggle(initValue: boolean) {
  const [value, setValue] = useState(initValue)
  const onClick = useCallback((val: boolean) => {
    if (val !== null || val !== undefined) {
      setValue(val)
    } else {
      setValue(!value)
    }

  }, [])
  return [value, onClick]
}