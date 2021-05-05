import React,{useEffect} from 'react'
import './UsertabState.css'
import optionIcon from '../../../img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import {useState} from 'react'
import { Component } from 'react';
import ModalPopOverELiminate from '../../modals/ModalPopOverEliminate'
import { Router,Link, Route, Switch } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOverSeeDiaryReg from '../../modals/ModalPopOverSeeDiaryReg'
import {ItemUser} from '../../ItemUser/ItemUser'
import {getFirestore} from '../../../firebase'



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UsertabState=({type,idProp,user})=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false); 
  const i = [1,2,3,4,5,6]
  const [regDiarios,setRegDiario] = useState([])
  const [regunique,setUniqReg] = useState()

  const handleClick = (event,item) => {
    setUniqReg(item)
    setAnchorEl(event.currentTarget);
  };

  const handletotalClick  = (event,item) => {
    setUniqReg(item)
    setOpenModal(true);
  }

  useEffect(()=>{
    console.log("modal a ",regunique)
  },[regunique])
  
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

  useEffect(()=>{
    console.log("DB READING")
        const db = getFirestore()
        const itemCollection = db.collection("diaryReg").where("id","==",idProp)
        itemCollection.onSnapshot((querySnapshot) => {
            
            let regList = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setRegDiario(regList)
        })
  },[idProp])

  return (
    <div>
        <table class="estado-table">
            <thead className="estado-usertab-thead">
                <tr>
                <th className="sintoms-th-fecha" scope="col">FECHA</th>
                <th scope="col"></th>
                <th scope="col">ESTADO</th>
                <th className="estado-th-button" scope="col"></th>
                </tr>
            </thead>
            {type=="profile" && (
              <tbody> 
                {
                regDiarios && regDiarios.map(item => <ItemUser handletotalClick={handletotalClick} type="estado" daily={item} handleClick={handleClick} />)
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
                    <MenuItem className="menu-item-eliminar-profile" onClick={handleCloseAndOpenModal}>VER COMPLETO</MenuItem>
                    <MenuItem >ELIMINAR</MenuItem>
                </Menu>
                <ModalPopOverSeeDiaryReg 
                    Date = {regunique && regunique.date.toDate()}
                    name={user.name}
                    id={regunique && regunique}
                    displayModal={openModal}
                    closeModal={handleCloseModal}
                />
            </tbody>
            )
            }
        </table>
        <div>
          {regDiarios.length > 3 && <Link to="/seeAllDiaryRegs"><button className="menu-finalbutton">VER TODO</button></Link>}
        </div>
    </div>

  )
}