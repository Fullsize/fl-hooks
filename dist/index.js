(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('axios')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["fl-hooks"] = {}, global.react, global.axios));
})(this, (function (exports, react, axios) { 'use strict';

    let axiosInstance = axios;
    const cancelTokenSource = null;
    const dataFetchReducer = (state, action) => {
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
    function useAxios(config) {
        const [option, setOption] = react.useState(config);
        const [state, dispatch] = react.useReducer(dataFetchReducer, {
            loading: false,
            error: false,
            data: null,
        });
        react.useEffect(() => {
            const abortController = new AbortController();
            const fetchData = async () => {
                dispatch({ type: 'FETCH_INIT' });
                try {
                    // Cancel previous request
                    if (cancelTokenSource) ;
                    const result = await axiosInstance({
                        ...config,
                        cancelToken: cancelTokenSource?.token,
                    });
                    if (!abortController.signal.aborted) {
                        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                    }
                }
                catch (error) {
                    if (!axios.isCancel(error)) {
                        dispatch({ type: 'FETCH_FAILURE' });
                    }
                }
            };
            fetchData();
            return () => {
            };
        }, [option]);
        const changeOption = (op) => {
            setOption({
                ...option,
                ...op,
            });
        };
        return [state, changeOption];
    }
    useAxios.extend = (ins) => {
        axiosInstance = ins;
    };

    function useLocalStorage(key, initialValue) {
        const [localState, handleSetState] = react.useState(() => {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue ?? '';
            }
            catch (error) {
                console.error(error);
                return initialValue;
            }
        });
        react.useEffect(() => {
            try {
                window.localStorage.setItem(key, JSON.stringify(localState));
            }
            catch (error) {
                console.error(error);
            }
        }, [key, localState]);
        const remove = () => {
            try {
                window.localStorage.removeItem(key);
                handleSetState('');
            }
            catch (error) {
                console.error(error);
            }
        };
        return [localState, handleSetState, remove];
    }

    exports.useAxios = useAxios;
    exports.useLocalStorage = useLocalStorage;

}));
