import React from 'react'
import './UsertabSintomas.css'
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
import { ItemUser } from '../../ItemUser/ItemUser'


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UsertabSintomas=()=> {
  const i = [1,2,3,4,5,6]

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
                        {
                          i.map(item => <ItemUser type="sintomas"/>)
                        }
                    </tbody>
                </table>
                <button className="sintoms-usertab-final-button">VER TODOS</button>
            </div>
    )
}