import React from 'react'
import './UserTabHome.css'
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
import {ItemUser} from '../../ItemUser/ItemUser'


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UserTabHome=({margin_left})=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const i = [1,2,3,4,5,6]

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
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
      
          <div className="usertab-cont-info" style={margin_left&&margin_left}>
            <table class="usertab-table">
                <thead className="usertab-thead">
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">N PACIENTE</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        i.map(item => <ItemUser type="home" handleClick={handleClick} />)
                    }
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
                </tbody>
            </table>
            <button className="usertab-btn-vermas">Ver mas</button>
          </div>
      
    )
}