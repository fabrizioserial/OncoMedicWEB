import React,{useState} from 'react';
import './ModalPopOverNewMedic.css'
import 'fontsource-roboto';
import {getFirestore} from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const ModalPopOverNewMedic = (props) => {
      const [name,setName] = useState("")
      const [email,setEmail] = useState("")
      const [password,setPassword] = useState("")
      const [disabled,setDisabled] = useState(false)
      const [errorEmail,setErrorEmail] = useState(false)
      const [errorName,setErrorName] = useState(false)
      const [errorPass,setErrorPass] = useState(false)
      const [passwordShown, setPasswordShown] = useState(false);
     
      const resetValues=()=>{
         setName("")
         setPassword("")
         setEmail("")
         resetErrors()
      }


      const resetErrors=()=>{
         setErrorName(false)
         setErrorPass(false)
         setErrorEmail(false)
      }

      const verifyInformation = () =>{
         const arroba = "@"
         
         if(name.length > 0 && email.length >0 && password.length > 0  && email.includes(arroba)){
            pushToDatabase()
         }
         else{
            name.length <=0  && (setErrorName(true))
            email.length <=0 && (setErrorEmail(true))
            !email.includes(arroba) && (setErrorEmail(true))
            password.length <=0 && (setErrorPass(true))
         }
      } 

      const pushToDatabase = () =>{
         setDisabled("disabled")
         const db = getFirestore()
         db.collection("medic").add({
            name:name,
            email:email,
            password:password
         }).then(()=>{
            setDisabled("")  
         }).catch((e)=>{
            setDisabled("")  
         });
         resetValues();
         props.closeModal() 
         props.handleOpensnackBar();
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
            className="modal-content-new-medic"
            onClick={ e => e.stopPropagation() } >
            <span 
                 className="close"
                 onClick={ closeModal }>&times;
            </span>
            <div >
               <p className="modal-title">REGISTRAR NUEVO MEDICO</p>
               <hr className="add-modal-line"/>
            </div>
            <div className="add-inside-the-modal">
                <p>Nombre y apellido</p>
            </div> 
            <div className="modal-add-input-cont">
            <input className={errorName ? "numero-del-paciente error" :"numero-del-paciente"}
                  value={name}
                  id="nameDoctor"
                  placeholder="Introduzca nombre y apellido"
                  onChange={e => setName(e.target.value)}
                  disabled={disabled}
                  variant="outlined"/>
            </div>
            <p className="modal-add-input-cont-error">{errorName ? "Introduzca un email valido":""}</p>
            <div className="add-inside-the-modal">
                <p>Email</p>
            </div> 
            <div className="modal-add-input-cont">
               <input className={errorEmail ? "numero-del-paciente error" :"numero-del-paciente"} 
                  value={email}
                  id="mailDoctor"
                  placeholder="Introduzca email" 
                  onChange={e => setEmail(e.target.value)}
                  disabled={disabled}
                  variant="outlined"/>
            </div>               
            <p className="modal-add-input-cont-error">{errorEmail ? "Introduzca un email valido":""}</p>
            <div className="add-inside-the-modal">
                <p>Contraseña</p>
            </div> 
            <div className="modal-add-input-cont">
               <div className={errorPass ? "numero-del-paciente error" :"numero-del-paciente"} >
                  <input style={{border: "none",width: "90%"}} className="input-new-medic" type={passwordShown ? "text" : "password"} 
                     value={password}
                     id="passDoctor"
                     placeholder="Al menos 8 carateres"
                     onChange={e => setPassword(e.target.value)}
                     disabled={disabled}
                     variant="outlined"/>
                  <FontAwesomeIcon style={{paddingRight: "2%"}} onClick={()=>setPasswordShown(!passwordShown)} icon={passwordShown ? faEye:faEyeSlash}/>
               </div>
            </div>
            <p className="modal-add-input-cont-error">{errorPass ? "Introduzca una contraseña valida":""}</p>
            <div className="add-cont-button">
            <button className="agregar-button" onClick ={verifyInformation}>Agregar</button>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverNewMedic;
