/**
 * 自定义钩子useFetch，用于在React组件中处理异步数据获取
 * 它封装了fetch API，提供获取响应数据、错误信息和取消请求的功能
 * 
 * @param url - 请求的URL地址，可以是RequestInfo或URL类型
 * @param options - 请求的配置选项，包括请求方法、头部等
 * @returns 返回一个对象，包含响应数据、错误信息和取消请求的方法
 */
const useFetch = (url: RequestInfo | URL, options: RequestInit | undefined) => {
  // 初始化响应状态，初始值为null
  const [response, setResponse] = React.useState(null);
  // 初始化错误状态，初始值为null，表示没有错误
  const [error, setError] = React.useState<null | unknown>(null);
  // 初始化取消请求函数状态，初始值为一个空函数
  const [abort, setAbort] = React.useState<() => void>(() => { });

  // 使用React.useEffect钩子来处理副作用，主要是发起数据请求
  React.useEffect(() => {
    // 定义一个异步函数fetchData，用于处理数据请求
    const fetchData = async () => {
      try {
        // 创建一个AbortController实例，用于控制请求的取消
        const abortController = new AbortController();
        // 获取AbortController的信号，用于在请求中传递取消信号
        const signal = abortController.signal;
        // 更新取消请求函数，现在它关联到AbortController的abort方法
        setAbort(abortController.abort);
        // 发起请求，包含取消信号
        const res = await fetch(url, { ...options, signal });
        // 解析响应的JSON数据
        const json = await res.json();
        // 更新响应状态
        setResponse(json);
      } catch (error) {
        // 捕获请求过程中的错误，并更新错误状态
        setError(error);
      }
    };
    // 执行fetchData函数，发起数据请求
    fetchData();
    // 返回一个清理函数，用于在组件卸载前取消请求
    return () => {
      abort();
    }
  }, []);

  // 返回包含响应数据、错误信息和取消请求方法的对象
  return { response, error, abort };
};