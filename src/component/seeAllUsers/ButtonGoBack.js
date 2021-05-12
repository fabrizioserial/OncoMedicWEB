import React, { useEffect, useState } from 'react'
import './ButtonGoBack.css'
import { Link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'



export const ButtonGoBack = ({text,type,id}) => {

    const history = useHistory();
    const handleNaigate = () => {
        history.push(`/profile/${id}`);
    }

    return(
        <div className="go-back-back">
            {(type==="allUsers" && id) ? (
                    <button className="goBack-btn" onClick={handleNaigate}> <FontAwesomeIcon icon={faHome} className="go-back-space-icon" />{text}</button>
            ):(
                <Link to='/home' className="">
                <button className="goBack-btn"> <FontAwesomeIcon icon={faHome} className="go-back-space-icon" />{text}
                </button>
            </Link>
            )}
        </div>
    )
}
