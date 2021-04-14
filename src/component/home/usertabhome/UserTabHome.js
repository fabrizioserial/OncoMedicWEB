import React,{useState,useEffect} from 'react'
import './UserTabHome.css'
import {Menu,MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import {ItemUser} from '../../ItemUser/ItemUser'
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import {getFirestore} from '../../../firebase'



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UserTabHome=({margin_left,userlist,images})=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDiario, setOpenModalDiario] = React.useState(false);
  const i = [1,2,3,4,5,6]

  // Menu
  const handleClick = (event,item) => {
    setUser(item)
    setAnchorEl(event.currentTarget);
  }; 

  function handleClose(){
    setAnchorEl(null);
  }

  function handleCloseAndNavigate(){
    history.push(`/profile/${user.id}`);
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

  // Eliminar usuario

  const handleEliminate = () =>{
    const db = getFirestore()
    db.collection("users").doc(`${user.id}`).delete().then(() => {
      console.log("Document successfully deleted!");
    })
    setOpenModal(false);

  }



    const history = useHistory();
    const switchToAllUsers = () => history.push(`/seeAllUsers/`);


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
                       (userlist && images) && userlist.map((item,index) => index < 9 &&  <ItemUser user={item} image={images.find(element =>element.id==item.avatar)} key={index}  type="home" handleClick={handleClick} />)
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
                        <MenuItem onClick={handleCloseAndNavigate}>VER PERFIL</MenuItem>
                        <MenuItem onClick={handleClose}>VER SINTOMAS</MenuItem>
                        <MenuItem onClick={handleCloseAndOpenModalDiario}>VER REGISTRO DIARIO</MenuItem>
                        <MenuItem onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>
                    </Menu>
                    <ModalPopOverEliminate
                        id={user.id} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                        displayModal={openModal}
                        closeModal={handleCloseModal}
                        handleEliminate={handleEliminate}
                    />

                </tbody>
            </table>
            {userlist && <button onClick={()=>switchToAllUsers()} className="usertab-btn-vermas">Ver mas</button>}
          </div>   
    )
}