import React,{useState} from 'react';
import './ModalPopOverAcceptUser.css'
import 'fontsource-roboto';
import {getFirestore} from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const ModalPopOverAcceptUser = (props) => {
      const [medicHistory,setMedicHistory] = useState(props.medicHistory)
      const [cancer,setCancer] = useState(props.cancerList[0])
      const [cancerList,setCancerList] = useState(props.cancerList)
      const [disabled,setDisabled] = useState(false)
      const [mdHisError,setMdHisError] = useState(false)
      const [cancerError,setCancerError] = useState(false)


     
      const resetValues=()=>{
         setMedicHistory("")
         setCancer("")
         resetErrors()
      }


      const resetErrors=()=>{
         setCancerError(false)
         setMdHisError(false)
      }

      const verifyInformation = () =>{
          console.log("El historial ",medicHistory)
            console.log("El cancer ",cancer.name)
          medicHistory != "" && cancer != ""&& props.updateUser(cancer,medicHistory)
           
       } 

     const divStyle = { 
         display: props.displayModal ? 'block' : 'none'
     };


     function closeModal(e) {
         resetValues()
         e.stopPropagation()
         props.closeModal() 
     }
     const handleSwitchCancer = (event)=>{
         setCancer(event.target.value)
     }


     return (
       <div className="modal" onClick={ closeModal } style={divStyle} >
          <div 
            className="modal-content-new-medic"
            onClick={ e => e.stopPropagation() } >
            <span 
                 className="close"
                 onClick={ closeModal }>&times;
            </span>
            <div >
               <p className="modal-title">ACEPTAR NUEVO USUARIO</p>
               <hr className="add-modal-line"/>
            </div>
            <div className="add-inside-the-modal">
               <p>Paciente: {`${props.name} ${props.surname}`}</p>
               <p>Id: {props.id}</p>
            </div> 
            {
                medicHistory == "" &&
                <React.Fragment>
                <div className="add-inside-the-modal">
                    <p>Historial médico</p>
                </div> 
                <div className="modal-add-input-cont">
                <input className={mdHisError ? "accept-numero-del-paciente error" :"accept-numero-del-paciente"}
                    value={medicHistory}
                    id="nameDoctor"
                    placeholder="Introduzca historial medico"
                    onChange={e => setMedicHistory(e.target.value)}
                    disabled={disabled}
                    variant="outlined"/>
                </div>
                <p className="modal-add-input-cont-error">{mdHisError ? "Introduzca un email valido":""}</p>
                </React.Fragment>
            }
            
            <div className="add-inside-the-modal">
                <p>Tipo de cancer</p>
            </div> 
            <div className="modal-add-input-cont">
                <select className="accept-numero-del-paciente accept-select" value={cancer} onChange={handleSwitchCancer} disabled={disabled} style={{height:"37px",widht:"380px"}}>
                {
                    cancerList.length > 0 && cancerList.map((item)=><option value={item.name}>{item.name}</option>)
                }
                </select>
            </div>               
            <p className="modal-add-input-cont-error">{cancerError ? "Introduzca un email valido":""}</p>
            <div className="add-cont-button">
            <button className="agregar-button" onClick={verifyInformation}>Aceptar</button>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverAcceptUser;
