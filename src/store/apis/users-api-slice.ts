import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/apis/custom-fetch-base-query';

type UserType = {
    id?: any,
    UserID: number,
    UserName: string,
    FirstName: string,
    LastName: string,
    DOB: string,
    Email: string,
    Password?: string,
    CountryCode: string,
    Phone: string,
};

type UserResponseType = {
    list: UserType[];
    TotalCount: number;
}

type GetAllUsersReqType = {
    pageNo: number,
    pageSize: number
};


export const usersApiSlice = createApi({
    reducerPath: 'userApis',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Users'],
    endpoints: (builder) => {
        return {

            // get all users
            getAllUsers: builder.query<UserResponseType, Partial<GetAllUsersReqType>>({
                query: ({ pageNo, pageSize }) => ({ url: `users/getAll?pageNo=${pageNo}&pageSize=${pageSize}`, method: 'get' }),
                providesTags: (result) => [{ type: 'Users', id: 'LIST' }],
                transformResponse: (res: any) => { return res.data },
            }),

            // get user by id
            getUserById: builder.query<UserType, Partial<number>>({
                query: (id) => {
                    if (id) {
                        return { url: `users/getById/${id}`, method: 'get' }
                    } else {
                        return { error: true, errorMessage: 'Id is required' }
                    }
                },
                transformResponse: (res: any) => { return res.data },
                providesTags: (result) => [{ type: 'Users', id: result?.UserID }]
            }),

            //get users by role
            getUsersByRole: builder.query<UserType[], Partial<number>>({
                query: (id) => {
                    if (id) {
                        return { url: `users/getByRole/${id}`, method: 'get' }
                    } else {
                        return { error: true, errorMessage: 'Id is required' }
                    }
                },
                transformResponse: (res: any) => (res.data),
                // providesTags: (result) => [{ type: 'Users', id: 'LIST' }]
            }),

            // add user
            addUser: builder.mutation<UserType, Partial<UserType>>({
                query: (data) => ({ url: 'users/add', method: 'post', data }),
                invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            }),

            //update user by id
            updateUser: builder.mutation<UserType, Partial<UserType>>({
                query: (data) => ({ url: 'users/update', method: 'put', data }),
                invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            }),

            //delete user by id
            deleteUser: builder.mutation<UserType, Partial<number>>({
                query: (id) => ({ url: `users/delete/${id}`, method: 'delete' }),
                invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            }),

        }
    }
})


export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useGetUsersByRoleQuery,
    useLazyGetUsersByRoleQuery, // lazy query
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice;