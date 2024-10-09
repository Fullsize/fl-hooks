import { useState, useCallback, useRef, useEffect } from 'react';
/**
 * 使用悬停检测的自定义钩子
 * 该钩子返回一个引用和一个布尔值，表示元素是否处于悬停状态
 * 
 * @returns {[(node: HTMLElement | null) => void, boolean]} 包含ref函数和悬停状态的元组
 */
function useHover(): [(node: HTMLElement | null) => void, boolean] {
  // 悬停状态管理
  const [isHover, setIsHover] = useState(false);
  // 用于存储DOM元素的引用
  const elementRef = useRef<HTMLElement | null>(null)
  // 创建一个ref回调函数，用于设置元素引用
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      elementRef.current = node
    }
  }, [])
  // 监听元素的鼠标进入和离开事件，以更新悬停状态
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current?.addEventListener('mouseenter', () => {
        setIsHover(true)
      })
      elementRef.current?.addEventListener('mouseleave', () => {
        setIsHover(false)
      })
    }
    // 组件卸载时，移除事件监听器
    return () => {
      if (elementRef.current) {
        elementRef.current?.removeEventListener('mouseenter', () => { })
        elementRef.current?.removeEventListener('mouseleave', () => { })
      }
    }
  }, [elementRef.current])
  // 返回ref函数和悬停状态
  return [ref, isHover]
}
export default useHover