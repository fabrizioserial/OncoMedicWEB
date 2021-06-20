import React from 'react'
import './NotFound.css'
import NotFoundImg from '../../img/userNotFound.png'
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="notfound-cont">
            <img src={NotFoundImg} className="notfound-img"/>
            <div className="notfound-text">
                <p className="notfound-ops">Ooops...</p>
                <p className="notfound-sai">Sucedió algo inesperado</p>

                <Link to="/">
                    <button className="notfound-btn">Volver al inicio</button>
                </Link>
            </div>
        </div>
    )
}
