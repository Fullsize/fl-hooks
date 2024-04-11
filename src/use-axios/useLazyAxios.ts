import { useEffect, useState } from 'react'
import { default as useBaseAxios, Pair } from './useBaseAxios'
import { AxiosRequestConfig, AxiosInstance } from "axios";
import { deepMerge } from '@fullsize/utils';
type useData<T> = [Pair<T>[0], (op?: AxiosRequestConfig) => void]
const useLazyAxios = <T extends any = any>(config: AxiosRequestConfig): useData<T> => {
  const [option, setOption] = useState(config)
  const [isSend, setIsSend] = useState(false)
  const [state, fetchData] = useBaseAxios(config)
  useEffect(() => {
    if (isSend) {
      fetchData(option)
    }

  }, [option, isSend])
  const changeOption = (op?: AxiosRequestConfig) => {
    setOption({ ...deepMerge(option, op) });
    setIsSend(true)
  };
  return [state, changeOption]
}
useLazyAxios.extend = (ins: AxiosInstance) => {
  useBaseAxios.extend(ins)
};
export default useLazyAxios