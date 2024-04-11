import { useEffect, useState } from 'react'
import { default as useBaseAxios, Pair } from './useBaseAxios'
import { AxiosRequestConfig, AxiosInstance } from "axios";
import { deepMerge } from '@fullsize/utils';
type useData<T> = [Pair<T>[0], (op?: AxiosRequestConfig) => void]
const useAxios = <T extends any = any>(config: AxiosRequestConfig): useData<T> => {
  const [option, setOption] = useState(config)
  const [state, fetchData] = useBaseAxios(config)
  useEffect(() => {
    fetchData(option)
  }, [option])
  const changeOption = (op?: AxiosRequestConfig) => {
    setOption(deepMerge(option, op));
  };
  return [state, changeOption]
}
useAxios.extend = (ins: AxiosInstance) => {
  useBaseAxios.extend(ins)
};
export default useAxios