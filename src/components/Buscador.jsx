import React from 'react'
import lupa from '../assets/secretario/lupa.png'
import './css/search.css'

export const Buscador = () => {


    return (
        <div className="container">
            <form className='search'>
                <img src={ lupa } />
                <input 
                    type="text" 
                    name="search" 
                    placeholder='Buscar orden de trabajo'
                    autoComplete='off'
                />
            </form>
        </div>
      
    )
}
