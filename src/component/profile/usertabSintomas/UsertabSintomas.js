import React,{useEffect,useState} from 'react'
import './UsertabSintomas.css'
import optionIcon from '../../../img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { Component } from 'react';
import ModalPopOverELiminate from '../../modals/ModalPopOverEliminate'
import { Router,Link, Route, Switch } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOver from "../../modals/ModalPopOver"
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import { ItemUser } from '../../ItemUser/ItemUser'


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UsertabSintomas=({sympstoms,descs})=> {
  const i = [1,2,3,4,5,6]
  const [sympInfo,setSympInfo] = useState(descs)

  useEffect(()=>{
      setSympInfo(descs)
  },[sympInfo,descs])

  return (
            <React.Fragment>
                {
                sympstoms.length > 0 ?
                (
                  <div>
                   <table class="sintoms-table">
                    <thead className="sintoms-usertab-thead">
                        <tr>
                        <th className="sintoms-th-fecha" scope="col">FECHA</th>
                        <th className="sintoms-th-fecha" scope="col">SINTOMA</th>
                        <th className="sintoms-th-grado" scope="col">GRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          sympstoms.map(item => <ItemUser desc={sympInfo.find(element => element.label == item.symptom)} symptom={item} type="sintomas"/>)
                        }
                    </tbody>
                  </table>
                  {sympstoms.length > 6 && <button className="menu-finalbutton">VER TODO</button>}
                </div>
                )
                :
                <div className="sintoms-img-error-cont">
                  <img className="sintoms-img-error" src="https://www.clicktoko.com/assets/images/nodata.png"/>
                  <p>No se encontró registro de sintomas</p>
                </div>
                }
            </React.Fragment>
    )
}