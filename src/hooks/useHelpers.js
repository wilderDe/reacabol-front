import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addSucursal } from "../store/sucursalSlice";
import { addTipoTrabajo } from "../store/tipoTrabajoSlice";
import { verificarFormNeumatico } from "../helpers/formVerify";
import { useRegisterClient } from "./useRegisterClient";
import { updateNotaOrden } from "../store/clienteSlice";
import { addMateriales } from "../store/materialesSlice";
import apiRecabol from "../api/config";
import Swal from "sweetalert2";

export const useHelpers = () => {
    const dispatch = useDispatch();
    const { cliente, nota_orden } = useRegisterClient();
    const { items } = useSelector(state => state.sucursal)
    const { itemsTipoTrabajo } = useSelector(state => state.tipoTrabajo )
    const { materiales } = useSelector(state => state.material)
    const navigate = useNavigate();

    const cargarHerramientas = async( ) => {
        const respSucursal = await apiRecabol.get(`/sucursal`);
        const respTipoTrabajo = await apiRecabol.get(`/tipo_trabajo`);
        const respMateriales = await apiRecabol.get('/material')
        dispatch( addMateriales(respMateriales.data.materiales) )
        dispatch( addSucursal(respSucursal.data.sucursales) )
        dispatch( addTipoTrabajo( respTipoTrabajo.data.listaDeTrabajos) )

    }   

    const nuevoNeumatico = async(form) => {

        try {
            const verificar = verificarFormNeumatico(form);
            if( !verificar){
                return
            }
            //TODO AGREGAR NEUMATICO AL BNACKEND y TAMBIEN AL STATE
            //* id_ cliente, id_tipo_trabajo, id_notaorden
            form.id_cliente = cliente.cid;
            form.id_tipo_trabajo = form.tipo_trabajo;
            form.id_nota_orden = nota_orden.noid;
            form.fecha_entrega_aprox = form.fecha_aproximada
            const {data} = await apiRecabol.post(`/neumatico/new`, form)
            //Actualizar nota de orden
            dispatch( updateNotaOrden( data.notaOrden ) )
        } catch (error) {
            console.log(error)
        }  
    }

    //* DEL ROL SUPERVISOR
    const entregarNeumaticoDeposito = async( id_deposito ) => {
        
        const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'El neumatico se registrar como entregado',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        });
        if(isConfirmed){
            const {data} = await apiRecabol.put('/deposito/entregar', { id_deposito });
            console.log(data)
            Swal.fire("Neumatico registrado", "", "success")
            navigate('/')
        }
        
    }

    return {
        items,
        itemsTipoTrabajo,
        materiales,

        cargarHerramientas,
        nuevoNeumatico,
        entregarNeumaticoDeposito
    }
}
