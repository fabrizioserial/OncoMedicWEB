import React,{useState,useEffect} from 'react'
import './UserTabHome.css'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { Router,Link, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import {ItemUser} from '../../ItemUser/ItemUser'
import ModalPopOverVerRegistroDiario from '../../modals/ModalPopOverVerRegistroDiario';
import ModalPopOverSintomas from  '../../modals/ModalPopOverSintomas'
import {getFirestore} from '../../../firebase'


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const UserTabHome=({margin_left,userlist,images})=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDiario, setOpenModalDiario] = React.useState(false);
  const i = [1,2,3,4,5,6]
  const [list,setList] =useState(userlist)
  const [imageslist,setImageList] = useState(images)

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

  useEffect(()=>{
    setList(userlist)
    setImageList(images)
    console.log("image are ",imageslist)
    console.log("users are ",list)


  },[list,imageslist])



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
                       (userlist && imageslist) && list.map((item,index) => <ItemUser user={item} image={imageslist.find(element =>element.id==item.id)} key={index}  type="home" handleClick={handleClick} />)
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
                        <MenuItem onClick={handleCloseAndOpenModalDiario}>VER REGISTRO DIARIO</MenuItem>
                        <MenuItem onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>
                    </Menu>
                    <ModalPopOverEliminate
                        id={number} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                        displayModal={openModal}
                        closeModal={handleCloseModal}
                    />
                    <ModalPopOverVerRegistroDiario
                        çtype="diario"
                        displayModal={openModalDiario}
                        closeModal={handleCloseModalDiario}
                    />
                </tbody>
            </table>
            {userlist && <button className="usertab-btn-vermas">Ver mas</button>}
          </div>   
    )
}