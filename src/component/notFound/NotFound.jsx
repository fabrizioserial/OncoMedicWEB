import React,{useEffect,useState} from 'react'
import './NotFound.css'
import NotFoundImg from '../../img/userNotFound.png'
import { Link, useParams } from 'react-router-dom';

export const NotFound = () => {
    const {type} = useParams()
    const [link,setLink] = useState("/")
    const [text,setText] = useState("inicio")

    useEffect(()=>{
        switch (type) {
            case "login":
                setLink("/")
                setText("inicio")
                break;
            case "user":
                setLink("/home")
                setText("home")
                break;
            default:
                break;
        }
    },[type])

    return (
        <div className="notfound-cont">
            <img src={NotFoundImg} className="notfound-img"/>
            <div className="notfound-text">
                <p className="notfound-ops">Ooops...</p>
                <p className="notfound-sai">Sucedió algo inesperado</p>

                <Link to={link}>
                    <button className="notfound-btn">Volver al {text}</button>
                </Link>
            </div>
        </div>
    )
}
