import React,{useState,useEffect} from 'react'
import './AcceptItemUser.css'


export const AcceptItemUser = ({user,active = false,handleClick,index,otherIndex}) => {
    const [status,setStatus] = useState(active)

    return (
        <div className={`div-`}>
            <div onClick={()=>handleClick(user,index)} className={active ? `aitem-background  aitem-border-active ${index===otherIndex}` : `aitem-background ${index===otherIndex}`}>
                <p className="aitem-name">{user.name} {user.surname}</p>
                <p className="aitem-id">{user.id ? user.id:"Id no ingresado por el paciente"}</p>
            </div>
        </div>
    )
}
