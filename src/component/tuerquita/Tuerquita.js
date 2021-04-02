import React from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import { Link,} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import '../tuerquita/Tuerquita.css'
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'


export const Tuerquita = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);

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

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div onClick={handleClick} className="tabhey-btn-options">
               <FontAwesomeIcon icon={faCog} className="button-log-out" />
            </div>
             <Menu className={`menu-eliminate-tuerquita-${props.style}`}
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
                        
                        {props.style=="home"? (
                            <Link  className="tuerquita-link-to-home" to="/">
                                <MenuItem >Log out</MenuItem>
                            </Link>
                        ) : (
                            <div>
                                    <MenuItem onClick={props.handleEdit}>Editar</MenuItem>
                                    <MenuItem onClick={handleCloseAndOpenModal} >Eliminar</MenuItem>
                            </div>
                        )}
            </Menu> 
            <ModalPopOverEliminate
                displayModal={openModal}
                closeModal={handleCloseModal}
            />          
        </div>
    )
}
