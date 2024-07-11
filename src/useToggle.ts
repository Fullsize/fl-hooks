import { useState, useCallback } from 'react';
/**
 * 使用自定义钩子实现开关切换功能。
 * 
 * 该钩子返回一个当前状态和一个用于切换状态的函数。初始状态由传入的initValue参数决定。
 * 切换函数可以接受一个布尔值来显式设置状态，如果不传入值，则状态会反转。
 * 
 * @param initValue 初始状态值，必须是布尔值。
 * @returns 返回一个数组，包含当前状态值和切换状态的函数。
 */
export default function useToggle(initValue: boolean): [boolean, (val?: boolean) => void] {
  const [value, setValue] = useState(initValue)
  const toggle = useCallback((val?: boolean) => {
    if (val !== undefined) {
      setValue(val)
    } else {
      setValue(!value)
    }

  }, [value])
  return [value, toggle]
}