import { Button, MenuItem } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import '../customMenuItem/CustomMenuItem.css'
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getFirestore} from '../../firebase'
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'

export const CustomMenuItem = ({name,id,type}) => {

    const [user,setUser] = useState(id)
    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Modal eliminar

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    function handleTimesClick(){
        setOpenModal(true);
    }

    useEffect(() => {
        const db = getFirestore()
        const thisUser = db.collection("users").doc(`${id}`)
        setUser(thisUser)
    }, [id])


    const handleCheckClick = () => {
        user.update({
            status:"Activo"
        })
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
                            displayModal={openModal}
                            closeModal={handleCloseModal}
                        />
                </div>
            )
            }
        </div>
    )
}
