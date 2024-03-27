type Url = RequestInfo | URL | string;
interface Config extends RequestInit {
    data?: {
        [x: string]: any;
    };
    params?: {
        [x: string]: any;
    };
    headers?: RequestInit['headers'] | Record<string, string>;
    cache?: RequestInit['cache'];
    baseURL?: string;
}
declare const useFetch: (url: Url, config: Config) => any[];
export default useFetch;
