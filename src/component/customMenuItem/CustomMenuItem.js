import React,{useEffect,useState} from 'react'
import '../customMenuItem/CustomMenuItem.css'
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getFirestore} from '../../firebase'
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'
import ModalPopOverAcceptUser from '../modals/ModalPopOverAcceptUser'

export const CustomMenuItem = ({name,id,surname,type,handleEl,handleAc,cancerList,medicHistory}) => {

    const [user,setUser] = useState(id)
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalCancer, setOpenModalCancer] = React.useState(false);


    useEffect(() => {
        const db = getFirestore()
        const thisUser = db.collection("users").doc(`${id}`)
        setUser(thisUser)
    }, [id])


    const updateUser = (cancerType,medicHistory) => {
        user.update({
            status:"Activo",
            id:medicHistory,
            cancer: cancerType
        }).then(()=>        handleCloseModalCancer())

    }


    // Modal eliminar

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    function handleTimesClick(){
        setOpenModal(true);
    }

    // Modal introducir cancer

    const handleCheckClick = () => {
        setOpenModalCancer(true);
    }

    const handleCloseModalCancer = (bool) => {
        setOpenModalCancer(false);
        bool===true && handleAc()
    };

    const handleEliminate = () =>{
        user.update({
            status:"Inactivo",
        })
        handleEl()
        setOpenModal(false);
    }
    

    return (
        
        <div>
            {type==="finished" ? (
                    <p className="custom-menu-finished">No hay pacientes para aceptar</p>
            ) : (
                <div>
                    <table className="custom-menu-div">
                        <tbody>
                            <tr className="custom-menu-tr">
                                <td className="custom-menu-td1">
                                    <p className="custom-menu-text">{name}</p>
                                    <p className="custom-menu-id">Id:{id}</p>
                                </td>
                                <td >
                                        <p className="custom-menu-td2">
                                            <button className="tabhey-btn-options" onClick={handleCheckClick}><FontAwesomeIcon className="custom-menu-iconCheck" icon={faCheck}  /></button>
                                            <button className="tabhey-btn-options" onClick={handleTimesClick} ><FontAwesomeIcon className="custom-menu-iconTimes" icon={faTimes}  /></button>
                                        </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ModalPopOverEliminate
                        id={id}
                        name={name}
                        surname={surname}
                        displayModal={openModal}
                        closeModal={handleCloseModal}
                        handleEliminate={handleEliminate}
                    />
                    <ModalPopOverAcceptUser
                        name={name}
                        id={id}
                        surname={surname}
                        displayModal={openModalCancer}
                        closeModal={handleCloseModalCancer}
                        updateUser = {updateUser}
                        cancerList={cancerList}
                        medicHistory ={medicHistory}
                    />
                </div>
            )
            }
        </div>
    )
}
