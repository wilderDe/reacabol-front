import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {},
        checking: false,
        logged: false
    },
    reducers:{
        checkingAuth: (state, action) => {
            state.checking = action.payload
        },
        authLogged: (state, action) => {
            state.logged = action.payload
        },
        authLogin:(state, action) => {
            state.auth = action.payload
        },
        authLogout: (state, action) =>  {
            state.auth = {};
        },
    }
})

export const { authLogin, authLogout, checkingAuth, authLogged} = authSlice.actions;