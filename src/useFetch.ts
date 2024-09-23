import React from "react";
const useFetch = (url: RequestInfo | URL, options: RequestInit | undefined) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState<null | unknown>(null);
  const [abort, setAbort] = React.useState<() => void>(() => { });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(abortController.abort);
        const res = await fetch(url, { ...options, signal });
        const json = await res.json();
        setResponse(json);
      } catch (error: unknown) {
        setError(error);
      }
    };
    fetchData();
    return () => {
      abort();
    }
  }, []);

  return { response, error, abort };
};
export default useFetch;