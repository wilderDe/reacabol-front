import React from 'react'
import { NavBar } from '../../../components/NavBar'
import { useEffect } from 'react'
import apiRecabol from '../../../api/config'
import { AccordionListaDeposito } from '../../../components/AccordionListaDeposito'
import { useState } from 'react'

export const ListaDeposito = () => {

    const [listaDeposito, setListaDeposito] = useState([])

    const obtenerLista = async() => {
        const {data} = await apiRecabol.get('/deposito')
        setListaDeposito(data.depositos)
    
    }
       

    useEffect(() => {
        obtenerLista()
    }, [])
    

    return (
        <div>
            <NavBar data={"DEPOSITO"} />
            <AccordionListaDeposito lista={ listaDeposito } />
        </div>
    )
}
