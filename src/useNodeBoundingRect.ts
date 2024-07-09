import { useState, useRef, useCallback, useEffect } from 'react';
/**
 * 使用useMeasure钩子来创建一个引用(ref)，该引用可以用于监测其大小变化的DOM元素。
 * 返回一个数组，包含三个元素：
 * 1. 一个函数，用于将传入的DOM节点与resize observer关联起来。
 * 2. 一个DOMRect对象，表示关联节点的当前大小，如果节点尚未被观察，则为null。
 * 3. 一个函数，用于清理resize observer的观察，以避免内存泄漏。
 * 
 * @returns 返回一个数组，包含引用函数、大小信息和清理函数。
 */
export default function useMeasure(): [
  (node: HTMLElement | null) => void,
  DOMRectReadOnly | null,
  () => void,
] {
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const ref = useCallback((node: HTMLElement | null) => {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
    }
    if (node !== null) {
      resizeObserver.current = new ResizeObserver((entries) => {
        setRect(entries[0].contentRect);
      });
      resizeObserver.current.observe(node);
    }
  }, []);
  const cleanObserver = useCallback(() => {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
      resizeObserver.current = null;
    }
  }, []);
  useEffect(() => {
    return () => {
      cleanObserver();
    };
  }, [cleanObserver]);
  return [ref, rect, cleanObserver];
}
