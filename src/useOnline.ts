import { useState, useEffect } from "react";
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
/**
 * 自定义钩子useOnline，用于监听网络连接状态
 * 
 * 该钩子通过监听浏览器的online和offline事件来判断网络连接状态，并相应更新状态
 * 初始化时会根据当前的在线状态设置状态值
 * 
 * @returns 当前的网络连接状态，在线为true，离线为false
 */
const useOnline = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};
export default useOnline