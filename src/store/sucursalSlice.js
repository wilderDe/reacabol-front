import { createSlice } from "@reduxjs/toolkit";


export const sucursalSlice = createSlice({
    name: 'sucursal',
    initialState: {
        items: []
    },
    reducers:{
        addSucursal: (state, action) => {
            state.items = action.payload
        },
    }
})

export const { addSucursal } = sucursalSlice.actions;