import React,{useState,useEffect} from 'react'
import './AcceptItemUser.css'


export const AcceptItemUser = ({user,active = false,handleClick}) => {
    const [status,setStatus] = useState(active)

    return (
        <div onClick={()=>handleClick(user)} className={active ? "aitem-background  aitem-border-active" : "aitem-background"}>
            <p className="aitem-name">{user.name} {user.surname}</p>
            <p className="aitem-id">{user.id}</p>
        </div>
    )
}
