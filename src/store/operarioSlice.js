import { createSlice } from "@reduxjs/toolkit";


export const operarioSlice = createSlice({
    name: 'operario',
    initialState: {
        tomar_trabajo: {}  
    },
    reducers:{
        tomarTrabajo:(state, action) => {
            state.tomar_trabajo = action.payload
        },  

    }
})

export const { tomarTrabajo } = operarioSlice.actions;