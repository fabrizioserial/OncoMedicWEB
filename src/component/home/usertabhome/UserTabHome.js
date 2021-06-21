import React,{useState} from 'react'
import './UserTabHome.css'
import {Menu,MenuItem} from '@material-ui/core'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'
import {ItemUser} from '../../ItemUser/ItemUser'
import { useHistory } from 'react-router-dom';
import {getFirestore} from '../../../firebase'
import ModalPopOverSeeDiaryReg from '../../modals/ModalPopOverSeeDiaryReg';

export const UserTabHome=({margin_left,userlist,images,handleEl,handleLoad})=> {
  var today = new Date()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDiario, setOpenModalDiario] = React.useState(false);
  const [regunique,setUniqReg] = useState()


  // Menu
  const handleClick = (event,item) => {
    setUser(item)
    setAnchorEl(event.currentTarget);
  }; 

  function handleClose(){
    setAnchorEl(null);
  }

  function handleSympts(){
    history.push(`/userSympts/${user.docid}`)
  }
  function handleCloseAndNavigate(){
    history.push(`/profile/${user.docid}`);
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



  function handleCloseDiario(){
    setOpenModalDiario(false);
  }

  // Eliminar usuario

  const handleEliminate = () =>{
    const db = getFirestore()
    const thisUser = db.collection("users").doc(`${user.id}`)
    thisUser.update({
      status:"Inactivo",
    })
    setOpenModal(false);  
    handleEl()
  }

  // Modal registro diario
  const findRegDiarios = ()=>{
    setAnchorEl(null);
    const db = getFirestore()
    const itemCollection = db.collection("diaryReg").where("id","==",user.id)
    itemCollection.onSnapshot((querySnapshot) => {
        
        let regList = querySnapshot.docs.map(doc => {
                return(
                    {id:doc.id,...doc.data()}
                    )
                }
            )
        
        var found = regList.find(function (element) {
          var fecha = Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(element.date.toDate())
          var hoy = Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today)
          return  fecha===(hoy);
        });
        setUniqReg(found) 
        
    })
    
    handleOpenDiario()
  }

  const handleDailyReg = ()=>{
    history.push(`/seeAllDiaryRegs/${user.docid}`)
  }

  const handleOpenDiario = () => {
    handleLoad(true)
    setTimeout(function () {
        handleLoad(false)
        setOpenModalDiario(true);
  }, 500);
  }

    const history = useHistory();
    const switchToAllUsers = () => history.push(`/seeAllUsers/`);


  return (
    <div className="usertab-cont-info" style={margin_left&&margin_left}>
      { userlist.length > 0 ? (
        <>
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
                  
                    (userlist && images) && userlist.map((item,index) => <ItemUser user={item} image={images.find(element =>element.id===item.avatar)} key={index}  type="home" handleClick={handleClick} />)
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
                    <MenuItem onClick={handleSympts}>VER SINTOMAS</MenuItem>
                    <MenuItem onClick={handleDailyReg}>VER REGISTROS DIARIOS</MenuItem>
                    <MenuItem onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>
                </Menu>
                <ModalPopOverEliminate
                    name={user.name}
                    surname={user.surname}
                    id={user.id} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                    displayModal={openModal}
                    closeModal={handleCloseModal}
                    handleEliminate={handleEliminate}
                />
                <ModalPopOverSeeDiaryReg  
                  name={user.name}
                  id={regunique}
                  displayModal={openModalDiario}
                  closeModal={handleCloseDiario}
                />

            </tbody>
        </table>
        {userlist.length>=6 && <button onClick={()=>switchToAllUsers()} className="usertab-btn-vermas">Ver mas</button>}
        </>
      ):(
        <div className="sintoms-img-error-cont">
          <img className="sintoms-img-error" alt="" src="https://firebasestorage.googleapis.com/v0/b/oncoback.appspot.com/o/images%2FdataNotFound.png?alt=media&token=6678405a-2133-4f49-8bd9-bd2f348b1962"/>
          <p  style={{fontSize: "1.3rem"}}>No se encontraron pacientes</p>
        </div>
      )}
    </div>   
    )
}