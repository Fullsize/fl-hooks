import React, { ReactNode, useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom"; // Common API for React 17 & 18
// usePortal.ts
import { createRoot as _createRoot } from 'react-dom/client'; // 确保从正确的模块导入

// 使用一个变量来缓存结果，避免多次调用时重复计算
const isReact18: boolean = typeof _createRoot === 'function';

interface Portal {
  render: (children: ReactNode) => React.ReactPortal | null;
  remove: () => void;
}

const usePortal = (el: HTMLElement | null): ((children: ReactNode) => React.ReactPortal | null) => {
  const [portal, setPortal] = useState<Portal>({
    render: () => null,
    remove: () => null,
  });

  const createPortal = useCallback((el: HTMLElement) => {
    if (isReact18) {
      // React 18 path
      const root = (ReactDOM as any).createRoot(el); // TypeScript workaround for React 18

      const Portal = ({ children }: { children: ReactNode }) => {
        root.render(children);
        return null;
      };

      const remove = () => {
        root.unmount(); // React 18 unmount API
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      };

      return { render: Portal, remove };
    } else {
      // React 17 path
      const Portal = ({ children }: { children: ReactNode }) =>
        ReactDOM.createPortal(children, el);

      const remove = () => {
        ReactDOM.unmountComponentAtNode(el); // React 17 API
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      };

      return { render: Portal, remove };
    }
  }, []);

  useEffect(() => {
    if (el) {
      portal.remove(); // Clean up any previous portal
      const newPortal: any = createPortal(el);
      setPortal(newPortal);

    }
    return () => {
      portal.remove(); // Clean up the portal on unmount or when `el` changes
    };
  }, [el, createPortal, portal]);

  return portal.render;
};

export default usePortal;
