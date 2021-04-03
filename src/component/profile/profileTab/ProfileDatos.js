import React from 'react'
import '../profileTab/ProfileDatos.css'
import { TextField } from '@material-ui/core';

export const ProfileDatos = (props) => {
    return (
        <div className="div-complete-profile">
            <img className="complete-profile-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" />
            <div className="text-complete-profile">
                <input className="id-complete-profile" type="text" disabled={!props.state} defaultValue={props.DNI}/>
                <p><input className="name-complete-profile" type="text" disabled={!props.state} defaultValue={props.name}/></p>
                <p className="id-complete-profile">Tipo de cancer: <input className="id-complete-profile" type="text" disabled={!props.state} defaultValue={props.cancerType}/></p>
                <p className="id-complete-profile">Fuma: {props.fuma? "Si":"No"}</p>
                <p className="id-complete-profile">Diabetes: {props.diabetes? "Si":"No"}</p>
            </div>
        </div>
    )
}

