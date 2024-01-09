
import useDataConverter from './useDataConverter';

// const authenticatedUserKey = "authenticatedUser"
const authToken = "token"


const useUserHook = () => {

    // const { encrypt, decrypt } = useDataConverter()
    const { decrypt } = useDataConverter()

    const setToken = (token: string) => {
        localStorage.setItem(authToken, token);
    }

    const hasToken = () => {
        return !!localStorage.getItem(authToken);
    }
    const getToken = () => {
        if (hasToken()) {
            return localStorage.getItem(authToken);
        } else {
            return null
        }
    }
    const getDecryptData = async () => {
        try{
        // const key = localStorage.getItem(authToken) || '';
        // console.log("key",key)
        // const data:any = decrypt(key)
        // console.log('data:',data)
        // return JSON.parse(data)
        const key = localStorage.getItem(authToken) || '';
        const data:any = decrypt(key)
        return data;
        }
        catch(e:any){
            console.log(e.message)
            return {}
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
        clearUser,
        getDecryptData
    }
}

export default useUserHook;