import { useState, useCallback } from 'react';

export default function useToggle(initValue: boolean) {
  const [value, setValue] = useState(initValue)
  const toggle = useCallback((val?: boolean) => {
    if (val !== undefined) {
      setValue(val)
    } else {
      setValue(!value)
    }

  }, [value])
  return [value, toggle]
}