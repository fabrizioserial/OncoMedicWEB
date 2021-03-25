import React from 'react'
import '../buttonsHome/ButtonHome.css'
import { Router,Link, Route, Switch } from 'react-router-dom'


export const ButtonHome = (props) => {
    return(
            <Link to={props.link} className="">
            <button className={props.color} onClick={props.onClick}>
                <p>{props.text}</p>
            </button></Link> 
    )
}