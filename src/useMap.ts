import React from "react";
const useMap = (initialValue = []) => {
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