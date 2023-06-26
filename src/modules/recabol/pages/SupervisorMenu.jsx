import { useNavigate } from 'react-router-dom'
import llave from '../../../assets/operario/llave.png'
import operario from '../../../assets/operario/operario.jpg'
import salir from '../../../assets/operario/salir.png'
import { useAuth } from '../../../hooks/useAuth'

export const SupervisorMenu = () => {

    const { logout, auth } = useAuth();
    const navigate = useNavigate();

    const handleMenu = ( path ) => {
        navigate(path)
    }

    return (
        <div className='background'>
            <img src={operario} className='background_img'  />
            <div className="menu-content">
                <div className="cont_perfil">
                    <p>Supervisor
                    </p>
                </div>
                
                <div className="btn_menu" onClick={() => handleMenu('/lista') } >
                    <img src={llave} alt="" />
                    <p>Deposito  </p>
                </div>

                <div className="btn_salir" onClick={() => logout() } >
                    <img src={salir} />
                    <p>FINALIZAR SESION</p>
                </div>
            </div>

            <div className="footer"></div>
        </div>
    )
}
