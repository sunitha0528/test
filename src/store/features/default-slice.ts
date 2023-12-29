import { createSlice } from "@reduxjs/toolkit";


type RoleTypes = {
    superAdmin: number,
    admin: number,
    moderate: number,
    survayCreator: number,
    viewer: number
}

type initialState = {
    roles: RoleTypes,
}

const initialState: initialState = {
    roles: {
        superAdmin: 1,
        admin: 2,
        moderate: 3,
        survayCreator: 4,
        viewer: 5
    },
}


const defaultSlice = createSlice({
    name: 'defaults',
    initialState,
    reducers: {

    },

});


// export const {  } = defaultSlice.actions;

export default defaultSlice.reducer;
