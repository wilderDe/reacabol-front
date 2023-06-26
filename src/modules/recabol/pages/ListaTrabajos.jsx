import React, { useEffect, useState } from 'react'
import { NavBar } from '../../../components/NavBar'
import { Buscador } from '../../../components/Buscador'
import { AccordionListaTrabajos } from '../../../components/AccordionListaTrabajos'
import apiRecabol from '../../../api/config'

export const ListaTrabajos = () => {

    const [listaTrabajos, setListaTrabajos] = useState([])

    const obtenerLista = async() => {
        const {data} = await apiRecabol.get(`/nota_orden`);
        setListaTrabajos(data.lista)
    }

    useEffect(() => {
        obtenerLista()
    }, [])
    
    return (
        <div>
            <NavBar  data={"LISTA DE TRABAJOS"}/>
            <Buscador />
            <AccordionListaTrabajos data={listaTrabajos} />
        </div>
    )
}
