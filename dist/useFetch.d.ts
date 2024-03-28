/// <reference types="react" />
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
declare const useFetch: (url: Url, config: Config) => ({
    loading: boolean;
    error: boolean;
    data: any;
} | import("react").Dispatch<import("react").SetStateAction<Config>>)[];
export default useFetch;
