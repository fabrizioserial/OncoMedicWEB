import React from 'react'
import './ButtonGoBack.css'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'



export const ButtonGoBack = ({text}) => {
    return(
        <div className="go-back-back">
            <Link to="/home" className="">
                <button className="goBack-btn"> <FontAwesomeIcon icon={faHome} className="go-back-space-icon" />{text}
                </button>
            </Link>
        </div>
    )
}
