import { useDispatch, useSelector } from "react-redux"
import { authLogged, authLogin, authLogout, checkingAuth } from "../store/AuthSlice"
import { verificarDatosLogin } from "../helpers/login"
import Swal from "sweetalert2"
import axios from "axios"

const urlApi = "https://wilderqc.com/api"

export const useAuth = ( ) => {

    const { auth, checking, logged } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const verificarLogin  =  async({usuario, password}) => {
        try {
            const verificar =  verificarDatosLogin(usuario, password);
            if(!verificar){
                return
            }

            dispatch( checkingAuth(true) )
            const {data} = await axios.post(`${urlApi}/empleado/login`, { usuario, password });

            if(!data.ok){
                dispatch( checkingAuth(false) )
                return    Swal.fire("Error", `${data.msg}`,"error")
                
            }
            dispatch(authLogin(data.usuario))
            dispatch( authLogged(true) )
            localStorage.setItem('token', data.token)
            dispatch(checkingAuth(false))

        } catch (error) {
            console.log('Error en la solicitud', error)
        }
    }   

    const renovarToken =  async() => {
        try {
            dispatch( checkingAuth(true) )
            const headers = {
                'x-token': localStorage.getItem('token')
            }
            const {data} =  await axios.get(`${urlApi}/empleado/renew`, { headers })
            if(!data.ok){
                dispatch(authLogged(false));
                localStorage.removeItem('token')
                dispatch(checkingAuth(false))
                return
            }
            dispatch( authLogin( data.usuario ) )
            dispatch( authLogged( true ) )
            localStorage.setItem('token', data.token)
            dispatch(checkingAuth(false))
        } catch (error) {
            console.log('Erro al renovar token', error)
        }
    }
    const logout = () => {
        dispatch( authLogout() );
        dispatch( authLogged(false) )
        localStorage.removeItem('token')
    }
    
    return {
        auth, 
        checking,
        logged,

        verificarLogin,
        renovarToken,
        logout
    }   

}
