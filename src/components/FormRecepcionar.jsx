import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterClient } from '../hooks/useRegisterClient';
import { useHelpers } from '../hooks/useHelpers';
import Swal from 'sweetalert2';

export const FormRecepcionar = () => {

    const [bandera, setBandera] = useState(false)
    const { nota_orden, recepcionarNotaOrden } = useRegisterClient();
    const { items } = useHelpers();

    const [form, setForm] = useState({
        noid: nota_orden.noid,
        sucursal:"",
        anticipo: "",
    })

    const anticipoValidarBlur = () => {
        if(Number(form.anticipo) < 0){
            return Swal.fire("","No puede ingresar valores negativos", "error")
        }
        if( Number(form.anticipo) >= 0 && Number(nota_orden.cotizacion) <= Number(form.anticipo) ){
            Swal.fire("","El valor ingresado en el anticipo no es correcto", "warning")
            return setBandera(true)
        }
        setBandera(false)
    
    }
    const onChange = ({target}) => {
        
        setForm({
            ...form,
            [target.name]: target.value
        })
    } 
    const onChangeSelect = ({target}) => {
        //Verificar este codigo
        const sucursal = items.filter(item => {
            if(item.sid === target.value){
                return item
            }
        })
        if(sucursal.length === 0){
            setForm({
                ...form,
                ['sucursal']: ""
            })
            return
        }

        setForm({
            ...form,
            ['sucursal']:target.value
        })
        
    }
    const handleRecepcionar = () => {
        if(!bandera){
            recepcionarNotaOrden(form)
        }
    }

    return (
        <div className="content-recepcionar">
            <h3>COSTOS</h3>      
            <div className="row">
                <div className="content-neumatico">
                    <p>Sucursal:</p>
                     <select onChange={onChangeSelect} 
                        style={{
                            width: 130,
                            height: 30,
                            marginTop: 10,
                            borderRadius:10
                        }}
                    >
                        <option value="" > Seleccionar </option>

                        {items.map(item => (
                            <option value={item.sid} key={item.sid} > {item.nombre} </option>
                        ))}
                    </select>
                </div>
                <div className="content-neumatico">
                    <p>Anticipo</p>
                    <input className='btn_recep' onBlur={anticipoValidarBlur}  type="number" name='anticipo' value={form.anticipo} onChange={onChange} />
                </div>
            </div>
            <div className="row">
                <div className="content-neumatico">
                    <p>Cotizacion Total:</p>
                    <p>{nota_orden.cotizacion} </p>
               
                </div>
                <div className="content-neumatico">
                    <button className='btn_azul-recep' onClick={handleRecepcionar}>RECEPCIONAR</button>
                </div>
            </div>
        </div>       
    )
}
