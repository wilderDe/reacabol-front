import React from 'react'
import './css/modalMaterial.css'
import { useHelpers } from '../hooks/useHelpers'
import { useState } from 'react'
import { useOperario } from '../hooks/useOperario'

export const ModalAddMaterialeOper = ({ data }) => {

    const { materiales } = useHelpers()
    const { agregarMateriales } = useOperario();

    const [form, setForm] = useState({
        cantidad: "",
        material:""
    })
   
    const onChange = ({target}) => {
        setForm({
            ...form,
            [target.name]:target.value
        })
    }

    const handleSubmit = () => {
        agregarMateriales(form)
        data.setModal({
            active: false
        })
        setForm({
            cantidad: "",
            material: ""
        })
    }

    if(!data.active){
        return <></>
    }

    return (
        <div className='modal-material'>
            <h3>AGREGAR MATERIAL</h3>
            <div className="modal-row">
                <div className="modal-item">
                    <label htmlFor="">Cantidad:</label>
                    <input type="number" name="cantidad" value={form.cantidad} onChange={onChange} autoComplete='off' />
                </div>
                <div className="modal-item">
                    <label htmlFor="">Material:</label>
                    <select 
                          style={{
                            width: 130,
                            height: 28,
                            borderRadius:10
                        }}
                        name='material'
                        onChange={onChange}
                    >
                        <option value="">Seleccionar</option>
                        {materiales.map(material => (
                            <option value={material.aid} > {material.nombre_material} </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="modal-row-center">
                <input type="submit" value="GUARDAR" onClick={handleSubmit} />
            </div>
        </div>
    )
}
