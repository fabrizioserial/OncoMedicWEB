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
                        <th scope="col">SINTOMA</th>
                        <th scope="col"></th>
                        <th scope="col">GRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="sintoms-usertab-fila">
                            <td>22/02/21</td>
                            <td>Fiebre</td>
                            <td></td>
                            <td>3</td>
                        </tr>
                        <tr className="sintoms-usertab-fila">
                            <td>22/02/21</td>
                            <td>Fiebre</td>
                            <td></td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
                <button className="sintoms-usertab-final-button">VER TODOS</button>
            </div>
    )
}