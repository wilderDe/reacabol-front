import Swal from "sweetalert2"



export const verificarRegistroCliente = ({ ci, nombre_apellidos, celular }) => {

    if(nombre_apellidos.length === 0) {
        Swal.fire('Registro Cliente','Debe llenar el campo nombre y apellidos','info')
        return false
    }
    if(ci.length === 0) {
        Swal.fire('Registro Cliente','Debe llenar el campo carnet de identidad','info')
        return false
    }
    if(celular.length === 0) {
        Swal.fire('Registro Cliente','Debe llenar el campo nombre celular','info')
        return false
    }
   
    return true

}

export const verificarFormNeumatico = ( {marca, medida, serie, tipo_trabajo, cotizacion, fecha_aproximada } )=>{

    if(marca.length === 0) {
        Swal.fire('Registro Neumatico','Debe llenar el campo marca','info')
        return false
    }
    if(medida.length === 0) {
        Swal.fire('Registro Neumatico','Debe llenar el campo medida','info')
        return false
    }
    if(serie.length === 0) {
        Swal.fire('Registro Neumatico','Debe llenar el campo serie','info')
        return false
    }
    if(tipo_trabajo.length === 0) {
        Swal.fire('Registro Neumatico','Debe llenar el campo tipo trabajo','info')
        return false
    }
    if(cotizacion.length === 0) {
        Swal.fire('Registro Neumatico','Debe llenar el campo cotizacion','info')
        return false
    }

    if(fecha_aproximada.length === 0) {
        Swal.fire('Registro Neumatico','Debe agregar una fecha','info')
        return false
    }

    return true

}


export const verificarNotaRecepcion = ( {noid, sucursal, anticipo} ) => {
    if(sucursal.length === 0) {
        Swal.fire('Recepcion','Debe agregar la sucursal','info')
        return false
    }
    if(anticipo.length === 0) {
        Swal.fire('Recepcion','Debe llenar el campo anticipo','info')
        return false
    }
    return true
}

export const verificarEntregarNotaOrden = async({text_extras,costo_extras,costos_descuento,costo_final })=>{
    if(text_extras.length === 0) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿No tiene ningun extras, quiere continuar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        });

        if(result.isConfirmed){
            return true
        }

        if(!result.isConfirmed){
            return false
        }
    }
    
    if(costo_extras.length === 0 ){
        Swal.fire("Nota de Entrega", "Debe llenar el campo costo extras", "info")
        return false
    }

    return true;
}