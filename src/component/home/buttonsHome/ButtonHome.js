import React from 'react'
import '../buttonsHome/ButtonHome.css'
import { Link } from 'react-router-dom'


export const ButtonHome = (props) => {
    return(
        props.color==="lightblue" ? 
            <Link to={props.link} className="btn-home-link" >
                <button className={props.color} onClick={props.onClick}>
                    <p>{props.text}</p>
                </button>
            </Link> 
            :
            <Link to={props.link} className="btn-home-link btn-home-margin" >
                <button className={props.color} onClick={props.onClick}>
                    <p>{props.text}</p>
                </button>
            </Link>  
    )
}