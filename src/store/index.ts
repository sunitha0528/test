import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './features/auth-slice';
import defaultSliceReducer from './features/default-slice';

import { defaultsApiSlice } from './apis/defaults-api-slice';
import { usersApiSlice } from './apis/users-api-slice';
import { authApiSlice } from './apis/auth-api-slice';
import { bbpsApiSlice } from './apis/bbps-api-slice';


export const store = configureStore({
    reducer: {
        defaults: defaultSliceReducer,
        auth: authSliceReducer,
        [defaultsApiSlice.reducerPath]: defaultsApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
        [bbpsApiSlice.reducerPath]: bbpsApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat([
            defaultsApiSlice.middleware,
            authApiSlice.middleware,
            usersApiSlice.middleware,
            bbpsApiSlice.middleware,
        ])
    },
    
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
