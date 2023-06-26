import {  useState } from 'react'
import { NavBar } from '../../../components/NavBar'
import { AcordionRegistroNeumaticos } from '../../../components/AcordionRegistroNeumaticos'
import { FormRecepcionar } from '../../../components/FormRecepcionar'
import { ModalFormNeumatico } from '../../../components/ModalFormNeumatico'
import { useRegisterClient } from '../../../hooks/useRegisterClient'
import mas from '../../../assets/secretario/mas.png'

export const NuevoNeumatico = () => {
    const { cliente, nota_orden } = useRegisterClient();
    const [modal, setModal] = useState({active: false})

    const handleNuevo = () => {
        setModal({active:true, setModal})
    }

    return (
        <div>
            <NavBar data={"AGREGAR NEUMATICOS"}/>
            <div className="container">
                <span style={{ fontWeight: 'bold' }} > Cliente:</span> <span> {cliente.nombre_apellidos}</span><br />
                <span style={{ fontWeight: 'bold' }}>Numero de orden: </span> <span> {nota_orden.numero_orden} </span>
                <div className="row-right">
                    <div className="btn_red" onClick={handleNuevo}>
                        <p>Nuevo</p>
                        <img src={mas} alt="" />
                    </div>    
                </div>

               <AcordionRegistroNeumaticos />

               <FormRecepcionar />             

                <ModalFormNeumatico modal={modal} />
            </div>   
        </div>
    )
}
