import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verificarEntregarNotaOrden, verificarNotaRecepcion, verificarRegistroCliente } from "../helpers/formVerify"
import { addCliente, addNotaOrden, formChecking, terminarNotaOrden } from "../store/clienteSlice"
import Swal from "sweetalert2"
import apiRecabol from "../api/config"

export const useRegisterClient = () => {

    const { cliente, nota_orden, checking } = useSelector(state => state.cliente)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const crearCliente = async({ ci, nombre_apellidos, celular, fecha_creacion }) => {
        try {
            dispatch(formChecking(true))
            const verificar = verificarRegistroCliente({ ci, nombre_apellidos, celular, fecha_creacion })
            if(!verificar) return  dispatch(formChecking(false))
    
            fecha_creacion = new Date();
            const cliente = { ci, nombre_apellidos, celular, fecha_creacion }
            //* creamos el cliente
            const  respCliente = await apiRecabol.post('/cliente/new', cliente)         
            //* Una ves creado el cliente la nota de orden debe crearse 
            const respNotaOrden = await apiRecabol.post('/nota_orden/new', {fecha_creacion})
            //* Guardar estos datos en el State
            dispatch(addCliente(respCliente.data.cliente))
            dispatch(addNotaOrden(respNotaOrden.data.notaOrden))
            dispatch(formChecking(false))

            navigate('/registro/neumatico')
        } catch (error) {
            console.log(error)
        }
    }

    const recepcionarNotaOrden = async( form ) => {
        try {
            if(!verificarNotaRecepcion(form)){
                return
            }
            const {data} = await apiRecabol.post('/nota_orden/recepcionar', form);
            //console.log(data);
            if(!data.ok){
                return Swal.fire("Error", `${data.msg}`, "error")
            }
            dispatch( terminarNotaOrden() )
            Swal.fire('Exito','La nota de orden a sido registrado', 'success')
            //EMITIr A TODOS LOS TRABAJADOREs
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const entregarNotaOrden = async(form) =>{
        try {
            
            const verificar = await verificarEntregarNotaOrden(form)
            if(!verificar) return
            const resp = await apiRecabol.put('/nota_orden', form )

            Swal.fire("Exito", "Nota de Orden Cerrada", "success")
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return{
        cliente,
        nota_orden,
        checking,

        crearCliente,
        recepcionarNotaOrden,
        entregarNotaOrden
    }
}
