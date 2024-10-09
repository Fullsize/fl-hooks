// useRenderCount.js
import { useRef } from 'react';
/**
 * 使用渲染次数钩子
 * 
 * 该钩子用于追踪组件的渲染次数
 * 它通过Ref来保存渲染次数并在每次组件渲染时更新该值
 * 
 * @returns {number} 当前渲染次数
 */
function useRenderCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
}

export default useRenderCount;
