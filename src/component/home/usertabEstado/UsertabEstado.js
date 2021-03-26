import React from 'react'
import '../usertabEstado/UsertabEstado.css'
import optionIcon from '../../../img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import {useState} from 'react-dom'
import { Component } from 'react';
import ModalPopOverELiminate from '../modals/ModalPopOverEliminate'
import { Router,Link, Route, Switch } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOverVerSintomas from '../modals/ModalPopOverVerSintomas'



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UsertabEstado=()=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClick = (event) => {
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
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
            <div className="estado-usertab-cont-background">
                <table class="estado-table">
                    <thead className="estado-usertab-thead">
                        <tr>
                        <th scope="col">ESTADO</th>
                        <th scope="col"></th>
                        <th scope="col">FECHA</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="estado-usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td>
                            <div>
                                    <Button aria-describedby={id}  onClick={e => handleClick(e)} className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></Button>
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
                                        <MenuItem className="menu-item-eliminar-profile" onClick={handleCloseAndOpenModal}>VER COMPLETO</MenuItem>
                                        <MenuItem >ELIMINAR</MenuItem>
                                    </Menu>
                                    <ModalPopOverVerSintomas 
                                        id={number}
                                        displayModal={openModal}
                                        closeModal={handleCloseModal}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="estado-usertab-final-button">VER TODOS</button>
            </div>
    )
}