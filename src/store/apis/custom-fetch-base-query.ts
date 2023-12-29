import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getAuthorizationHeader } from './authService';




// Add a request interceptor
axios.interceptors.request.use((config: any) => {
    const authorizationHeader = getAuthorizationHeader();
    config['headers'] = {
        ...config.headers,
        ...authorizationHeader,
    };
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});




type AxiosBaseType = {
    baseUrl: string
};

const defaultAxiosBaseParams: AxiosBaseType = {
    baseUrl: '/api/v1/'
}

type BaseQueryFunctionType = {
    url?: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params'],
    error?: boolean,
    errorMessage?: any
}

export const axiosBaseQuery = ({ baseUrl } = defaultAxiosBaseParams): BaseQueryFn<BaseQueryFunctionType, unknown, unknown> =>
    async ({ url, method, data, params, error = false, errorMessage = '' }) => {
        try {
            if (error) {
                return { data: { data: null, status: 400, success: false, message: errorMessage || 'Something Required!'} }
            }
            const result = await axios({ url: baseUrl + url, method, data, params })
            return { data: result.data }
        } catch (axiosError) {
            const err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }
