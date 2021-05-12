<<<<<<< HEAD
import React,{useState} from 'react'
import "../profileTab/ProfileTab.css"
import { OptionsMenu } from '../../optionsMenu/OptionsMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../../firebase'
import { useHistory } from 'react-router-dom';
import {useSpring} from 'react-spring'
import Expand from 'react-expand-animated';
=======
import React,{useState,useEffect} from 'react'
<<<<<<< HEAD
import '../profileTab/ProfileTab.css'
import { Tuerquita } from '../../tuerquita/Tuerquita'
=======
import "../profileTab/ProfileTab.css"
import { OptionsMenu } from '../../optionsMenu/OptionsMenu'
>>>>>>> fd873c8697a50ec8c9bb240142cd1ff5437702b1
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../../firebase'
import { useHistory } from 'react-router-dom';
import {useSpring,animated} from 'react-spring'
import ModalUpdateProfile from './../../modals/ModalUpdateProfile';
>>>>>>> 9fc4795f9fd976b8d207e85e20e02cf30e4345b9


export default function ProfileTab({user,image,handleSnackBar,updateDate}) {
    const [seeMore, setSeeMore] = useState(false);
    const [name, setName] = useState(user.name);
    const [cancer, setCancer] = useState(user.cancer);
<<<<<<< HEAD
    const transitions = ["height", "opacity", "background"];
=======
    const [modal,setModal] = useState(false)


    
    const selectModal = (info) => {
       setModal(!modal)
    }


 
>>>>>>> 9fc4795f9fd976b8d207e85e20e02cf30e4345b9

    const contentProps = useSpring({
        height: seeMore ? '100%':'50%'
    })

<<<<<<< HEAD
    const handleEdit = () => {
        setState(!state)
=======
    const textProps = useSpring({
        opacity: seeMore? '1':'0'
    })

    const handleEdit = () => {
        setModal(!modal)
>>>>>>> 9fc4795f9fd976b8d207e85e20e02cf30e4345b9
    }; 

    const handleEditAndPush = () => {
        const db = getFirestore()
        const thisUser = db.collection('users').doc(`${user.id}`)
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
<<<<<<< HEAD
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
=======
        <animated.div className='name-div-complete-profile' style={contentProps}>
            <div className='div-complete-profile'>
                <img className='complete-profile-user-image' src={image.url} />
                <div className='text-complete-profile'>
                    <p  className='id-complete-profile' type='text'>{user.id}</p>
                    <p className='name-complete-profile' > {`${user.surname} , ${user.name}`} </p>
                    <p onChange={(e) => setCancer(e.target.value)} className='id-complete-profile-items'>Tipo de cancer: <input className='id-complete-profile' type='text' disabled={true} defaultValue={cancer}/></p>
                { seeMore ?
                    <animated.div style={textProps}>
                        <p className='id-complete-profile-items'>Fecha de nacimiento: {user.birth}</p>
                        <p className='id-complete-profile-items'>Fuma: {user.smoke.smoke > 0 ? 'Si':'No'}</p>
                        {user.smoke.smoke > 0  &&
>>>>>>> 9fc4795f9fd976b8d207e85e20e02cf30e4345b9
                            <div>
                                <p className='id-complete-profile-items'>Tiempo: {user.smoke.time}</p>
                                <p className='id-complete-profile-items'>Cantidad por dia: {user.smoke.qnt}</p>
                            </div>
                        }
                        <p className='id-complete-profile-items'>Diabetes: {user.dbt.dbt > 0 ? 'Si':'No'}</p>
                        {user.dbt.dbt > 0 &&
                            <div>
                                <p className='id-complete-profile-items'>Medicamentos para la diabetes: {user.dbt.med}</p>
                            </div>
                        }
<<<<<<< HEAD
                            <p className="id-complete-profile-items">Epoc: {user.med.epoc? "Si":"No"}</p>
                            <p className="id-complete-profile-items">ACV: {user.med.acv? "Si":"No"}</p>
                            <p className="id-complete-profile-items">Infarto: {user.med.inf? "Si":"No"}</p>
                            <p className="id-complete-profile-items">Hipertension: {user.med.hip? "Si":"No"}</p>
                    </Expand>
                            { !state && <p onClick={()=>setSeeMore(!seeMore)} className="id-complete-profile-more">{!seeMore ? "VER MAS":"VER MENOS"}  <FontAwesomeIcon icon={!seeMore ? faChevronDown:faChevronUp}/></p>}
=======
                            <p className='id-complete-profile-items'>Epoc: {user.med.epoc? 'Si':'No'}</p>
                            <p className='id-complete-profile-items'>ACV: {user.med.acv? 'Si':'No'}</p>
                            <p className='id-complete-profile-items'>Infarto: {user.med.inf? 'Si':'No'}</p>
                            <p className='id-complete-profile-items'>Hipertension: {user.med.hip? 'Si':'No'}</p>
                            <p onClick={()=>setSeeMore(!seeMore)} className='id-complete-profile-less' style={{marginTop:'20px'}}>VER MENOS  <FontAwesomeIcon icon={faChevronUp}/></p>
                    </animated.div>:
                            <p onClick={()=>setSeeMore(!seeMore)} className='id-complete-profile-more'>VER MAS  <FontAwesomeIcon icon={faChevronDown}/></p>
                    }
>>>>>>> 9fc4795f9fd976b8d207e85e20e02cf30e4345b9
                </div>
            </div>
                        <ModalUpdateProfile 
                            displayModal={modal}
                            closeModal={selectModal}
                            user={user}
                            updateDate={updateDate}/>

            <div className='tabhey-cont-options'>
                {
                    <div >
<<<<<<< HEAD
                       <OptionsMenu id={user.id} handleEdit={handleEdit} handleEliminado={handleEliminado}/>
                    </div>
                ):(
                    <div onClick={handleEditAndPush} className="tabhey-btn-options">
                        <FontAwesomeIcon icon={faCheck} className="check-log-out" />
=======
                       <OptionsMenu id={user.id} style='profile' handleEdit={handleEdit} handleEliminado={handleEliminado}/>
>>>>>>> 9fc4795f9fd976b8d207e85e20e02cf30e4345b9
                    </div>
                
                }
            </div>
        </div>
    )
}
