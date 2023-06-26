import React, { useEffect, useState } from 'react'
import { AuthRoute } from '../modules/auth/routes/AuthRoute'
import { ModulesRoute } from '../modules/routes/ModulesRoute'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import { useHelpers } from '../hooks/useHelpers'


export const AppRouter = () => {

    const { logged } = useSelector(state => state.auth)
    const {renovarToken } = useAuth();
    const { cargarHerramientas } = useHelpers();
    
    useEffect(() => {
        
        const token = localStorage.getItem('token')
        cargarHerramientas()

        if(!token) return

        renovarToken()
    }, [])
    
    

    return (
        <>
            {
            logged
            ? <ModulesRoute />
            : <AuthRoute  />
            }

        </>
    )
}
