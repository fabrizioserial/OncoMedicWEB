import React,{useState} from 'react'
import './SearchTab.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faHome } from '@fortawesome/free-solid-svg-icons'

export const SearchTab = ({handleClick}) => {
    const [title, setTitle] = React.useState("")
    
    return (
        <div className="searchtab-cont-cont">
            <input
                onKeyPress={(e) => e.key === 'Enter' && handleClick(e,title)}   
                placeholder="Buscar por Nombre, Apellido, DNI, ID paciente" 
                className="searchtab-input"
                onChange={event => setTitle(event.target.value)}
                value={title}
                />
            <button onClick={(e)=>handleClick(e,title)} className="searchtab-btn-icon"><FontAwesomeIcon icon={faSearch} className="searchtab-input-icon" /></button>
        </div>
    )
}
