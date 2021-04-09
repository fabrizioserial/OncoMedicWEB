import React from 'react'
import './ButtonRefresh.css'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync,faHome } from '@fortawesome/free-solid-svg-icons'



export const ButtonRefresh = ({handleClick}) => {
    return(
        <div className="div-refresh-btn">
            <button onClick={handleClick} className="refresh-btn"> <FontAwesomeIcon icon={faSync} className="go-back-space-icon" /></button>
        </div>
    )
}
