import { useEffect, useState } from 'react';
import apiRecabol from '../api/config';
import './css/listatrabajo.css'
import { useOperario } from '../hooks/useOperario';

const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
export const ListaTrabajosOpe = () => {

    const [neumaticos, setNeumaticos] = useState([])
    const { tomarTrabajoOperario } = useOperario();
    
    const obtnerListaNeumaticos = async() => {

        const {data} = await apiRecabol.get('/neumatico/operario');
        setNeumaticos(data.neumaticos)
        
    }
    const formatDate = (date) => {
        const formDate = new Date(date)
        const dia =formDate.getDate()+1;    
        const mes =  nombresMeses[formDate.getMonth()] ;
        const año = formDate.getFullYear();
        return `${dia} de ${mes} de ${año} `
    }
    const TomarTrabajo = ( neumatico ) => {   
        tomarTrabajoOperario(neumatico)
    }


    useEffect(() => {
        obtnerListaNeumaticos()
    }, [])
    
    if(neumaticos.length === 0){
        return <>cargando...</>
    }

    return (
        <div className='container'>
            {neumaticos.map(neumatico => (
                <div className="list-oper" key={neumatico.nid}>
                <span onClick={() => TomarTrabajo(neumatico) } >TOMAR TRABAJO</span>

                <div className="row">
                    <span style={{fontWeight: 'bold', marginRight: 10}} >Neumatico c-alfa:</span>
                    <span> { neumatico.alfa } </span>
                </div>
                <div className="row">
                    <div className="content-neumatico">
                        <p>Marca:</p>
                        <p> {neumatico.marca} </p>
                    </div>
                    <div className="content-neumatico">
                        <p>Tipo de trabajo:</p>
                        <p>{neumatico.tipo_trabajo.nombre_trabajo} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="content-neumatico">
                        <p>Medida:</p>
                        <p>{neumatico.medida} </p>
                    </div>
                    <div className="content-neumatico">
                        <p>Serie:</p>
                        <p>{neumatico.serie } </p>
                    </div>
                </div>
                <div className="row">
                    <div className="content-neumatico">
                        <p>Fecha de entraga:</p>
                    </div>
                    <div className="content-neumatico">
                        <span>{formatDate(neumatico.fecha_entrega_aprox)} </span>
                    </div>
                </div>
            </div> 
            ))}
        </div>
    )
}
