import React, { useState } from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import {ItemUser} from '../../ItemUser/ItemUser'
import './UserTabLastSymptoms.css'
import ModalPopOverSymptom from '../../modals/ModalPopOverSymptom';
import { useHistory } from 'react-router';

export const UserTabLastSymptoms=({symptomsList})=> {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [symptom, setSymptom] = useState('');


  function handleClose(){
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  // Modal ver completo

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseAndOpenModal = (event,item) => {
    item!==undefined && setSymptom(item);
    setOpenModal(true)
    setAnchorEl(null);
  }; 

  const history = useHistory();
  const switchToAllSympts = () => history.push(`/seeSymptoms/`);

  return (
      <div className="usertab-cont-info second" >
        {symptomsList.length > 0 ? (
        <>
        <table class="usertab-table">
            <thead className="usertab-thead">
                <tr>
                  <th className="ultimos-sin-th-fecha" scope="col">FECHA</th>
                  <th className="ultimos-sin-th-paciente" scope="col">NOMBRE</th>
                  <th className="ultimos-sin-th-sintoma" scope="col">SINTOMA</th>
                  <th className="ultimos-sin-th-respuesta"> </th>

                </tr>
            </thead>
            <tbody>
                { 
                    (symptomsList) && symptomsList.map((item,index) => <ItemUser symptom={item} key={index}  type="sympts" handleClick={handleCloseAndOpenModal} />)
                }
            </tbody>
            <Menu className="menu-eliminate-1"
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

            <ModalPopOverSymptom
              symptoms={symptom}
              displayModal={openModal}
              closeModal={handleCloseModal}
            />
            
        </table>
        {symptomsList.length>=6 && <button onClick={()=>switchToAllSympts()} className="usertab-btn-vermas">Ver mas</button>}
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