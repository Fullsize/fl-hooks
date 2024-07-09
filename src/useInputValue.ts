import { useState, useCallback, ChangeEvent } from 'react';
function useInputValue<T extends string | number>(initValue: T) {
  const [value, setValue] = useState<T>(initValue)
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T)
  }, [])
  return {
    value,
    onChange
  }
}
export default useInputValue