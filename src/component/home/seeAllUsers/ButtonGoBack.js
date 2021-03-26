import React from 'react'
import '../seeAllUsers/ButtonGoBack.css'
import { Router,Link, Route, Switch } from 'react-router-dom'




export const ButtonGoBack = ({text}) => {
    return(
        <div className="go-back-back">
            <Link to="/home" >
                <button className="goBack-btn">{text}
                </button>
            </Link>
        </div>
    )
}
