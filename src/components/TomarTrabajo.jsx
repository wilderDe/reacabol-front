import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar';
import { useOperario } from '../hooks/useOperario';
import Swal from 'sweetalert2';


const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export const TomarTrabajo = () => {
    
    const { tomar_trabajo, tienePendiente, finalizarTrabajo, rechazarTrabajo } = useOperario()

    const formatDate = (date) => {
        const formDate = new Date(date)
        const dia =formDate.getDate()+1;    
        const mes =  nombresMeses[formDate.getMonth()] ;
        const año = formDate.getFullYear();
        return `${dia} de ${mes} de ${año} `
    }
  
    const handleFinalizarTrabajo = async(  ) => {

        const { isConfirmed } = await Swal.fire({
            title: '¿Enviar a deposito?',
            text: '¿El neumatico finalizado sera enviado al deposito?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        })
        finalizarTrabajo( tomar_trabajo._id, tomar_trabajo.alfa.slice(0,4), isConfirmed )

    }

    const handleReachazarTrabajo = async() => {
    
        rechazarTrabajo(tomar_trabajo._id, tomar_trabajo.alfa.slice(0,4))
    }


    useEffect(() => {
        tienePendiente()
    }, [])
    

    return (
        <div>
            <NavBar data={"TOMAR TRABAJO"} />
            {(Object.keys(tomar_trabajo).length !== 0)
            &&<>
                <div className="container" style={{ background: '#8A878710', marginTop: 5, borderRadius:10 }}>
                    <div className="row rojo" style={{ paddingLeft:20 }}>
                        <div className="content-neumatico">
                            <p>Ordén de Trabajo:</p>
                            <p>{tomar_trabajo.alfa.slice(0,4)} </p>
                        </div>
                        <div className="content-neumatico">
                            <p>Fecha de Entrega:</p>
                            <p>{ formatDate(tomar_trabajo.fecha_entrega_aprox )} </p>
                        </div>
                    </div>

                    <div className="row" style={{padding: 5}}>
                        <span style={{fontWeight: 'bold', marginRight: 15}} >Neumatico c-alfa:</span>
                        <span> { tomar_trabajo.alfa } </span>
                    </div>
                    <div className="row" style={{padding: 5}}>
                        <div className="content-neumatico">
                            <p>Marca:</p>
                            <p> {tomar_trabajo.marca} </p>
                        </div>
                        <div className="content-neumatico">
                            <p>Tipo de trabajo:</p>
                            <p>{tomar_trabajo.tipo_trabajo.nombre_trabajo} </p>
                        </div>
                    </div>
                    <div className="row" style={{padding: 5}}>
                        <div className="content-neumatico">
                            <p>Medida:</p>
                            <p>{tomar_trabajo.medida} </p>
                        </div>
                        <div className="content-neumatico">
                            <p>Serie:</p>
                            <p>{tomar_trabajo.serie } </p>
                        </div>
                    </div>
                    <div className="row" style={{padding: 5}}>
                        <div className="content-neumatico">
                            <p>Accesorios:</p>
                            <p>{tomar_trabajo.accesorios} </p>
                        </div>
                        
                    </div>
             
                    <br />
                </div>
                <br />
                <div className="container" style={{background:'#8A878740', borderRadius: 10 }} >
                    <div className="row" style={{ paddingLeft:20, paddingBottom: 10 }}>
                        
                        <div className="column">
                            <span style={{ color:'#fff', background:'#ED0202', fontWeight: 'bold', fontSize:13, padding:5, marginTop: 10, display:'block', width:'145px', borderRadius: 10 }} 
                            onClick={handleReachazarTrabajo}
                        >RECHAZAR TRABAJO</span>
                        </div>
                        <div className="column">
                            <span style={{ color:'#fff', background:'#42C42D', fontWeight: 'bold', fontSize:13, padding:5, marginTop: 10, display:'block', width:'145px', borderRadius: 10 }} onClick={handleFinalizarTrabajo} >FINALIZAR TRABAJO</span>
                        </div>
                    
                    </div>
                
                </div>
            </>}
        </div>
    )
}
