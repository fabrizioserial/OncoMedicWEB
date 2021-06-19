import React, { useEffect, useState } from 'react'
import './ButtonGoBack.css'
import { Link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faArrowLeft } from '@fortawesome/free-solid-svg-icons'



export const ButtonGoBack = ({text,type,id,classNameProp=""}) => {

    const history = useHistory();
    const handleNaigate = () => {
        history.goBack();
    }

    return(
        <div className={`go-back-back ${classNameProp}`}>
            {(type==="allUsers") ? (
                    <button className="goBack-btn" onClick={handleNaigate}> <FontAwesomeIcon icon={faArrowLeft} className="go-back-space-icon" />{text}</button>
            ):(
                <Link to='/home' className="">
                <button className="goBack-btn"> <FontAwesomeIcon icon={faHome} className="go-back-space-icon" />{text}
                </button>
            </Link>
            )}
        </div>
    )
}
