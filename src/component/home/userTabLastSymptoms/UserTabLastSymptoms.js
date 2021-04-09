import React,{useState,useEffect} from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import {ItemUser} from '../../ItemUser/ItemUser'



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UserTabLastSymptoms=({symptomsList})=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDiario, setOpenModalDiario] = React.useState(false);
  const i = [1,2,3,4,5,6]

  // Menu
  const handleClick = (event,number) => {
    setNumber(number);
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
    setOpenModal(true);
    setAnchorEl(null);
  }

  // Modal registro diario

  function handleCloseAndOpenModalDiario(){
    setOpenModalDiario(true);
    setAnchorEl(null);
  }

  const handleCloseModalDiario = () => {
    setOpenModalDiario(false);
  };



  return (
          <div className="usertab-cont-info" >
            <table class="usertab-table">
                <thead className="usertab-thead">
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">N PACIENTE</th>
                    <th scope="col">SINTOMA</th>
                    <th scope="col">GRADO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       (symptomsList) && symptomsList.map((item,index) => <ItemUser  symptom={item} key={index}  type="sympts" handleClick={handleClick} />)
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

                        <MenuItem onClick={handleClose}>VER PERFIL</MenuItem>
                        <MenuItem onClick={handleClose}>VER SINTOMAS</MenuItem>
                        <MenuItem onClick={handleCloseAndOpenModalDiario}>VER REGISTRO DIARIO</MenuItem>
                        <MenuItem onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>
                    </Menu>
                    <ModalPopOverEliminate
                        id={number} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                        displayModal={openModal}
                        closeModal={handleCloseModal}
                    />
                </tbody>
            </table>
            {symptomsList && <button className="usertab-btn-vermas">Ver mas</button>}
          </div>   
    )
}