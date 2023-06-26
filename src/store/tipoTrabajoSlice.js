import { createSlice } from "@reduxjs/toolkit";


export const tipoTrabajoSlice = createSlice({
    name: 'tipoTrabajo',
    initialState: {
        itemsTipoTrabajo: []
    },
    reducers:{
        addTipoTrabajo: (state, action) => {
            state.itemsTipoTrabajo = action.payload
        },
        
    }
})

export const { addTipoTrabajo } = tipoTrabajoSlice.actions;