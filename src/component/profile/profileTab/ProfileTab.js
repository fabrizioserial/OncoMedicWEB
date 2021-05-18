
import React,{useState,useEffect} from 'react'
import "../profileTab/ProfileTab.css"
import {OptionsMenu}  from '../../optionsMenu/OptionsMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../../firebase'
import { useHistory } from 'react-router-dom';
import '../profileTab/ProfileTab.css'
import "../profileTab/ProfileTab.css"
import ModalUpdateProfile from '../../modals/ModalUpdateProfile'
import {useSpring,animated} from 'react-spring'
import { Skeleton } from '@material-ui/lab'
import ImageFadeIn from "react-image-fade-in";
import moment from 'moment'

export default function ProfileTab({user,image,handleSnackBar,updateDate}) {

    const [seeMore, setSeeMore] = useState(false);
    const [name] = useState(user.name);
    const [cancer, setCancer] = useState(user.cancer);
    const [modal,setModal] = useState(false)
    const [imgLoaded,setImgLoaded] = useState(false)
    var [aDate,setADate] = useState(new Date())


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
        handleSnackBar("success","Usuario eliminado con exito!")
        switchToHome()
    }

    const editSnackBar = () => {
        handleSnackBar("success","La informacion del usuario se ha actualizado")
    }

    function formatedDate (date) {
        var dateComponent = moment(date).format('DD/MM/YYYY');
        return dateComponent
    }

    const history = useHistory();
    const switchToHome = () => history.push(`/home`);

    return (
        <animated.div className='name-div-complete-profile' style={contentProps}>
            <div className='div-complete-profile'>
                    {!imgLoaded ?
                        <Skeleton variant="circle" width={"169px"} height={"169px"}/>
                    :null}
                    <ImageFadeIn alt="" className='complete-profile-user-image' variant="circle" src={(image.url)} onLoad={() => (setImgLoaded(true))} style={{            animationName: 'gracefulimage',
                        animationDuration: '0.3s',
                        animationIterationCount: 1,
                        animationTimingFunction: 'ease-in',
                        display: !imgLoaded ? 'none' : undefined}}/>
                <div className='text-complete-profile'>
                    <p  className='id-complete-profile' type='text'>{user.id}</p>
                    <p className='name-complete-profile' > {`${user.surname} , ${user.name}`} </p>
                    <p onChange={(e) => setCancer(e.target.value)} className='id-complete-profile-items'>Tipo de cancer: <input className='id-complete-profile' type='text' disabled={true} defaultValue={cancer}/></p>
                { seeMore ?
                    <animated.div style={textProps}>
                        <p className='id-complete-profile-items'>Etnia: {user.etnia}</p>
                        <p className='id-complete-profile-items'>Fecha de nacimiento: {formatedDate(user.birth)}</p>
                        <p className='id-complete-profile-items'>Fuma: {user.smoke.smoke > 0 ? 'Si':'No'}</p>
                        {user.smoke.smoke > 0  &&
                            <div>
                                <p className='id-complete-profile-items'>Tiempo: {user.smoke.time} meses</p>
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
                            <p style={{marginTop: "1%"}} className='id-complete-profile-items'>Mail: {user.email}</p>
                            <p onClick={()=>setSeeMore(!seeMore)} className='id-complete-profile-less' style={{marginTop:'20px'}}>VER MENOS  <FontAwesomeIcon icon={faChevronUp}/></p>
                    </animated.div>:
                            <p onClick={()=>setSeeMore(!seeMore)} className='id-complete-profile-more'>VER MAS  <FontAwesomeIcon icon={faChevronDown}/></p>
                    }
                </div>
            </div>
                        <ModalUpdateProfile 
                            displayModal={modal}
                            closeModal={selectModal}
                            editSnackBar={editSnackBar}
                            user={user}
                            updateDate={updateDate}/>

            <div className='tabhey-cont-options'>
                {
                    <div >
                       <OptionsMenu id={user.id} type='profile' handleEdit={handleEdit} handleEliminado={handleEliminado}/>
                    </div>
                
                }
            </div>
        </animated.div>
    )
}
