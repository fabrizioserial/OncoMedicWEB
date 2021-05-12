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


export default function ProfileTab({user,image,handleSnackBar,updateDate}) {
    const [seeMore, setSeeMore] = useState(false);
    const [name, setName] = useState(user.name);
    const [cancer, setCancer] = useState(user.cancer);
    const [modal,setModal] = useState(false)


    
    const selectModal = (info) => {
       setModal(!modal)
    }


 

    const contentProps = useSpring({
        height: seeMore ? '100%':'50%'
    })

    const textProps = useSpring({
        opacity: seeMore? '1':'0'
    })

    const handleEdit = () => {
        setModal(!modal)
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
                            <p className='id-complete-profile-items'>Epoc: {user.med.epoc? 'Si':'No'}</p>
                            <p className='id-complete-profile-items'>ACV: {user.med.acv? 'Si':'No'}</p>
                            <p className='id-complete-profile-items'>Infarto: {user.med.inf? 'Si':'No'}</p>
                            <p className='id-complete-profile-items'>Hipertension: {user.med.hip? 'Si':'No'}</p>
                            <p onClick={()=>setSeeMore(!seeMore)} className='id-complete-profile-less' style={{marginTop:'20px'}}>VER MENOS  <FontAwesomeIcon icon={faChevronUp}/></p>
                    </animated.div>:
                            <p onClick={()=>setSeeMore(!seeMore)} className='id-complete-profile-more'>VER MAS  <FontAwesomeIcon icon={faChevronDown}/></p>
                    }
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
                       <OptionsMenu id={user.id} style='profile' handleEdit={handleEdit} handleEliminado={handleEliminado}/>
                    </div>
                
                }
            </div>
        </animated.div>
    )
}
