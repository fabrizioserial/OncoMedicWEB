import React,{useState} from 'react'
import "../profileTab/ProfileTab.css"
import { Tuerquita } from '../../tuerquita/Tuerquita'
import {ProfileDatos} from './ProfileDatos'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function ProfileTab({user,image}) {
    const [state, setState] = useState(null);


    const handleEdit = () => {
        setState(!state)
    }; 

    return (
        <div className="name-div-complete-profile">
            <ProfileDatos
                state={state} 
                DNI={user.id} 
                name={user.name}
                cancerType=""
                fuma={user.smoke.smoke}
                diabetes={user.dbt.dbt}
                img= {image}
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
