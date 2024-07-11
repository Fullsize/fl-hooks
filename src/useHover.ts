import { useState, useCallback, useRef, useEffect } from 'react';
function useHover(): [(node: HTMLElement | null) => void, boolean] {
  const [isHover, setIsHover] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null)
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      elementRef.current = node
    }
  }, [])
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current?.addEventListener('mouseenter', () => {
        setIsHover(true)
      })
      elementRef.current?.addEventListener('mouseleave', () => {
        setIsHover(false)
      })
    }
    return () => {
      if (elementRef.current) {
        elementRef.current?.removeEventListener('mouseenter', () => {

        })
        elementRef.current?.removeEventListener('mouseleave', () => {

        })
      }
    }
  }, [elementRef.current])
  return [ref, isHover]
}
export default useHover