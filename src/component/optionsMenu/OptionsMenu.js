import React, { useState } from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import { Link,} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import '../optionsMenu/OptionsMenu.css'
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'


export const OptionsMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Menu

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      }; 

    function handleClose(){
        setAnchorEl(null);
    }

    // Pop modal

    const handleCloseModal = () => {
        setOpenModal(false);
      };
    
    function handleCloseAndOpenModal(){
        setOpenModal(true);
        setAnchorEl(null);
    }

    function handleCloseAndOpenEdit(){
        setAnchorEl(null);
        props.handleEdit()
    }




    // ELiminar

    const handleEliminate = () =>{
        setOpenModal(false);
        props.handleEliminado()
    }


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div onClick={handleClick} className="tabhey-btn-options">
               <FontAwesomeIcon icon={faCog} className="button-log-out" />
            </div>
             <Menu className={`menu-eliminate-tuerquita-${props.type}`}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                        
                        {props.type==="home"? (
                            <Link  className="tuerquita-link-to-home" to="/">
                                <MenuItem >Log out</MenuItem>
                            </Link>
                        ) : (
                            <div>
                                    <MenuItem onClick={handleCloseAndOpenEdit}>Editar</MenuItem>
                                    <MenuItem onClick={handleCloseAndOpenModal}  >Eliminar</MenuItem>
                            </div>
                        )}
            </Menu> 
            <ModalPopOverEliminate
                name={props.name}
                surname={props.surname}
                id={props.id}
                displayModal={openModal}
                closeModal={handleCloseModal}
                handleEliminate={handleEliminate}
            />          
        </div>
    )
}
