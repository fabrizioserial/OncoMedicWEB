import React,{useState,useEffect} from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import {ItemUser} from '../../ItemUser/ItemUser'
import './UserTabLastSymptoms.css'
import ModalPopOverSintoma from '../../modals/ModalPopOverSintoma';



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UserTabLastSymptoms=({symptomsList})=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [number, setNumber] = React.useState(1);
  const [openModal, setOpenModal] = React.useState(false);
  const i = [1,2,3,4,5,6]

  // Menu
  const handleClick = (event,number) => {
    setAnchorEl(event.currentTarget);
  }; 

  function handleClose(){
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Modal eliminar

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  function handleCloseAndOpenModal(){
    setAnchorEl(null);
    setOpenModal(true);
  }


  return (
          <div className="usertab-cont-info" >
            <table class="usertab-table">
                <thead className="usertab-thead">
                    <tr>
                    <th className="usertab-first-col-empty" scope="col"></th>
                    <th scope="col">FECHA</th>
                    <th scope="col">N PACIENTE</th>
                    <th scope="col">SINTOMA</th>
                    <th scope="col" className="usertab-first-col-grado">GRADO</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       (symptomsList) && symptomsList.map((item,index) => <ItemUser symptom={item} key={index}  type="sympts" handleButtonClick={handleClick} handleClick={handleCloseAndOpenModal} />)
                    }
                </tbody>
                <Menu className="menu-eliminate-1"
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                  }}
                  transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                  }}>
                  <MenuItem onClick={handleCloseAndOpenModal}>VER COMPLETO</MenuItem>
                  <MenuItem onClick={handleClose}>ELIMINAR</MenuItem>
                  </Menu>

                <ModalPopOverSintoma
                  number={number}
                  displayModal={openModal}
                  closeModal={handleCloseModal}
                />
                
            </table>
            {symptomsList && <button className="usertab-btn-vermas">Ver mas</button>}
          </div>   
    )
}