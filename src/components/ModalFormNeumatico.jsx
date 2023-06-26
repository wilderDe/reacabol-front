import React, { useEffect, useState } from 'react'

import './css/modalformregistro.css'
import { useHelpers } from '../hooks/useHelpers'

export const ModalFormNeumatico = ({modal}) => {

    const { itemsTipoTrabajo, nuevoNeumatico } = useHelpers();
    const [minDate, setMinDate] = useState('');
    const [form, setForm] = useState({
        marca: "",
        medida: "",
        serie:"",
        tipo_trabajo: "",
        cotizacion: "",
        accesorios: "",
        fecha_aproximada: ""
    })

    const onChange = ({target}) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    } 

    const onChangeSelect = ({target}) => {
    
        const trabajo = itemsTipoTrabajo.filter(item => {
            if( item.tpid === target.value){
                return item
            }
        } )

        if(trabajo.length === 0){
            setForm({
                ...form,
                ['tipo_trabajo']: '',
                ['cotizacion']: ''
            })
            return
        } 
        
        setForm({
            ...form,
            ['tipo_trabajo']: target.value,
            ['cotizacion']: trabajo[0].costo 
        })
    }

    
    const setMinDateFromToday = () => {
        const today = new Date();
        today.setDate(today.getDate() ); // Restar un día a la fecha actual
    
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        month = month < 10 ? '0' + month : month; // Añadir un cero al mes si es necesario
    
        let day = today.getDate();
        day = day < 10 ? '0' + day : day; // Añadir un cero al día si es necesario
    
        const minDateValue = `${year}-${month}-${day}`;
        setMinDate(minDateValue);
    };
    const handleRecepcionar = () => {
        nuevoNeumatico(form)
        setForm({
            marca: "",
            medida: "",
            serie:"",
            tipo_trabajo: "",
            cotizacion: "",
            accesorios: "",
            fecha_aproximada: ""
        })
        modal.setModal({active: false})
    }
    useEffect(() => {
        setMinDateFromToday()
    }, [])
    

    if(!modal.active){
        return <></>
    }
    
    
    return (
        <div className='modal-neumatico'>
            <h3>NUEVO REGISTRO</h3>
            
            <div className="row">
                <div className="content-neumatico">
                    <p>Marca</p>
                    <input className='btn_recep' type="text" name='marca' value={form.marca} onChange={onChange} autoComplete='off'/>
                </div>
                <div className="content-neumatico">
                    <p>Medida</p>
                    <input className='btn_recep'  type="text" name='medida' value={form.medida} onChange={onChange} autoComplete='off'/>
                </div>
            </div>

            <div className="row">
                <div className="content-neumatico">
                    <p>Serie</p>
                    <input className='btn_recep' type="text" name='serie' value={form.serie} onChange={onChange} autoComplete='off'/>
                </div>
                <div className="content-neumatico">
                    <p>Tipo Trabajo:</p>
                    <select onChange={onChangeSelect} 
                        style={{
                            width: 130,
                            height: 30,
                            marginTop: 10,
                            borderRadius:10
                        }}
                    >
                        <option value="" > Seleccionar </option>

                        {itemsTipoTrabajo.map(item => (
                            <option value={item.tpid} key={item.tpid} > {item.nombre_trabajo} </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="content-neumatico">
                    <p>Cotizacion:</p>
                    <input className='btn_recep'  type="text" disabled style={{color:'#fff'}} name='cotizacion' value={form.cotizacion} onChange={onChange} autoComplete='off' />
                </div>
                <div className="content-neumatico">
                    <p>Accesorios:</p>
                    <input className='btn_recep'  type="text" />
                </div>
            </div>

            <div className="row">
                <div className="content-neumatico">
                    <button 
                        className='btn_azul-neu'
                        onClick={handleRecepcionar}
                    >
                        RECEPCIONAR
                    </button>
                </div>
                <div className="content-neumatico">
                    <p>Fecha aproximada:</p>
                    <input className='btn_recep' name='fecha_aproximada' value={form.fecha_aproximada} onChange={onChange}  type="date" min={minDate} />
                </div>
            </div>

        </div>
    )
}
