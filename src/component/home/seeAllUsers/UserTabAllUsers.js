import React from 'react'
import '../seeAllUsers/UserTabAllUsers.css'
import optionIcon from '../../../img/option_icon.png'
import { UserTabHome } from '../usertabhome/UserTabHome'
import { ButtonHome } from '../buttonsHome/ButtonHome'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../../ItemUser/ItemUser';
import { SearchTab } from './../../searchTab/SearchTab';
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Router,Link, Route, Switch } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

export const UserTabAllUsers = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [number, setNumber] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
  
    const handleClick = (event,number) => {
      setNumber(number);
      setAnchorEl(event.currentTarget);
    }; 
  
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    function handleClose(){
      setAnchorEl(null);
    }
  
    function handleCloseAndOpenModal(){
      setOpenModal(true);
      setAnchorEl(null);
    }

    const i = [1,2,3,4,5,6,7,8,9]

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <div className="userall-cont-background">

            <ButtonGoBack text="VOLVER AL INICIO" color="purple"/>

            <div className="userall-cont-cont">
                <SearchTab/>
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-allUsers">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">N PACIENTE</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                i.map(item => <ItemUser type="seeAllUsers" handleClick={handleClick} />)
                            }
                            <Menu className="menu-see-all-users"
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                                }}
                                transformOrigin={{
                                vertical: 'left',
                                horizontal: 'left',
                                }}>
                                <Link to="/profile" className="menu-item-profile">
                                    <MenuItem onClick={handleClose}>VER PERFIL</MenuItem>
                                </Link>
                                <MenuItem onClick={handleClose}>VER SINTOMAS</MenuItem>
                                <MenuItem onClick={handleClose}>VER REGISTRO DIARIO</MenuItem>
                                <MenuItem className="menu-item-eliminar-profile" onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>
                            </Menu>
                            <ModalPopOverEliminate
                                id={number} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                                displayModal={openModal}
                                closeModal={handleCloseModal}
                            />     

                        </tbody>
                    </table>
                    <button className="userall-btn-load-more">Cargar mas</button>
                </div>
            </div>
        </div>
    )
}