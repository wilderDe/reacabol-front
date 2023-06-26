import React, { useState } from 'react'
import triangle from '../assets/secretario/triangle.png'
import './css/accordionlistatra.css'
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFNotaOrden from './PdfNotaOrden';

const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export const AccordionListaTrabajos = ( {data =[]}) => {
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
  
    if(data.length === 0) {
        return <>Cargando</>
    }

 

    return (
        <div className="container">
            <div className='contenedor-accordion'>
                {data.map(dato => (
                <div 
                    key={dato.noid} 
                    className={`accordion-list-trab ${(dato.noid === open) ? 'open' : ''}  `} 
                  
                >    
                    <div className={`accordion-title-list ${dato.final_total ? 'verde' : 'rojo'} `} >
                        <div className="accordion-title-list-one">
                            <p>Ordén de Trabajo:</p>
                            <p>{dato.numero_orden}</p>
                        </div>
                        <div className="accordion-title-list-two">
                            <p>Fecha de Recepción</p>
                            <p>{ formatDate( dato.fecha_creacion ) }  </p>
                        </div>
                        <div className="accordion-title-list-three">
                            <img 
                                src={triangle} 
                                className={ ( dato.noid === open ) ?'arrow_start' :'arrow_end' } 
                                onClick={()=>toggleAccordion(dato.noid)}
                            />
                        </div>
                    </div>
            
                        <div
                            className="content-list"
                            style={{ height: ( dato.noid === open ) ? contentHeight : 0 }}
                            ref={(element) => {
                                if (element) {
                                    calculateContentHeight(element);
                                }
                            }}
                        >
                            <div className="row">
                                <div className="column">
                                    <h4 >Nombre Cliente:</h4>
                                    <p>{dato.ref_neumatico[0].ref_cliente.nombre_apellidos}</p>

                                    <h4>Celular cliente:</h4>
                                    <p>{dato.ref_neumatico[0].ref_cliente.celular}</p>

                                    <h4>Cotizacion:</h4>
                                    <p>{dato.cotizacion}</p>

                                    <h4>Anticipio:</h4>
                                    <p>{dato.anticipo}</p>
                                </div>
                                <div className="column">
                                    <PDFDownloadLink
                                        document={<PDFNotaOrden notaOrden={dato} filename="notaOrden.pdf" />}
                                    >
                                        <button
                                         style={{
                                            padding: '10px 15px',
                                            marginLeft: 10,
                                            border: 'none',
                                            borderRadius: 10,
                                            marginBottom: 10,
                                            backgroundColor: '#D0121390',
                                            color: "#fff"
                                        }}
                                        >
                                            Descargar PDF
                                        </button>
                                    </PDFDownloadLink>
                            
                                </div>
                            </div>
                            
                            {dato.ref_neumatico.map( neumatico => (
                             <div
                             key={neumatico._id}
                             style={{ background: '#8A87872f', paddingLeft: 10, paddingTop:10}}
                         >
                             <hr />
                             <div className="row-hijo">
                                 <div className="column" >
                                     {neumatico.finalizado
                                     ? <span className='btn_bandera verde-f' >
                                             Trabajo Finalizado            
                                         </span>
                                     : <span className={`btn_bandera ${neumatico.estado_trabajo? "azul-f": "rojo" } `} >
                                     {neumatico.estado_trabajo ? "Trabajando"  :"Pendiente" }
                                 </span>
                                         
                                     }
                                    
                                 </div>
                                 <div className="column">
                                     <h4>Empleado: </h4>
                                     <p>{/*dato.empleado*/} </p>

                                     <h4>Celular Empleado:</h4>
                                     <p>{/*dato.celular*/} </p>
                                 </div>
                             </div>
                                  
                             <div className="row-hijo">
                                 <span style={{ fontWeight:'bold', marginRight:10 }} >Neumatico c-alfa: </span>
                                 <span >  { neumatico.alfa } </span>
                             </div>
                             <div className="row">
                                 <div className="content-neumatico">
                                     <p>Tipo de trabajo:</p>
                                     <p>{neumatico.tipo_trabajo.nombre_trabajo }</p>
                                 </div>
                                 <div className="content-neumatico">
                                     <p>Fecha aproximada:</p>
                                     <p>{formatDate(neumatico.fecha_entrega_aprox)} </p>
                                 </div>
                             </div>
                              
                             <div className="row">
                                 <div className="content-neumatico">
                                     <p>Marca:</p>
                                     <p>{neumatico.marca} </p>
                                 </div>
                                 <div className="content-neumatico">
                                     <p>Serie:</p>
                                     <p>{neumatico.serie} </p>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="content-neumatico">
                                     <p>Accesorio:</p>
                                     <p>{neumatico.accesorios} </p>
                                 </div>
                                 <div className="content-neumatico">
                                     <p>Medida:</p>
                                     <p>{neumatico.medida} </p>
                                 </div>
                                
                             </div>
                         </div>
                            ))}
                        </div>  
                </div>
                ))}
            </div>
        </div>
    
    )
}
