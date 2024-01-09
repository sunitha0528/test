import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/apis/custom-fetch-base-query';
type RoleType = [
    RoleID: number,
    RoleName: string,
    IsActive: boolean,
    RoleCreatedBy: number,
    RoleCreatedDate: Date
]
type RoleResponseType = RoleType[];


type CategoriesType = {
    categoryID: number,
    CategoryName: string,
    CategoryDescription: string,
    IsActive: boolean,
    CategoryCreatedBy: number,
    CategoryCreatedDate: Date
}
type AddCategoriesType = {
    CategoryName: string,
    CategoryDescription: string,
}
type CategoriesResponseType = CategoriesType[];


type SubCategoriesType = {
    CategoryID: 1,
    subCategoryID: number,
    SubCategoryName: string,
    SubCategoryDescription: string,
    IsActive: boolean,
    SubCategoryCreatedBy: number,
    SubCategoryCreatedDate: Date
}

type AddSubCategoriesType = {
    CategoryID: string,
    SubCategoryName: string,
    SubCategoryDescription: string,
}

type SubCategoriesResponseType = SubCategoriesType[];


export const defaultsApiSlice = createApi({
    reducerPath: 'defaultApis',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Roles', 'Categories', 'SubCategories'],
    endpoints: (builder) => {
        return {

            // get all roles
            getRoles: builder.query<RoleResponseType, void>({
                query: () => ({ url: `getRoles`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
                // providesTags: (result) => [{ type: 'Roles', id: 'LIST' }]
                providesTags: () => [{ type: 'Roles', id: 'LIST' }]
            }),


            // get all categories
            getCategories: builder.query<CategoriesResponseType, void>({
                query: () => ({ url: `categories/getAll`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
                providesTags: () => [{ type: 'Categories', id: 'LIST' }]
            }),

            // add categories
            addCategories: builder.mutation<AddCategoriesType, Partial<AddCategoriesType>>({
                query: (data) => ({ url: 'categories/add', method: 'post', data }),
                invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            }),

            //update categories by id
            updateCategories: builder.mutation<CategoriesType, Partial<CategoriesType>>({
                query: (data) => ({ url: 'categories/update', method: 'put', data }),
                invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            }),

            // delete categories by id
            deleteCategories: builder.mutation<CategoriesType, Partial<number>>({
                query: (id) => ({ url: `categories/delete/${id}`, method: 'delete' }),
                invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            }),



            //sub categories
            // get all sub categories
            getSubCategories: builder.query<SubCategoriesResponseType, void>({
                query: () => ({ url: `subcategories/getAll`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
                providesTags: () => [{ type: 'SubCategories', id: 'LIST' }]
            }),

            // getsubcategrories by category id
            getSubCategoriesByCategoryID: builder.query<SubCategoriesResponseType, Partial<number>>({
                query: (id) => ({ url: `subcategories/getByCategory/${id}`, method: 'get' }),
                transformResponse: (res: any) => { return res.data },
                providesTags: () => [{ type: 'SubCategories', id: 'LIST' }]
            }),


            // add sub categories
            addSubCategories: builder.mutation<AddSubCategoriesType, Partial<AddSubCategoriesType>>({
                query: (data) => ({ url: 'subcategories/add', method: 'post', data }),
                invalidatesTags: [{ type: 'SubCategories', id: 'LIST' }],
            }),

            //update sub categories by id
            updateSubCategories: builder.mutation<SubCategoriesType, Partial<SubCategoriesType>>({
                query: (data) => ({ url: 'subcategories/update', method: 'put', data }),
                invalidatesTags: [{ type: 'SubCategories', id: 'LIST' }],
            }),

            // delete sub categories by id
            deleteSubCategories: builder.mutation<SubCategoriesType, Partial<number>>({
                query: (id) => ({ url: `subcategories/delete/${id}`, method: 'delete' }),
                invalidatesTags: [{ type: 'SubCategories', id: 'LIST' }],
            }),


        }
    }
})



export const {
    useGetRolesQuery,

    // categories
    useGetCategoriesQuery,
    useAddCategoriesMutation,
    useUpdateCategoriesMutation,
    useDeleteCategoriesMutation,

    // sub categories
    useGetSubCategoriesQuery,
    useGetSubCategoriesByCategoryIDQuery,
    useLazyGetSubCategoriesByCategoryIDQuery,
    useAddSubCategoriesMutation,
    useUpdateSubCategoriesMutation,
    useDeleteSubCategoriesMutation,


} = defaultsApiSlice;