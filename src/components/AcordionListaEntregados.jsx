import React, { useState } from 'react'
import triangle from '../assets/secretario/triangle.png'
import neumatico_png from '../assets/secretario/neumatico.png'
import costos_png from '../assets/secretario/costo.png'
import { PDFDownloadLink } from '@react-pdf/renderer'
import  PdfNotaEntrega  from './PdfNotaEntrega'

const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
export const AcordionListaEntregados = ( { data=[] } ) => {
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



    if( data.length === 0 ){
        return<>cargando</>
    }
    return (
        <div className='container' >
            <div className="contenedor-accordion">
                {data.map(item => (
                    <div
                        key={item.noid}
                        className={`accordion-list-trab ${(item.noid === open) ? 'open' : ''}  `} 
                    >
                        <div 
                            className="accordion-title-list" 
                            style={{ 
                                background: '#66666630', 
                                padding: '10px 0',
                                borderRadius: 10
                            }} 
                        >
                            <div className="accordion-title-list-one">
                                <p>Ordén de Trabajo:</p>
                                <p>{item.numero_orden} </p>
                            </div>
                            <div className="accordion-title-list-two">
                                <p>Fecha de Recepción</p>
                                <p>{formatDate(item.fecha_entrega)} </p>
                            </div>
                            <div className="accordion-title-list-three">
                                <img 
                                    src={triangle} 
                                    className={ ( item.noid === open ) ?'arrow_start' :'arrow_end' } 
                                    onClick={()=>toggleAccordion(item.noid)}
                                />
                            </div>
                        </div>
                       
                        <div 
                            className="content-list"
                            style={{ height: ( item.noid === open ) ? contentHeight : 0 }}
                            ref={(element) => {
                                if (element) {
                                    calculateContentHeight(element);
                                }
                            }}
                        >
                        
                            < PDFDownloadLink 
                                document={ <PdfNotaEntrega notaEntrega={item} />}
                                fileName='notaOrden.pdf'
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
                                >Descarga PDF</button>
                            </PDFDownloadLink>
                            
                            
                            <div style={{display: 'flex', background: '#E9651A',gap: '1em',color: '#fff',alignItems: 'center',justifyContent: 'center',padding: 10,width: '95%',margin: '0 auto' }}>
                                <img src={neumatico_png}  />
                                <h4>NEUMATICOS</h4>
                            </div>
                            {item.ref_neumatico.map(neumatico => (
                            <div className='caja_orden' key={neumatico._id} >
                                <div className="caja_orden-row">
                                    <div>
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Numero alfa:</span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{ neumatico.alfa }</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Tipo de trabajo</span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{neumatico.tipo_trabajo.nombre_trabajo}</span>
                                    </div>
                                </div>  
                                <div className="caja_orden-row">
                                    <div style={{ width: '30%' }} >
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Marca:</span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{ neumatico.marca }</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Medida:</span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{neumatico.medida}</span>
                                    </div>
                                </div>
                                <div className="caja_orden-row">
                                    <div style={{ width: '30%' }} >
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Serie:</span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{ neumatico.serie }</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Costo (Bs):</span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{neumatico.tipo_trabajo.costo}</span>
                                    </div>
                                </div>                         
                            </div>
                            ))}
                            <div
                            style={{
                                display: 'flex',
                                background: '#E9651A',
                                gap: '1em',
                                color: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                                width: '95%',
                                margin: '0 auto'
                            }}
                            >
                                <img src={costos_png}  />
                                <h4>COSTOS</h4>
                            </div>

                            <div className="caja_orden">
                                <div className="caja_orden-row">
                                    <div>
                                        <span 
                                            style={{ fontWeight: 'bolder', 
                                            marginRight: 10, fontSize:14 }} 
                                        >Costo extras:</span>
                                        <br />
                                        <span style={{ fontSize:14 }} 
                                        >
                                            { item.costo_extras } Bs
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ 
                                            fontWeight: 'bolder', 
                                            marginRight: 10, fontSize:14 
                                        }} >
                                            Cotizacion:
                                        </span>
                                        <br />
                                        <span 
                                            style={{ fontSize:14 }} 
                                        >
                                            {item.cotizacion} Bs
                                        </span>
                                    </div>
                                </div>  
                                <div className="caja_orden-row">
                                    <div style={{ width: '30%' }}>
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >
                                                Anticipo:
                                        </span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{ item.anticipo }</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >
                                            Costo total:
                                        </span>
                                        <br />
                                        <span style={{ fontSize:14 }} >{ item.costo_final }</span>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
