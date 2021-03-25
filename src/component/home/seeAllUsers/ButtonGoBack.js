import React from 'react'
import '../seeAllUsers/ButtonGoBack.css'
import { Router,Link, Route, Switch } from 'react-router-dom'




export const ButtonGoBack = (props) => {
    return(
        <div className="go-back-back">
            <Link to="/home" className="">
                <button className="goBack-btn">
                    <p>{props.text}</p>
                </button>
            </Link>
        </div>
    )
}
