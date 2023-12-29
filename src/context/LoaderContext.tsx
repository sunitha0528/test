import { CircularProgress, Backdrop } from "@mui/material"
import React, { createContext, useContext, useState } from "react"


const LoaderBackdrop = {
    color: '#fff',
    zIndex: 1350
}



type LoaderTypes = {
    isLoading: boolean,
    setIsLoading: (val: boolean) => void
}

const deafultProviderValues = {
    isLoading: false,
    setIsLoading: () => { }
}

const LoaderContext = createContext<LoaderTypes>(deafultProviderValues)

export const useLoaderContext = () => useContext(LoaderContext);

type LoaderProviderPropTypes = {
    children: React.ReactNode
}

const LoaderProvider = ({ children }: LoaderProviderPropTypes) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            <Backdrop sx={LoaderBackdrop} open={isLoading} >
                <CircularProgress size={50} color="inherit" />
            </Backdrop>
            {children}
        </LoaderContext.Provider>
    )

}

export default LoaderProvider;