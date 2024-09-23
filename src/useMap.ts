import React from "react";
/**
 * 使用 Map 对象的钩子，用于在 React 组件中管理键值对数据
 * @param initialValue Map 的初始值，默认为空数组
 * @returns 返回一个 Map 对象和一组操作该 Map 对象的方法
 */
const useMap = (initialValue = []): [Map<unknown, unknown>, { set: (key: unknown, value: unknown) => void, remove: (key: unknown) => void; clear: () => void; }] => {
  const [map, setMap] = React.useState(() => new Map(initialValue));

  const actions = React.useMemo(() => ({
    set: (key: unknown, value: unknown) =>
      setMap(prevMap => {
        const nextMap = new Map(prevMap);
        nextMap.set(key, value);
        return nextMap;
      }),
    remove: (key: unknown) =>
      setMap(prevMap => {
        const nextMap = new Map(prevMap);
        nextMap.delete(key);
        return nextMap;
      }),
    clear: () => setMap(new Map()),
  }), []);

  return [map, actions];
};
export default useMap;