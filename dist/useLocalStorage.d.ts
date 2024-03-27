declare function useLocalStorage<T>(key: string, initialValue?: T): [value: T | any, handle: (data: T | any) => void, remove: () => void];
export default useLocalStorage;
