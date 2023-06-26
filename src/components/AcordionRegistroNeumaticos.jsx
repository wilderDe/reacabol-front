import React, { useEffect, useState } from 'react'
import triangle from '../assets/secretario/triangle.png'
import { useRegisterClient } from '../hooks/useRegisterClient';

const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
export const AcordionRegistroNeumaticos = () => {

    const { nota_orden } = useRegisterClient();
    const [contentHeight, setContentHeight] = useState(0);
    const [open, setOpen] = useState("")
    

    const toggleAccordion = (id) => {

        if(id === open){
            return setOpen("")
        }
       
        setOpen(id)
    }

    const calculateContentHeight = (element) => {
        setContentHeight(element.scrollHeight);
    };

    const formatDate = (date) => {
        const formDate = new Date(date)
        const dia =formDate.getDate()+1;    
        const mes =  nombresMeses[formDate.getMonth()] ;
        const año = formDate.getFullYear();
        return `${dia} de ${mes} de ${año} `
        
    }

    if(nota_orden.ref_neumatico === undefined){
        return <></>
    }



    return (
        <div className='contenedor-accordion' >
            {nota_orden.ref_neumatico.map(neumatico => (
            <div key={neumatico._id} className={`accordion ${( neumatico._id === open ) ? 'open' : ''}`} onClick={()=>toggleAccordion(neumatico._id)}>
                
                <div className="accordion-title">
                    <img src={triangle} className={ (neumatico._id === open) ?'arrow_start' :'arrow_end' } />
                    <h4>Neumatico c-alfa :</h4>
                    <p>{neumatico.alfa} </p>
                </div>
        
                    <div
                        className="content"
                        style={{ height: (neumatico._id === open) ? contentHeight : 0 }}
                        ref={(element) => {
                            if (element) {
                                calculateContentHeight(element);
                            }
                        }}
                    >
                        <div className="row">
                            <div className="content-neumatico">
                                <p>Marca:</p>
                                <p>{neumatico.marca} </p>
                            </div>
                            <div className="content-neumatico">
                                <p>Medida:</p>
                                <p>{neumatico.medida} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="content-neumatico">
                                <p>Serie:</p>
                                <p>{neumatico.serie} </p>
                            </div>
                            <div className="content-neumatico">
                                <p>Tipo de trabajo:</p>
                                <p>{neumatico.tipo_trabajo.nombre_trabajo} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="content-neumatico">
                                <p>Fecha aproximada:</p>
                                <p>{ formatDate( neumatico.fecha_entrega_aprox ) } </p>
                            </div>

                        </div>
                    </div>  
            </div>
            ))}
        </div>
    )
}
