import React from 'react'
import "../profileTab/ProfileTab.css"
import { Tuerquita } from '../../../tuerquita/Tuerquita'
import {ProfileDatos} from './ProfileDatos'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function ProfileTab() {
    const [state, setState] = React.useState(null);

    const handleEdit = () => {
        setState(!state)
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
                {!state? (
                    <div >
                       <Tuerquita style="profile" handleEdit={handleEdit}/>
                    </div>
                ):(
                    <div onClick={handleEdit} className="tabhey-btn-options">
                        <FontAwesomeIcon icon={faCheck} className="check-log-out" />
                    </div>
                )
                }
            </div>
        </div>
    )
}
