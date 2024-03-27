import { AxiosRequestConfig, AxiosInstance } from 'axios';
interface State<T> {
    loading: boolean;
    error: boolean;
    data: T | null;
}
declare function useAxios<T extends any = any>(config: AxiosRequestConfig): [state: State<T>, dispatch: (config: AxiosRequestConfig) => void];
declare namespace useAxios {
    var extend: (ins: AxiosInstance) => void;
}
export default useAxios;
