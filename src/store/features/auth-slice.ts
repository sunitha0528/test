import { createSlice } from "@reduxjs/toolkit";

type initialState = {
    user: any,
    isAuthenticated: boolean,
}

const initialState: initialState = {
    user: null,
    isAuthenticated: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setuser
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});



export const {
    setUser,
    logout
} = authSlice.actions;

export default authSlice.reducer;
