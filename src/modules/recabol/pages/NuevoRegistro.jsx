import React, { useState } from 'react'
import { NavBar } from '../../../components/NavBar'
import perrito from '../../../assets/secretario/perrito.png'
import { useRegisterClient } from '../../../hooks/useRegisterClient'
import '../css/newcliente.css'

export const NuevoRegistro = () => {

    const { crearCliente, checking } = useRegisterClient()

    const [form, setForm] = useState({
        ci: '',
        nombre_apellidos: "",
        celular: "",
        fecha_creacion:''
    })
    
    const onChange = ( {target} ) => {
        setForm({
            ...form,
            [target.name] : target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        crearCliente(form)
    }

    return (
        <>
            <NavBar data={"NUEVO REGISTRO"} />
            <img src= {perrito} alt="" className='img_perrito' />
            
            <form onSubmit={onSubmit}  className='form'>
                <h2>Nuevo Cliente</h2>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="">Nombre y Apellidos:</label>
                        <input 
                            type="text" 
                            name="nombre_apellidos" 
                            value={form.nombre_apellidos}  
                            onChange={onChange}
                            autoComplete='off'
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Carnet de Identidad:</label>
                        <input type="number" name="ci" value={form.ci} onChange={onChange} autoComplete='off'  />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="">Celular:</label>
                        <input type="number" name="celular" value={form.celular} onChange={onChange} autoComplete='off' />
                    </div>
                </div>
                
                <div className="form-row">
                    <input className='btn_azul' type="submit" value="SIGUIENTE" disabled={checking} />
                </div>
            </form>
        </>
    )
}
