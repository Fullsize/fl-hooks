import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue?: T): [value: T | any, handle: (data: T | any) => void, remove: () => void] {
  const [localState, handleSetState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue ?? ''
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  })
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(localState));
    } catch (error) {
      console.error(error);
    }
  }, [key, localState])
  const remove = () => {
    try {
      window.localStorage.removeItem(key);
      handleSetState('')
    } catch (error) {
      console.error(error);
    }
  }
  return [localState, handleSetState, remove]
}

export default useLocalStorage