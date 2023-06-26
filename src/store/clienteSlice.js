import { createSlice } from "@reduxjs/toolkit";


export const clienteSlice = createSlice({
    name: 'cliente',
    initialState: {
        cliente: {},
        nota_orden: {},
        checking: false,
    },
    reducers:{
        addCliente: (state, action) => {
            state.cliente = action.payload
        },
        addNotaOrden: (state, action) => {
            state.nota_orden = action.payload
        },
        formChecking:(state, action) => {
            state.checking = action.payload
        },
        updateNotaOrden:(state, action) => {
            state.nota_orden = action.payload
        },
        terminarNotaOrden: (state, action) => {
            state.cliente = {}
            state.nota_orden = {}
        }
    }
})

export const { addCliente, addNotaOrden, formChecking, updateNotaOrden, terminarNotaOrden } = clienteSlice.actions;