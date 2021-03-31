import React from 'react'
import "../profileTab/ProfileTab.css"
import { Tuerquita } from '../../tuerquita/Tuerquita'
import {ProfileDatos} from './ProfileDatos'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate';

export default function ProfileTab() {
    const [state, setState] = React.useState(null);

    const handleEdit = () => {
        setState("true")
    }; 

    return (
        <div className="name-div-complete-profile">
            <ProfileDatos
                state={state} 
                DNI="42673854" 
                name="Altamirano, Carmen"
                cancerType=""
                fuma="true"
                diabetes="false"
                />
            <div className="tabhey-cont-options">
                    <div >
                       <Tuerquita style="profile" handleEdit={handleEdit}/>
                    </div>
            </div>
        </div>
    )
}
