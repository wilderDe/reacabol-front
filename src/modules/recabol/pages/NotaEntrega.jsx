import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { NavBar } from '../../../components/NavBar'
import { Buscador } from '../../../components/Buscador'
import { AcordionListaEntregados } from '../../../components/AcordionListaEntregados'
import nota_entrega_png from '../../../assets/secretario/nota_entrega.png'
import apiRecabol from '../../../api/config'


export const NotaEntrega = () => {
    
    const [bandera, setBandera] = useState(true)
    const [entregados, setEntregados] = useState([])
    const [realizados, setRealizados] = useState([])
    const navigate = useNavigate();

    const handleCambioView = ( valor ) => {
        setBandera(valor)
    }
    const formatDate = (date) => {
        const formDate = new Date(date)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return formDate.toLocaleDateString(undefined, options);
        
    }
    
    const obtenerLista = async() => {
        let arrayEntregados = []
        let arrayRealizados = []
        const {data} = await apiRecabol.get(`/nota_orden`);
        data.lista.map( item => {
            if(item.final_total && item.entregado){
                arrayEntregados = [ ...arrayEntregados, item ]
            }
            if(item.final_total && !item.entregado){
                arrayRealizados = [ ...arrayRealizados, item ]
            }
        })
        setEntregados(arrayEntregados)
        setRealizados(arrayRealizados)
    }

    const handleNavigate = ( id ) => {
        navigate(`/nota/${id}`)
    }

    useEffect(() => {
        obtenerLista()
    }, [])

    return (
        <div>
            <NavBar data={"NOTA DE ENTREGA"}/>
            <div className="row" style={{ display:'flex', marginTop: 15 , marginBottom:15,justifyContent:'space-around' }} >
                <div>
                    <span style={{
                        background:"#4E9E41",
                        padding:'10px 15px',
                        borderRadius: 10,
                        color: '#fff'
                    }}
                        onClick={ () => handleCambioView(true)}
                    >
                        Realizados
                    </span>
                </div>
                <div>
                    <span style={{
                        background:"#a2a2a2",
                        padding:'10px 15px',
                        borderRadius: 10,
                        color: '#fff'
                    }}
                        onClick={ () => handleCambioView(false) }
                    >Entregados</span>
                </div>
            </div>
            <Buscador />
            {bandera
            ?(realizados !== 0)
                &&realizados.map( item => (
                    <div style={{
                        background:"#4E9E4150",
                        width: '95%',
                        margin: '10px auto',
                        display: 'flex',
                        gap: 12,
                        padding: 10,
                        borderRadius: 10
                    }} key={item.noid}>
                        <div>
                            <p style={{ fontWeight: 'bolder', fontSize:14 }} >Orden de trabajo</p>
                            <p> {item.numero_orden} </p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bolder', fontSize:14 }} >Fecha de recepción</p>
                            <p> {formatDate(item.fecha_creacion)} </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', marginLeft:10 }}>   
                            <img src={nota_entrega_png} onClick={() => handleNavigate(item.noid)} />
                        </div>
                    </div>
                ))
            :(entregados !== 0)
                && <AcordionListaEntregados data={entregados} />        
            }

        </div>  
    )
}
