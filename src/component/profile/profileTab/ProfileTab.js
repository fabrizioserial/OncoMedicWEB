import React,{useState,useEffect} from 'react'
import "../profileTab/ProfileTab.css"
import { Tuerquita } from '../../tuerquita/Tuerquita'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../../firebase'
import { useHistory } from 'react-router-dom';

export default function ProfileTab({user,image}) {
    const [state, setState] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
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
                    <p onChange={(e) => setCancer(e.target.value)} className="id-complete-profile-items">Tipo de cancer: <input className="id-complete-profile" type="text" disabled={!state} defaultValue={cancer}/></p>
                { seeMore ?
                    <div>
                        <p className="id-complete-profile-items">Fecha de nacimiento: {user.birth}</p>
                        <p className="id-complete-profile-items">Fuma: {user.smoke.smoke? "Si":"No"}</p>
                        {user.smoke.smoke && seeMore ?
                            <div>
                                <p className="id-complete-profile-items">Tiempo: {user.smoke.time}</p>
                                <p className="id-complete-profile-items">Cantidad por dia: {user.smoke.qnt}</p>
                            </div>:""
                        }
                        <p className="id-complete-profile-items">Diabetes: {user.dbt.dbt? "Si":"No"}</p>
                        {user.dbt.dbt ?
                            <div>
                                <p className="id-complete-profile-items">Medicamentos para la diabetes: {user.dbt.med}</p>
                            </div>:""
                        }
                            <p className="id-complete-profile-items">Epoc: {user.med.epoc? "Si":"No"}</p>
                            <p className="id-complete-profile-items">ACV: {user.med.acv? "Si":"No"}</p>
                            <p className="id-complete-profile-items">Infarto: {user.med.inf? "Si":"No"}</p>
                            <p className="id-complete-profile-items">Hipertension: {user.med.hip? "Si":"No"}</p>
                            <p onClick={()=>setSeeMore(!seeMore)} className="id-complete-profile-less">VER MENOS <FontAwesomeIcon icon={faChevronUp}/></p>
                        </div>:
                            <p onClick={()=>setSeeMore(!seeMore)} className="id-complete-profile-more">VER MAS <FontAwesomeIcon icon={faChevronDown}/></p>
                    }
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
