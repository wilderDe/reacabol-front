import { createSlice } from "@reduxjs/toolkit";


export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        online: false,  
    },
    reducers:{
        addSocket:(state, action) => {
            state.socket = action.payload
        },
        onOnline: (state, action) =>  {
            state.online = action.payload
        },
        onDisconnet: (state, action) => {
            state.online = action.payload
        }
    }
})

export const { onOnline, onDisconnet, addSocket } = socketSlice.actions;