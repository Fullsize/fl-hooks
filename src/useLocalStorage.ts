import { useEffect, useState } from 'react'
/**
 * 使用本地存储功能的钩子函数
 * 
 * 此函数用于在React组件中管理本地存储功能它提供了读取、写入和删除本地存储数据的能力
 * 
 * @param key 用于存储数据的键名
 * @param initialValue 初始化值，当本地存储没有数据时使用
 * @returns 返回一个包含当前值、设置值的函数和删除值的函数的元组
 */
function useLocalStorage<T>(key: string, initialValue?: T): [value: T | any, handle: (data: T | any) => void, remove: () => void] {
  // 初始化本地状态，尝试从本地存储获取数据，如果不存在则使用初始值
  const [localState, handleSetState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue ?? ''
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  })

  // 当本地状态或key改变时，自动更新本地存储
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(localState));
    } catch (error) {
      console.error(error);
    }
  }, [key, localState])

  // 删除本地存储的函数
  const remove = () => {
    try {
      window.localStorage.removeItem(key);
      handleSetState('')
    } catch (error) {
      console.error(error);
    }
  }

  // 返回当前值、设置值的函数和删除值的函数
  return [localState, handleSetState, remove]
}
export default useLocalStorage