

import { MenuProps, message } from "antd"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoaderContext } from "./LoaderContext"
import useUserHook from "@hooks/useUserHook"
import { styled } from "styled-components"

import { useAppDispatch, useAppSelector } from "@store/store-hooks"
import { setSideNavMenuItems, setUserDropdownMenuItems } from "@store/features/user-slice"

import { ItemType } from "antd/es/menu/hooks/useItems"
import {
    AppstoreOutlined, FileTextOutlined, TagsOutlined, UserOutlined, LogoutOutlined
} from '@ant-design/icons'
import { useLazyGetUserByTokenQuery } from "@store/apis/auth-api-slice"
import { setUser } from "@store/features/auth-slice"


const iconStyle = {
    fontSize: '20px'
}




// categories roots
const createCategories: ItemType = { key: '/dashboard/categories/create', label: "Create" };
const viewCategories: ItemType = { key: '/dashboard/categories/view', label: "View" };
// sub categories roots
const createSubCategories: ItemType = { key: '/dashboard/categories/createsub', label: "Create Subcategory" };
const viewSubCategories: ItemType = { key: '/dashboard/categories/viewsub', label: "View Subcategory" };


// user management roots
const createUsers: ItemType = { key: '/dashboard/usermanagemant/createuser', label: "Create user" };
const viewUsers: ItemType = { key: '/dashboard/usermanagemant/users', label: "Users" };

// survey roots
const createSurvey: ItemType = { key: '/dashboard/survey/create-using', label: "Create" };
const viewSurvey: ItemType = { key: '/dashboard/survey/view', label: "View" };

// company roots
const createCompany: ItemType = { key: '/dashboard/companies/create', label: "Create" };
const viewCompany: ItemType = { key: '/dashboard/companies/view', label: "View" };



// user roots
const overviewRoot: ItemType = { key: '/dashboard/overview', label: 'Overview', icon: <AppstoreOutlined style={{ ...iconStyle }} /> }
const categoriesRoot: ItemType = {
    key: '/dashboard/categories', label: 'Categories', icon: <TagsOutlined style={{ ...iconStyle }} />,
    children: [createCategories, viewCategories, createSubCategories, viewSubCategories]
}

const companiesRoot: ItemType = {
    key: '/dashboard/companies', label: 'Companies', icon: <i className="bi bi-buildings" style={{ ...iconStyle }} ></i>,
    children: [createCompany, viewCompany]
}

const surveyRoot: ItemType = {
    key: '/dashboard/survey', label: 'Survey', icon: <FileTextOutlined style={{ ...iconStyle }} />,
    children: [createSurvey, viewSurvey]
}
const userManagementRoot: ItemType = {
    key: '/dashboard/usermanagemant', label: 'User Management', icon: <UserOutlined style={{ ...iconStyle }} />,
    children: [createUsers, viewUsers]
}


// user dropdown menu items
const userDropdownMenuItems: MenuProps['items'] = [
    { type: 'divider' },
    { key: '/logout', label: 'Logout', icon: <LogoutOutlined style={{ ...iconStyle }} />, danger: true },
]


type UserTypes = {
    // user: any,
    // setUser: (val: any) => void,
    // refreshAuthUser: () => void
}

const deafultProviderValues = {

}

const UserContext = createContext<UserTypes>(deafultProviderValues)

export const useUserContext = () => useContext(UserContext);

type UserProviderPropTypes = {
    children: React.ReactNode
}
const UserProvider = ({ children }: UserProviderPropTypes) => {

    const navigate = useNavigate();

    const { clearUser, hasToken } = useUserHook();

    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    const { roles } = useAppSelector(state => state.defaults);

    const [trigger] = useLazyGetUserByTokenQuery();

    const getUserByToken = async () => {
        const authUser = await trigger().unwrap();
        if (authUser.status === 200) {
            dispatch(setUser(authUser.data));
        }
    }

    const prepareRoots = () => {
        const userMenuItem = { key: '1', type: 'group', label: `${user?.UserLastName || user?.UserName} ${user?.UserLastName || ''}` };
        dispatch(setUserDropdownMenuItems([userMenuItem, ...userDropdownMenuItems]));

        switch (user?.RoleID) {
            case roles?.superAdmin: {
                const menuItems: MenuProps['items'] = [
                    overviewRoot,
                    categoriesRoot,
                    companiesRoot,
                    surveyRoot,
                    userManagementRoot
                ]

                dispatch(setSideNavMenuItems(menuItems))

            } break;
            case roles?.admin: {

                const menuItems: MenuProps['items'] = [
                    overviewRoot,
                    companiesRoot,
                    surveyRoot,
                    userManagementRoot
                ]

                dispatch(setSideNavMenuItems(menuItems))

            } break;
            case roles?.survayCreator: {

                const menuItems: MenuProps['items'] = [
                    overviewRoot,
                    surveyRoot
                ]

                dispatch(setSideNavMenuItems(menuItems))

            } break;
            default: {
                return false;
            }
        }
    }


    useEffect(() => {
        if (isAuthenticated) {
            console.log("isAuthenticated", isAuthenticated);
            prepareRoots();

        } else {
            if (hasToken()) {
                getUserByToken();
            } else {
                navigate('/');
            }
        }

    }, [isAuthenticated])



    return (
        <UserContext.Provider value={{}}>
            {isAuthenticated ? children : ''}
        </UserContext.Provider>
    )

}

export default UserProvider;