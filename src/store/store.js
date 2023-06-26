import { configureStore } from "@reduxjs/toolkit";
import { socketSlice } from "./socketSlice";
import { authSlice } from "./AuthSlice";
import { clienteSlice } from "./clienteSlice";
import { sucursalSlice } from "./sucursalSlice";
import { tipoTrabajoSlice } from "./tipoTrabajoSlice";
import { operarioSlice } from "./operarioSlice";
import { materialesSlice } from "./materialesSlice";

export const store = configureStore({
    reducer:{
        socket: socketSlice.reducer,
        auth: authSlice.reducer,
        cliente: clienteSlice.reducer,
        sucursal: sucursalSlice.reducer,
        tipoTrabajo: tipoTrabajoSlice.reducer,
        operario: operarioSlice.reducer,
        material: materialesSlice.reducer
    }
})