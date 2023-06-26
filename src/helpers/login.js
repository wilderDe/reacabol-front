import Swal from "sweetalert2"



export const verificarDatosLogin = ( usuario, password ) => {
  
    if(!usuario.length > 0 ){
        Swal.fire('Error', ' Debe introducir el usuario ','error')
        return false
    }
    if(!password.length > 0){
        Swal.fire('Error', ' Debe ingresar la contraseña ','error')
        return false
    }

    return true

}