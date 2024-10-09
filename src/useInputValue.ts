import { useState, useCallback, ChangeEvent } from 'react';
/**
 * 使用useInputValue钩子来管理输入框的值。
 * 
 * 这个钩子接受一个初始值作为参数，并返回当前值和一个onChange处理函数。
 * 它封装了状态管理和事件处理的逻辑，使得在组件中使用输入框的值变得更加简便。
 * 
 * @param initValue 初始值，可以是字符串或数字类型。
 * @returns 返回一个对象，包含当前的值和一个onChange处理函数。
 */
function useInputValue<T extends string | number>(initValue: T) {
  // 定义一个状态来存储当前的值，并提供一个函数来更新这个值。
  const [value, setValue] = useState<T>(initValue)

  // 定义一个onChange事件处理函数，它会在输入框的值改变时被调用。
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // 更新状态为输入框的新值。
    setValue(event.target.value as T)
  }, [])

  // 返回当前的值和onChange处理函数，供组件使用。
  return {
    value,
    onChange
  }
}
export default useInputValue