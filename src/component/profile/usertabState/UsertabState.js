import React,{useEffect} from 'react'
import './UsertabState.css'
import {Menu,MenuItem} from '@material-ui/core'
import {useState} from 'react'
import {useHistory } from 'react-router-dom'
import ModalPopOverSeeDiaryReg from '../../modals/ModalPopOverSeeDiaryReg'
import {ItemUser} from '../../ItemUser/ItemUser'
import {getFirestore} from '../../../firebase'
import { Skeleton } from '@material-ui/lab'

export const UsertabState=({type,idProp,user})=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false); 
  const [regDiarios,setRegDiario] = useState([])
  const [regunique,setUniqReg] = useState()
  const [skeleton,setSkeleton] = useState(true)

  const handleClick = (event,item) => {
    setUniqReg(item)
    setAnchorEl(event.currentTarget);
  };

  const handletotalClick  = (event,item) => {
    setUniqReg(item)
    setOpenModal(true);
  }
  
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

  const history = useHistory()
  function handleCloseAndNavigate(){
    history.push(`/seeAllDiaryRegs/${user.id}`);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(()=>{
    
        const db = getFirestore()
        const itemCollection = db.collection("diaryReg").where("id","==",idProp).limit(6)
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
      {regDiarios.length>0 ? (
        <>
        <table class="estado-table">
            <thead className="estado-usertab-thead">
                <tr>
                <th className="sintoms-th-fecha" scope="col">FECHA</th>
                <th scope="col"></th>
                <th scope="col">ESTADO</th>
                <th className="estado-th-button" scope="col"></th>
                </tr>
            </thead>
            {type === "profile" && 
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
            }
        </table>
        <div>
          {regDiarios.length >= 6 && <button onClick={handleCloseAndNavigate} className="menu-finalbutton">VER TODO</button>}
        </div>
        </>
      ):(
        skeleton ? 
          <></>
        :
        <div className="sintoms-img-error-cont">
          <img alt="" className="sintoms-img-error" src="https://www.clicktoko.com/assets/images/nodata.png"/>
          <p>No se encontraron registros diarios</p>
        </div>
      )}
    </div>

  )
}