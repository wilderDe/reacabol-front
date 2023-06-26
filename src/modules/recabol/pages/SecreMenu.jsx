import React from 'react'
import { useNavigate } from 'react-router-dom'
import menu_oso from '../../../assets/secretario/menu.jpg'
import registro from '../../../assets/secretario/registro.svg'
import lista from '../../../assets/secretario/lista.svg'
import nota from '../../../assets/secretario/nota.svg'
import salir from '../../../assets/secretario/salir.svg'

import '../css/menu.css'
import { useAuth } from '../../../hooks/useAuth'
const opctions = [
    {
        id: 1,
        img: registro,
        menu: 'Nuevo registro',
        path: '/registro',
    },
    {
        id: 2,
        img: lista,
        menu: 'lista de trabajos',
        path: '/lista',
    },
    {
        id: 3,
        img: nota,
        menu: 'Nota de Entrega',
        path: '/nota',
    }
]

export const SecreMenu = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleMenu = ( path ) => {
        navigate(path)
    }


    return (
        <div className='background'>
            <img className='background_img' src={menu_oso} alt="" />
            <div className="menu-content">
                <div className="cont_perfil">
                    <p>Secretario
                    </p>
                </div>

                {opctions.map(option => (
                    <div key={option.id} className="btn_menu" onClick={() => handleMenu(option.path) } >
                        <img src={option.img} alt="" />
                        <p>{option.menu} </p>
                    </div>
                ))}

                <div className="btn_salir" onClick={() => logout()}>
                    <img src={salir} alt="" />
                    <p>FINALIZAR SESION</p>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    )
}
