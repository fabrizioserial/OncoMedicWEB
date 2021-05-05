import React, { useState } from 'react'
import './ButtonRefresh.css'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync,faHome } from '@fortawesome/free-solid-svg-icons'



export const ButtonRefresh = ({handleClick}) => {
    const[buttonclick,setButtonclick] = useState(false)

    const clicked = () =>{
        setButtonclick(!buttonclick)
        handleClick()
    } 
    return(
        <div className="div-refresh-btn">
            <button onClick={clicked} className="refresh-btn"> <FontAwesomeIcon icon={faSync} className={buttonclick ? "button-refresh-icon":"button-refresh-icon open"} /></button>
        </div>
    )
}
