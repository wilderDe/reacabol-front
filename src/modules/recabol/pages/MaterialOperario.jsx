import { useEffect, useState } from 'react'
import { NavBar } from '../../../components/NavBar'
import { ModalAddMaterialeOper } from '../../../components/ModalAddMaterialeOper'
import { useAuth } from '../../../hooks/useAuth'
import apiRecabol from '../../../api/config'
import '../css/materialOperario.css'

export const MaterialOperario = () => {

    const { auth } = useAuth()
    const [modal, setModal] = useState({active:false})
    const [listaMateriales, setListaMateriales] = useState()
    
    const obtenerLosMateriales =  async() => {
        
        const { data } = await apiRecabol.post('/operario/materialesregistrados', {
            id_empleado: auth.eid
        });

        //TODO: mostar en el componente los materiales 
   
        setListaMateriales(data)
    }

    const handleClick  =() => {
        setModal({
            active: true,
            setModal
        })  
    }

    useEffect(() => {
        obtenerLosMateriales()
    }, [modal])
    

    
    return (
        <div>
            <NavBar />
            <div className="header-material">
                <h4>REGISTRO MATERIALES</h4>
                <h4 onClick={handleClick} >NUEVO</h4>
            </div>
            {true
            ?<>Obteniendo materiales</>
            :<>Nunca</>

            }
            <ModalAddMaterialeOper data={modal} />
        </div>
    )
}



