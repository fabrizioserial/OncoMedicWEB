import React,{useState,useEffect} from 'react';
import './ModalPopOver.css'
import 'fontsource-roboto';
import {getFirestore} from '../../firebase'
import { ToastProvider,useToasts } from 'react-toast-notifications'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './ModalUpdateProfile.css'

const ModalUpdateProfile = (props) => {
      const [name,setName] = useState(props.user.name)
      const [lastName,setLastName] = useState(props.user.surname)
      const [cancer,setCancer] = useState(props.user.cancer)
      const [disabled,setDisabled] = useState(false)
      const [errorLastname,setErrorLastname] = useState(false)
      const [errorName,setErrorName] = useState(false)
      const [errorCancer,setErrorCancer] = useState(false)
     
      const resetValues=()=>{
         setName("")
         setErrorCancer("")
         setLastName("")
         resetErrors()
      }


      const resetErrors=()=>{
         setErrorName(false)
         setErrorLastname(false)
         setErrorCancer(false)
      }

      const verifyInformation = () =>{
         
         if(name.length > 0 && lastName.length >0 && cancer.length >0){
            pushToDatabase()
         }
         else{
            name.length <=0  && (setErrorName(true))
            lastName.length <=0  && (setErrorLastname(true))
            cancer.length <=0 && (setErrorCancer(true))
         }
      } 

      const pushToDatabase = () =>{
         setDisabled("disabled")
         const db = getFirestore()
         db.collection("users").doc(props.user.id).update({
         "name": name,
         "surname": lastName,
         "cancer": cancer}).then(()=>{
            setDisabled("")
            props.updateDate()
            props.closeModal() 

         }).catch(()=>{
            setDisabled("")
            props.closeModal() 

         })

      }

     const divStyle = { 
         display: props.displayModal ? 'block' : 'none'
     };


     function closeModal(e) {
         resetValues()
         e.stopPropagation()
         props.closeModal() 
     }
     return (
       <div className="modal" onClick={ closeModal } style={divStyle} >
          <div 
            className="modal-content-update-user"
            onClick={ e => e.stopPropagation() } >
            <span 
                 className="close"
                 onClick={ closeModal }>&times;
            </span>
            <div >
               <p className="modal-title">EDITAR PACIENTE</p>
               <hr className="add-modal-line"/>
            </div>
            <div className="containter-update">
               <div className="modal-update-div">
                  <div style={{flex:1, marginRight:"10px"}}>
                     <div className="uu-input-label">
                        <p>Nombre</p>
                     </div> 
                     <div className="modal-add-input-cont">
                        <input className={errorName ? "input-user error" :"input-user"}
                              value={name}
                              id="nameDoctor"
                              placeholder="Introduzca nombre"
                              onChange={e => setName(e.target.value)}
                              disabled={disabled}
                              variant="outlined"/>
                     </div>
                     <p className="modal-add-input-cont-error">{errorName && "Introduzca un nombre valido"}</p>
                  </div>
                  <div style={{flex:1, marginLeft:"10px"}}>
                     <div className="uu-input-label">
                        <p>Apellido</p>
                     </div> 
                     <div className="modal-add-input-cont">
                        <input className={errorLastname ? "input-user error" :"input-user"}
                              value={lastName}
                              id="nameDoctor"
                              placeholder="Introduzca apellido"
                              onChange={e => setLastName(e.target.value)}
                              disabled={disabled}
                              variant="outlined"/>
                     </div>
                     <p className="modal-add-input-cont-error">{errorLastname && "Introduzca un apellido valido"}</p>
                  </div>
               </div>
               <div >
                     <div className="uu-input-label">
                        <p>Cancer</p>
                     </div> 
                     <div className="modal-add-input-cont">
                        <input className={errorCancer ? "input-user error" :"input-user"}
                              value={cancer}
                              id="nameDoctor"
                              placeholder="Introduzca tipo de cancer"
                              onChange={e => setErrorCancer(e.target.value)}
                              disabled={disabled}
                              variant="outlined"/>
                     </div>
                     <p className="modal-add-input-cont-error">{errorCancer && "Introduzca un tipo de cancer valido"}</p>
               </div>
            </div>
 
            <div className="add-cont-button">
            <button className="agregar-button" onClick ={verifyInformation}>Guardar</button>
            </div>
         </div>
      </div>
     );
}
export default ModalUpdateProfile;
