
import { useEffect, useState, useReducer } from "react";
type Url = RequestInfo | URL | string
interface Config extends RequestInit {
  data?: { [x: string]: any }
  params?: { [x: string]: any }
  headers?: RequestInit['headers'] | Record<string, string>
  cache?: RequestInit['cache']
  baseURL?: string;
}
interface State<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
}
interface Action {
  type: string;
  payload?: any;
}
const dataFetchReducer = <T extends any = any>(state: State<T>, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error();
  }
};
function appendToUrl(url: string, obj: { [x: string]: any; } | undefined) {
  if (!obj) {
    return url
  }
  // 解析原始 URL，获取 URL 和查询参数
  const urlParts = url.split('?');
  const baseUrl = urlParts[0];
  let queryString = urlParts[1] || '';

  // 解析查询参数为对象
  const originalParams: { [x: string]: any } = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      originalParams[key] = value
    });
  }

  // 将要添加的对象合并到原始的查询参数中
  Object.keys(obj).forEach(key => {
    originalParams[key] = obj[key];
  });

  // 构建更新后的查询参数字符串
  queryString = Object.keys(originalParams).map(key => {
    return key + '=' + originalParams[key]
  }).join('&');

  // 构建更新后的 URL
  let updatedUrl = baseUrl;
  if (queryString) {
    updatedUrl += '?' + queryString;
  }

  return updatedUrl;
}
const useFetch = (url: Url, config: Config) => {
  const [option, setOption] = useState(config);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: null,
  });
  useEffect(() => {
    const abortController = new AbortController();
    const baseURL = option.baseURL || ''

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await fetch(appendToUrl(baseURL + url, option.params), {
          ...option,
          body: JSON.stringify(option.data),


        });
        if (!abortController.signal.aborted) {
          const data = await result.json();
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
    fetchData();
    return () => {
      abortController.abort()
    };
  }, [option])
  return [state, setOption]
}
export default useFetch