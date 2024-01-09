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

type signUpUserTypeOtpVerify = {
    token: string,
    otp: string
}

type userLoginType = {
    Email: string,
    Password: string
}

type UserResponseType = {
    list: UserType[];
    TotalCount: number;
}

type GetAllUsersReqType = {
    pageNo: number,
    pageSize: number
};

type operatorAndCirle = {
    operator: any[],
    circle: any[]
}

type peratorAndCircleReqType = {
    mobile?: string,
    operator?: string,
    circle?: string
}

type doRechargeReqType = {
    operator?: number,
    canumber?: number,
    amount?:number,
    circle?: string,
}

type responseType  = {
    message: string,
    status: number,
    success: boolean,
    data?: any,
    error:string


} 

type fetchBillerDetailsReqType = {
    operator: number,    
    canumber: string
    ad1: string
}

type walletDetailsReqType = {
    amount: number
}

export const usersApiSlice = createApi({
    reducerPath: 'userApis',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Users'],
    endpoints: (builder) => {
        return {

            // get all users
            getAllUsers: builder.query<UserResponseType, Partial<GetAllUsersReqType>>({
                query: ({ pageNo, pageSize }) => ({ url: `users/getAll?pageNo=${pageNo}&pageSize=${pageSize}`, method: 'get' }),
                providesTags: () => [{ type: 'Users', id: 'LIST' }],
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
                query: (data) => ({ url: 'user/addUserAndGenerateOtp', method: 'post', data }),
                invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            }),
            addUserVerifyOtp: builder.mutation<signUpUserTypeOtpVerify, Partial<signUpUserTypeOtpVerify>>({
                query: (data) => ({ url: 'user/addUserVerifyOtp', method: 'post', data }),
                invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            }),
            userLogin: builder.mutation<userLoginType, Partial<userLoginType>>({
                query: (data) => ({ url: 'user/login', method: 'post', data }),
                invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            }),
            userLoginOtpVerify: builder.mutation<signUpUserTypeOtpVerify, Partial<signUpUserTypeOtpVerify>>({
                query: (data) => ({ url: 'user/loginVerifyOtp', method: 'post', data }),
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


            // bbps api Recharge

            getOperatorAndCircle: builder.query<operatorAndCirle, void>({
                query: () => ({ url: `bbps/recharge/getOperatorsAndCircles`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
            }),
            getDefaultOperatorAndCircle: builder.mutation<peratorAndCircleReqType, Partial<peratorAndCircleReqType>>({
                query: (data) => ({ url: `bbps/recharge/fetchhlr`, method: 'post',data }),
                transformResponse: (res: any) => { return res.data },
            }),
            getRechargePlans: builder.mutation<peratorAndCircleReqType, Partial<peratorAndCircleReqType>>({
                query: (data) => ({ url: `bbps/recharge/getPlans`, method: 'post',data }),
                transformResponse: (res: any) => { return res.data },
            }),
            doRecharge: builder.mutation<responseType, Partial<doRechargeReqType>>({
                query: (data) => ({ url: `bbps/recharge/doRecharge`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),

            // bbps api DTH
            getDTHOperators: builder.query<operatorAndCirle, void>({
                query: () => ({ url: `bbps/DTH/operators`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
            }),

            // bbps api biller list
            getBillsOperators: builder.query<operatorAndCirle, void>({
                query: () => ({ url: `bbps/bill/operators`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
            }),

            fetchBillerDetails: builder.mutation<fetchBillerDetailsReqType, Partial<fetchBillerDetailsReqType>>({
                query: (data) => ({ url: `bbps/bill/fetchBill`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),
            billPayment: builder.mutation<any, Partial<any>>({
                query: (data) => ({ url: `bbps/bill/billPayment`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),

            walletDetails: builder.mutation<walletDetailsReqType, Partial<walletDetailsReqType>>({
                query: (data) => ({ url: `payment/createOrder`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),
            getBalance: builder.query<any, void>({
                query: () => ({ url: `payment/getBalance`, method: 'get' }),
                transformResponse: (res: any) => { return res },
            }),
            accountVerification: builder.mutation<any, Partial<any>>({
                query: (data) => ({ url: `payment/verifyBankAccount`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),
            addBankAccount: builder.mutation<any, Partial<any>>({
                query: (data) => ({ url: `payment/addBankAccount`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),
            getBankAccounts: builder.mutation<any, Partial<any>>({
                query: (data) => ({ url: `payment/getBankAccounts`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),
            payouts: builder.mutation<any, Partial<any>>({
                query: (data) => ({ url: `payment/payouts`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
            }),
            getTransactionsByPayOutID: builder.mutation<any, Partial<any>>({
                query: (data) => ({ url: `payment/getTransactionsByPayOutID`, method: 'post',data }),
                transformResponse: (res: any) => { return res },
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
    useDeleteUserMutation,
    useAddUserVerifyOtpMutation,
    useUserLoginMutation,
    useUserLoginOtpVerifyMutation,
    useGetOperatorAndCircleQuery,
    useGetDefaultOperatorAndCircleMutation,
    useGetRechargePlansMutation,
    useDoRechargeMutation,
    useGetDTHOperatorsQuery,
    useGetBillsOperatorsQuery,
    useFetchBillerDetailsMutation,
    useBillPaymentMutation,
    useWalletDetailsMutation,
    useGetBalanceQuery,
    useAccountVerificationMutation,
    useAddBankAccountMutation,
    useGetBankAccountsMutation,
    usePayoutsMutation,
    useGetTransactionsByPayOutIDMutation
} = usersApiSlice;