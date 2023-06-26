import React from 'react'
import triangle from '../assets/secretario/triangle.png'
import { useState } from 'react';
import { useHelpers } from '../hooks/useHelpers';


const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
export const AccordionListaDeposito = ( { lista=[] } ) => {
    const { entregarNeumaticoDeposito } = useHelpers();
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

    const handleEntregar = ( item ) => {
        entregarNeumaticoDeposito(item)
    }


    return (
        <div className="container">
            <div className="contenedor-accordion">
                {lista.length === 0
                ?<>No hay neumaticos en el deposito</>
                : lista.map(item => (
                    <div
                        key={item.did}    
                        className={`accordion-list-trab ${(item.did === open) ? 'open' : ''}  `} 
                    >
                        <div className={`accordion-title-list`} style={{ background: '#8A87872f', borderRadius: 7}} >
                            <div className="accordion-title-list-one">
                                <p>Numero alfa:</p>
                                <p>{item.ref_neumatico.alfa} </p>
                            </div>
                            <div className="accordion-title-list-two">
                                <p>fecha de entrega</p>
                                <p>{formatDate(item.ref_neumatico.fecha_entrega_aprox)}</p>
                            </div>
                            <div className="accordion-title-list-three">
                                <img 
                                    src={triangle} 
                                    className={ ( item.did === open ) ?'arrow_start' :'arrow_end' } 
                                    onClick={()=>toggleAccordion(item.did)}
                                />
                            </div>
                        </div>
                        <div className="content-list"
                            style={{ height: ( item.did === open ) ? contentHeight : 0 }}
                            ref={(element) => {
                                if (element) {
                                    calculateContentHeight(element);
                                }
                            }}>
                                <br />
                            <div className="row">
                                <button
                                style={{
                                    background: '#ED0202',
                                    color:'#fff',
                                    padding: '7px 15px',
                                    border: 'none',
                                    borderRadius: 7
                                }}
                                onClick={() => handleEntregar( item.did )}
                                >Entregar</button>
                            </div>
                            <br />
                            <div className="row">
                                <div className="column">
                                    <h4 >Marca:</h4>
                                    <p>{item.ref_neumatico.marca}</p>

                                    <h4 >Medida:</h4>
                                    <p>{item.ref_neumatico.medida}</p>

                                </div>
                                <div className="column">
                                    <h4>Tipo de trabajo:</h4>
                                    <p>{item.ref_neumatico.tipo_trabajo.nombre_trabajo}</p>

                                    <h4>Costo: </h4>
                                    <p>{item.ref_neumatico.tipo_trabajo.costo}</p>

                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="column">
                                    <h4 >Cliente:</h4>
                                    <p>{item.ref_neumatico.ref_cliente.nombre_apellidos}</p>

                                    <h4 >Cedula de Identidad:</h4>
                                    <p>{item.ref_neumatico.ref_cliente.ci}</p>

                                </div>
                                <div className="column">
                                    <h4>Celular:</h4>
                                    <p>{item.ref_neumatico.ref_cliente.celular}</p>

                                    <h4>Frecuencia: </h4>
                                    <p>{item.ref_neumatico.ref_cliente.cliente_frecuente}</p>

                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="column">
                                    <h4 >Operario:</h4>
                                    <p>{item.ref_neumatico.ref_operario.nombre}</p>

                                </div>
                                <div className="column">
                                    <h4>Celular:</h4>
                                    <p>{item.ref_neumatico.ref_operario.celular}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                ))  
                }
            </div>
        </div>
    )
}
