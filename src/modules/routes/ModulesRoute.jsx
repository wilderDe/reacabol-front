import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SecreMenu } from '../recabol/pages/SecreMenu'
import { NuevoRegistro } from '../recabol/pages/NuevoRegistro'
import { ListaTrabajos } from '../recabol/pages/ListaTrabajos'
import { NotaEntrega } from '../recabol/pages/NotaEntrega'
import { NuevoNeumatico } from '../recabol/pages/NuevoNeumatico'
import { OperarioMenu } from '../recabol/pages/OperarioMenu'
import { ListaTrabOperarios } from '../recabol/pages/ListaTrabOperarios'
import { MaterialOperario } from '../recabol/pages/MaterialOperario'
import { TomarTrabajo } from '../../components/TomarTrabajo'
import { useAuth } from '../../hooks/useAuth'
import { NotaEntregaId } from '../recabol/pages/NotaEntregaId'
import { SupervisorMenu } from '../recabol/pages/SupervisorMenu'
import { ListaDeposito } from '../recabol/pages/ListaDeposito'

export const ModulesRoute = () => {
    
    const { auth } = useAuth()
  
    return (
        <>
            {(auth.ref_rol.nombre_rol === 'ADMIN')  //SECRETARIO
            &&
            <Routes>
                <Route path='/' element={< SecreMenu />} /> 
                <Route path='/registro' element={< NuevoRegistro />} /> 
                <Route path='/registro/neumatico' element={ < NuevoNeumatico /> } />   
                <Route path='/lista' element={< ListaTrabajos />} /> 
                <Route path='/nota' element={< NotaEntrega />} />   
                <Route path='/nota/:id' element={ <NotaEntregaId /> } />
                
            </Routes> 
            }
            {(auth.ref_rol.nombre_rol  === 'OPERARIO')
            &&
            <Routes>
                <Route path='/' element={<OperarioMenu  /> } />
                <Route path='/lista' element={<ListaTrabOperarios  /> } />
                <Route path='/lista/neumatico' element={< TomarTrabajo /> } />
                <Route path='/material' element={<MaterialOperario  /> } />
            </Routes>
            }
            {(auth.ref_rol.nombre_rol === 'SUPERVISOR')
            &&
            <Routes>
                <Route path='/' element={ < SupervisorMenu /> } />
                <Route path='/lista' element={ < ListaDeposito /> } />
            </Routes>
            }
            
        </>
    )
}
