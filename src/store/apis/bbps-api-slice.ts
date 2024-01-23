import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/apis/custom-fetch-base-query';


type TgetBillerList = {
    category: string,
}

export const bbpsApiSlice = createApi({
    reducerPath: 'BBPSApis',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['BBPS'],
    endpoints: (builder) => {
        return ({
            getBillerDetails: builder.query<any, void>({
                query: () => ({ url: `bbps/bill/getBillerList`, method: 'get' }),
                transformResponse: (res: any) => { return res },
            }),
            getBillerCategoryList: builder.mutation<TgetBillerList, Partial<TgetBillerList>>({
                query: (data:any) => ({ url: `bbps/bill/getBillerAllDetailsByCategoryName`, method: 'post',data  }),
                invalidatesTags: [{ type: 'BBPS', id: 'LIST' }],
                // transformResponse: (res: any) => { return res },
            }),
        })

    }
});

export const {
    useGetBillerDetailsQuery,
    useGetBillerCategoryListMutation
 } = bbpsApiSlice;