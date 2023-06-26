import { createSlice } from "@reduxjs/toolkit";


export const materialesSlice = createSlice({
    name: 'material',
    initialState: {
        materiales: []
    },
    reducers:{
        addMateriales: (state, action) => {
            state.materiales = action.payload
        },
    }
})

export const { addMateriales } = materialesSlice.actions;