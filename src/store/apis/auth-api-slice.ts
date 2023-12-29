import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/apis/custom-fetch-base-query';

export type LoginPayloadType = {
    Email?: string,
    Password: string,
    Phone?: string,
    UserName?: string,
};



export const authApiSlice = createApi({
    reducerPath: 'authApis',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Auth'],
    endpoints: (builder) => {
        return {
            login: builder.mutation<any, Partial<LoginPayloadType>>({
                query: (data) => ({ url: 'auth/login', method: 'post', data }),
                invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
            }),
            register: builder.mutation<any, Partial<LoginPayloadType>>({
                query: (data) => ({ url: 'auth/register', method: 'post', data }),
                invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
            }),
            getUserByToken: builder.query<any, void>({
                query: () => ({ url: 'auth/user', method: 'get' }),
            }),
        }
    }
})


export const {
    useLoginMutation,
    useRegisterMutation,
    // useGetUserByTokenQuery,
    useLazyGetUserByTokenQuery
} = authApiSlice;