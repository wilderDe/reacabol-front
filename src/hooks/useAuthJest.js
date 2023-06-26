import { verificarDatosLogin } from '../helpers/login';
import axios from 'axios';
const urlApi = "https://wilderqc.com/api"

export const useAuthJest = () => {
    const verificarLogin  =  async({usuario, password}) => {
        try {
            const verificar =  verificarDatosLogin(usuario, password);
            if(!verificar){
                return
            }
            const {data} = await axios.post(`${urlApi}/empleado/login`, { usuario, password });
            console.log(data)

        } catch (error) {
            console.log('Error en la solicitud', error)
        }
    }   
    const renovarToken =  async() => {
        try {    
            const headers = {
                'x-token': localStorage.getItem('token')
            }
            const {data} =  await axios.get(`${urlApi}/empleado/renew`, { headers })
            if(!data.ok){
             
                localStorage.removeItem('token')
            
                return
            }
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.log('Erro al renovar token', error)
        }
    }
    const logout = () => {
        localStorage.removeItem('token')
    }
    return {

        verificarLogin,
        renovarToken,
        logout
    }   
}



