import React from 'react'
import { NavBar } from '../../../components/NavBar'
import { ListaTrabajosOpe } from '../../../components/ListaTrabajosOpe'

export const ListaTrabOperarios = () => {
    
    return (
        <>
            <NavBar data={"LISTA DE TRABAJOS"} />
            <ListaTrabajosOpe />
            
        </>
    )
}
