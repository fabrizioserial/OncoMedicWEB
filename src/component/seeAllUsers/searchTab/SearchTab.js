import React from 'react'
import './SearchTab.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faHome } from '@fortawesome/free-solid-svg-icons'

export const SearchTab = () => {

    
    
    return (
        <div className="searchtab-cont-cont">

            <input placeholder="Buscar por Nombre, Apellido, DNI, ID paciente" className="searchtab-input"/>
            <button className="searchtab-btn-icon"><FontAwesomeIcon icon={faSearch} className="searchtab-input-icon" /></button>
        </div>
    )
}
