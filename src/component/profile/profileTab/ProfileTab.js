import React,{useState,useEffect} from 'react'
import "../profileTab/ProfileTab.css"
import { Tuerquita } from '../../tuerquita/Tuerquita'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../../firebase'
import { useHistory } from 'react-router-dom';

export default function ProfileTab({user,image}) {
    const [state, setState] = useState(false);
    const [name, setName] = useState(user.name);
    const [cancer, setCancer] = useState(user.cancer);


    const handleEdit = () => {
        console.log(state)
        setState(!state)
    }; 

    const handleEditAndPush = () => {
        setState(!state)
        const db = getFirestore()
        const thisUser = db.collection("users").doc(`${user.id}`)
        thisUser.update({
            name: name,
            cancer: cancer
        })
    }; 

    const handleEliminado = () => {
        switchToHome()
    }

    const history = useHistory();
    const switchToHome = () => history.push(`/home`);

    return (
        <div className="name-div-complete-profile">
            <div className="div-complete-profile">
                <img className="complete-profile-user-image" src={image.url} />

                <div className="text-complete-profile">
                    <p  className="id-complete-profile" type="text">{user.id}</p>
                    <p><input onChange={(e) => setName(e.target.value)} className="name-complete-profile" type="text" disabled={!state} defaultValue={name}/></p>
                    <p onChange={(e) => setCancer(e.target.value)} className="id-complete-profile-cancer">Tipo de cancer: <input className="id-complete-profile" type="text" disabled={!state} defaultValue={cancer}/></p>
                    <p className="id-complete-profile">Fuma: {user.fuma? "Si":"No"}</p>
                    <p className="id-complete-profile">Diabetes: {user.diabetes? "Si":"No"}</p>
                </div>
            </div>

            <div className="tabhey-cont-options">
                {!state? (
                    <div >
                       <Tuerquita id={user.id} style="profile" handleEdit={handleEdit} handleEliminado={handleEliminado}/>
                    </div>
                ):(
                    <div onClick={handleEditAndPush} className="tabhey-btn-options">
                        <FontAwesomeIcon icon={faCheck} className="check-log-out" />
                    </div>
                )
                }
            </div>
        </div>
    )
}
