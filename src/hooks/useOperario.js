import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { tomarTrabajo } from "../store/operarioSlice";
import { useAuth } from "./useAuth";
import { authLogin } from "../store/AuthSlice";
import { useHelpers } from "./useHelpers";
import Swal from "sweetalert2";
import apiRecabol from "../api/config";

export const useOperario = () => {

    const { tomar_trabajo } = useSelector(state => state.operario)  
    const { auth } = useAuth();  
    const {materiales } = useHelpers();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    ///* cuando tomamos el trabajo por primera ves
    const tomarTrabajoOperario = async( item ) => {
        dispatch( tomarTrabajo(item) )
        const {data} = await apiRecabol.post('/operario/tomatrabajo', {
            id_neumatico: item.nid,
            id_operario: auth.eid
        })
        dispatch( authLogin( data.operario) )
        console.log( data)
        navigate('/lista/neumatico')
    }   

    //*Retomando el pendiente que tiene el operario
    const tienePendiente = ( ) => {
        if(!!auth.pendiente){
            dispatch( tomarTrabajo(auth.pendiente) )
        } 
    }

    //* agregar Materiales
    const agregarMateriales = async( form ) => {
        //VERIFICAR
        const material = materiales.filter(item => item.aid === form.material )
        const costo_total = material[0].costo * form.cantidad
       
        const resp = await apiRecabol.post('/material/new', {
            ref_empleado: auth.eid,
            ref_material:  material[0].aid,
            cantidad: form.cantidad,
            costo_total
        })
    }

    const finalizarTrabajo = async( id_neumatico, id_nota_orden ,deposito ) => {
        console.log(id_neumatico, id_nota_orden, deposito)
        const {data} = await apiRecabol.put('/operario/finalizar', {
            id_neumatico,
            id_nota_orden,
            deposito,
            id_empleado: auth.eid
        } )
        Swal.fire("Exito","Trabajo finalizdo", "success");
        dispatch( authLogin(data.empleado) )
        navigate('/')
    }

    const rechazarTrabajo = async(id_neumatico, id_nota_orden) => {

        const { value: formValues } = await Swal.fire({
            title: 'Completa la información',
            html:
              '<input id="input1" class="swal2-input" placeholder="Momento del rechazo">' +
              '<input id="input2" class="swal2-input" placeholder="Descripcion">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById('input1').value,
                document.getElementById('input2').value
              ];
            }
        });
        
        if (formValues) {
            const momento_rechazo = formValues[0];
            const descripcion = formValues[1];
            
            const { data } = await apiRecabol.put('/operario/rechazar',{
                momento_rechazo,
                descripcion,
                id_neumatico,
                id_nota_orden,
                id_empleado: auth.eid
            })

            console.log(data)
            dispatch( authLogin(data.empleado) )
            navigate('/')

            return Swal.fire('Neumatico rechazado', 'reporte registrado, rechazo', 'success');
        
        }
        Swal.fire('Error','Debe llenar todos los campos', 'error')
    }
    
    return{
        tomar_trabajo,

        tomarTrabajoOperario,
        tienePendiente,
        agregarMateriales,
        finalizarTrabajo,
        rechazarTrabajo

    }
}
