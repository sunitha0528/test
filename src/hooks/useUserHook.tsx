

import React from 'react'
// import useDataConverter from './useDataConverter';

// const authenticatedUserKey = "authenticatedUser"
const authToken = "authToken"


const useUserHook = () => {

    // const { encrypt, decrypt } = useDataConverter()

    const setToken = (token: string) => {
        localStorage.setItem(authToken, token);
    }

    const hasToken = () => {
        return !!localStorage.getItem(authToken);
    }

    // const hasUser = () => {
    //     return !!localStorage.getItem(authenticatedUserKey);
    // }

    // const setUser = async (user: any) => {
    //     const encriptedUser = await encrypt(user);
    //     localStorage.setItem(authenticatedUserKey, encriptedUser);
    // }

    const getToken = () => {
        if (hasToken()) {
            return localStorage.getItem(authToken);
        } else {
            return null
        }
    }

    // const getUser = async () => {
    //     if (hasToken() && hasUser()) {
    //         const encriptedUser = localStorage.getItem(authenticatedUserKey) || '';
    //         const decriptedUser = await decrypt(encriptedUser);
    //         return decriptedUser;
    //     } else {
    //         return null
    //     }
    // }

    const clearUser = () => {
        localStorage.clear();
        // localStorage.removeItem(authenticatedUserKey);
    }

    return {
        setToken, 
        hasToken,
        // hasUser, setUser, getUser, 
        getToken, 
        clearUser
    }
}

export default useUserHook;