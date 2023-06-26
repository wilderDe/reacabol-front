import React, { useEffect, useState } from 'react'
import { useRegisterClient } from '../../../hooks/useRegisterClient'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../../components/NavBar'
import neumatico_png from '../../../assets/secretario/neumatico.png'
import costo_png from '../../../assets/secretario/costo.png'
import apiRecabol from '../../../api/config'
import '../css/notaentregaid.css'
import Swal from 'sweetalert2'

export const NotaEntregaId = () => {
    
    const { entregarNotaOrden } = useRegisterClient();
    const [valorGuardado, setValorGuardado] = useState(0)
    const [nota, setNota] = useState({})
    const [form, setForm] = useState({
        text_extras: "",
        costo_extras: "",
        costo_final: "",
        anticipo: nota.anticipo
    })

    const params = useParams()

    const encontrarNotaOrden  = async(id) => {

        const {data} = await apiRecabol.get(`/nota_orden`);
        const encontrado = data.lista.filter( item => {
            if(item.noid === id){
                return item
            }
            
        })

        setNota(encontrado[0])
        setValorGuardado(parseInt(encontrado[0].cotizacion) - parseInt(encontrado[0].anticipo))
        setForm({
            ...form,
            id_nota_orden: encontrado[0].noid,
            ['costo_final']: parseInt(encontrado[0].cotizacion) - parseInt(encontrado[0].anticipo)
        })
       
    }

    const onChange = ( { target } ) => {

        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleBlur = () => {
        if( Number(form.costo_extras) < 0 ){
            return Swal.fire("","No puede agregar valores negativos","question")
        }
        if(Number(form.costo_extras) >= 100){
            return Swal.fire("","El valor es muy grande","question")
        }

        const costoFinal = parseInt(form.costo_final) || 0;
        const costoExtras = parseInt(form.costo_extras) || 0;
      
        if (costoExtras === 0 || isNaN(costoExtras)) {
            setForm({
                ...form,
                costo_final: valorGuardado
            });
        } else {
            setForm({
                ...form,
                costo_final: costoFinal + costoExtras
            });
        }
    }

    const onSubmit = () => {
        entregarNotaOrden(form)
    }


    useEffect(() => {
        encontrarNotaOrden(params.id)
    }, [])

   
    
    if( Object.keys(nota).length === 0 ){
        return <>Cargando</>
    }

    return (
        <div>
            <NavBar data={"NOTA DE ENTREGA ID"} />
            {( Object.keys(nota).length !== 0 )
            &&<>
            <div className="caja_orden">
                <div>
                    <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Orden de trabajo:</span>
                    <span style={{ fontSize: 14 }} >{ nota.numero_orden }</span>
                </div>
                <div>
                    <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14}} >Nombre cliente:</span>
                    <span style={{ fontSize: 14 }} >{ nota.ref_neumatico[0].ref_cliente.nombre_apellidos }</span>
                </div>
                <div>
                    <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Celular cliente:</span>
                    <span style={{ fontSize: 14 }} >{ nota.ref_neumatico[0].ref_cliente.celular }</span>
                </div>
            </div>
            <div className="title_orden">
                <img src={neumatico_png}  />
                <h4>NEUMATICOS</h4>
            </div>
            {nota.ref_neumatico.map(neumatico => (
                <div className="caja_orden" key={neumatico._id}>
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


            {(!nota.entregado)
            ?<>
                <div className="title_orden">
                    <img src={costo_png}  />
                    <h4>COSTOS</h4>
                </div>
                <div className="caja_orden">
                    <div className="caja_orden-row">
                        <div style={{ width: '30%' }} >
                            <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Extras:</span>
                            <br />
                            <input 
                                type="text" 
                                className='btn_orden'
                                name='text_extras' 
                                value={form.text_extras} 
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Costo extras:</span>
                            <br />
                            <input 
                                type="number" 
                                className='btn_orden' 
                                name='costo_extras' 
                                value={form.costo_extras} 
                                onChange={onChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    <div className="caja_orden-row">
                        <div style={{ width: '30%' }}>
                            <span 
                                style={{ 
                                    fontWeight: 'bolder', 
                                    marginRight: 10, fontSize:14 }} 
                                >Anticipo:</span>
                            <br />
                            <span 
                                style={{ fontWeight: 'bolder', 
                                    marginRight: 10, 
                                    fontSize:14 }} 
                            >
                                {nota.anticipo}
                            </span>
                        </div>
                        <div  >
                            <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >Costo total:</span>
                            <br />
                            <span style={{ fontWeight: 'bolder', marginRight: 10, fontSize:14 }} >{form.costo_final} </span>
                        </div>  
                    </div>
                    <div className="caja_orden-row">
                        
                        <div className="div">
                            <input type="submit" value="entregar" className='btn_azul-o' onClick={onSubmit} />
                        </div>
                    </div>
                </div>
            </>
            : <></>
            }
            </>

            }
           
        </div>
    )
}
