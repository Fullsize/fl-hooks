import { useReducer, useState } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
let axiosInstance: AxiosInstance = axios;
let controller: AbortController | null = null;
export interface State<T> {
  loading: boolean;
  error: unknown | null | any;
  data: T | null;
}
export interface Action {
  type: string;
  payload?: any;
}
enum FETCHTYPE {
  INIT = 'init',
  SUCCESS = 'success',
  FAILURE = 'failure'

}
const dataFetchReducer = <T extends any = any>(state: State<T>, action: Action) => {
  switch (action.type) {
    case FETCHTYPE.INIT:
      return {
        ...state,
        loading: true,

      }
    case FETCHTYPE.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,

      }
    case FETCHTYPE.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      throw new Error();
  }
}
export type Pair<T> = [State<T>, (lazyData?: AxiosRequestConfig) => Promise<void>];
const useBaseAxios = <T extends any = any>(config: AxiosRequestConfig): Pair<T> => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: null,
    data: null,
  });
  const fetchData = async (lazyData?: AxiosRequestConfig) => {
    dispatch({ type: FETCHTYPE.INIT })
    if (!controller) {
      controller = new AbortController()
    }
    try {

      const result = await axiosInstance({ ...(lazyData || config), signal: controller.signal })
      if (!controller.signal.aborted) {
        dispatch({ type: FETCHTYPE.SUCCESS, payload: result.data });
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch({ type: FETCHTYPE.FAILURE, payload: error });
      }
    }
  }
  return [state, fetchData]
}
useBaseAxios.extend = (ins: AxiosInstance) => {
  axiosInstance = ins;
};
export default useBaseAxios