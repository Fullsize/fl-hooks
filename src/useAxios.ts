import { useState, useEffect, useReducer } from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  CancelTokenSource,
} from 'axios';

interface State<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}
interface Action {
  type: string;
  payload?: any;
}
let axiosInstance: AxiosInstance = axios;
const cancelTokenSource: CancelTokenSource | null = null;
const dataFetchReducer = <T extends any = any>(state: State<T>, action: Action): State<T> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
function useAxios<T extends any = any>(
  config: AxiosRequestConfig,
): [state: State<T>, dispatch: (config: AxiosRequestConfig) => void] {
  const [option, setOption] = useState(config);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        // Cancel previous request
        if (cancelTokenSource) {
          cancelTokenSource.cancel('Operation canceled due to new request.');
        }
        const result = await axiosInstance({
          ...config,
          cancelToken: cancelTokenSource?.token,
        });
        if (!abortController.signal.aborted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Operation canceled due to component unmount.');
      }
    };
  }, [option]);
  const changeOption = (op: AxiosRequestConfig) => {
    setOption({
      ...option,
      ...op,
    });
  };
  return [state, changeOption];
}
useAxios.extend = (ins: AxiosInstance) => {
  axiosInstance = ins;
};
export default useAxios;
