import { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
export default function useEcharts(): [echarts.ECharts | null, any] {
  const [element, ref] = useState(null)
  const [chatRef, setchatRef] = useState<echarts.ECharts | null>(null)
  useEffect(() => {
    if (element) {
      const chat = echarts.init(element)
      setchatRef(chat)
    }
    return () => {
      chatRef?.dispose()
    }
  }, [element])
  return [chatRef, ref]
}