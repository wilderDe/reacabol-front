import React from 'react'

import recabol from '../assets/navbar/recabol.png'
import user from '../assets/navbar/user.svg'
import atras from '../assets/navbar/atras.svg'
import './css/navbar.css'
import { useNavigate } from 'react-router-dom'



export const NavBar = ( {data} ) => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="navbar">
            <div className="nav-left">
                <img src={atras} alt="back" onClick={goBack} />
                <p>{data} </p>
                <img src={user} alt="rcabol" />
            </div>
            <div className="nav-rigth">
                <img src={recabol} alt="" />
            </div>
            <div className="triangulo"></div>
        </div>
    )
}
