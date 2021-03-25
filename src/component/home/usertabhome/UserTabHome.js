import React from 'react'
import '../usertabhome/UserTabHome.css'
import optionIcon from '../../../img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import {useState} from 'react-dom'
import { Component } from 'react';
import ModalPopOverELiminate from '../modals/ModalPopOverEliminate'
import { Router,Link, Route, Switch } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOver from "../modals/ModalPopOver"
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UserTabHome=()=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClick = (event,number) => {
    setNumber(number);
    setAnchorEl(event.currentTarget);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
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
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
            <div className="usertab-cont-background">
                <div className="usertab-cont-info">
                <table class="table">
                    <thead className="usertab-thead">
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">N PACIENTE</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td>
                                <div>
                                    <Button aria-describedby={id}  onClick={e => handleClick(e,1)} className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></Button>
                                    <Menu className="menu-eliminate-1"
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
                                        <MenuItem className="menu-item-eliminar-profile" onClick={e => handleCloseAndOpenModal}>ELIMINAR</MenuItem>
                                    </Menu>
                                    <ModalPopOverEliminate 
                                        id={number}
                                        displayModal={openModal}
                                        closeModal={handleCloseModal}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td>
                                <div>
                                    <Button aria-describedby={id}  onClick={e => handleClick(e,2)} className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></Button>
                                    <Menu className="menu-eliminate-1"
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
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
    )
}