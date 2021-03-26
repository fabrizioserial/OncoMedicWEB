import React from 'react'
import '../usertabSintomas/UsertabSintomas.css'
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

export const UsertabSintomas=()=> {
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
            <div className="sintoms-usertab-cont-background">
                <table class="sintoms-table">
                    <thead className="sintoms-usertab-thead">
                        <tr>
                        <th scope="col">FECHA</th>
                        <th scope="col">SINTOMAS</th>
                        <th scope="col"></th>
                        <th scope="col">GRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="sintoms-usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>Feliz</td>
                            <td>11/4/21</td>
                        </tr>
                        <tr className="sintoms-usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                        </tr>
                    </tbody>
                </table>
                <button className="sintoms-usertab-final-button">VER TODOS</button>
            </div>
    )
}