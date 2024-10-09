import React, { useEffect } from "react";
/**
 * 自定义 Hook 用于动态设置和恢复文档标题
 * 
 * 此 Hook 检查是否定义了 document 对象（这是浏览器环境的标志），
 * 并允许在组件挂载时动态设置文档标题，并在组件卸载时恢复原始标题
 * 
 * @param title - 指定要设置的文档标题
 */
const useTitle = (title: string) => {
  const documentDefined = typeof document !== 'undefined'
  const originalTitle = React.useRef(documentDefined ? document.title : '');
  useEffect(() => {
    if (!documentDefined) return;
    if (document.title !== title) document.title = title;
    return () => {
      document.title = originalTitle.current;
    };
  }, [])
}
export default useTitle