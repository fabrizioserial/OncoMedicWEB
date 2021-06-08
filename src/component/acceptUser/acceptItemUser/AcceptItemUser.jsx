import React,{useState,useEffect} from 'react'
import './AcceptItemUser.css'


export const AcceptItemUser = ({name,surname,id,active = false}) => {
    const [status,setStatus] = useState(active)
    return (
        <div className={active ? "aitem-background  aitem-border-active" : "aitem-background"}>
            <p className="aitem-name">{name} {surname}</p>
            <p className="aitem-id">{id}</p>
        </div>
    )
}
