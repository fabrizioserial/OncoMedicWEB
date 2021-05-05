import React,{useState} from 'react'
import "../profileTab/ProfileTab.css"
import { OptionsMenu } from '../../optionsMenu/OptionsMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../../firebase'
import { useHistory } from 'react-router-dom';
import {useSpring} from 'react-spring'
import Expand from 'react-expand-animated';


export default function ProfileTab({user,image,handleSnackBar}) {
    const [state, setState] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [name, setName] = useState(user.name);
    const [cancer, setCancer] = useState(user.cancer);
    const transitions = ["height", "opacity", "background"];

    const contentProps = useSpring({
        height: seeMore ? "100%":"50%"
    })

    const handleEdit = () => {
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
        handleSnackBar()
        switchToHome()
    }

    const history = useHistory();
    const switchToHome = () => history.push(`/home`);

    return (
        <div className="name-div-complete-profile" style={contentProps}>
            <div className="div-complete-profile">
                <img alt="" className="complete-profile-user-image" src={image.url} />

                <div className="text-complete-profile">
                    <p  className="id-complete-profile" type="text">{state && "Id: "}{user.id}</p>
                    <p className="name-complete-profile">{state && "Nombre: "}<input className="name-complete-profile" onChange={(e) => setName(e.target.value)} type="text" disabled={!state} defaultValue={name}/></p>
                    <p onChange={(e) => setCancer(e.target.value)} className="id-complete-profile-items">Tipo de cancer: <input className="id-complete-profile" type="text" disabled={!state} defaultValue={cancer}/></p>
                    <Expand className="expand-profile-tab"
                        open={seeMore}
                        duration={1000}
                        transitions={transitions}
                        >
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
                    </Expand>
                            { !state && <p onClick={()=>setSeeMore(!seeMore)} className="id-complete-profile-more">{!seeMore ? "VER MAS":"VER MENOS"}  <FontAwesomeIcon icon={!seeMore ? faChevronDown:faChevronUp}/></p>}
                </div>
            </div>

            <div className="tabhey-cont-options">
                {!state? (
                    <div >
                       <OptionsMenu id={user.id} handleEdit={handleEdit} handleEliminado={handleEliminado}/>
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
