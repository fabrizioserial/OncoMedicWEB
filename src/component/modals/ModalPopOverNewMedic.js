import React,{useState,useEffect} from 'react';
import './ModalPopOverNewMedic.css'
import 'fontsource-roboto';
import {getFirestore} from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash,faTimes,faCheck } from '@fortawesome/free-solid-svg-icons'


const ModalPopOverNewMedic = (props) => {
      const [name,setName] = useState("")
      const [email,setEmail] = useState("")
      const [password,setPassword] = useState("")
      const [disabled,setDisabled] = useState(false)
      const [errorEmail,setErrorEmail] = useState(false)
      const [errorName,setErrorName] = useState(false)
      const [errorPass,setErrorPass] = useState(false)
      const [passwordShown, setPasswordShown] = useState(false);
      const [error,setError] = useState({upper:true,lower:true,number:true,chars:true})
      const [uniqueEmail,setUniqueEmail] = useState(false)
     
      const resetValues=()=>{
         setName("")
         setPassword("")
         setEmail("")
         setUniqueEmail(false)
         resetErrors()
      }


      const resetErrors=()=>{
         setErrorName(false)
         setErrorPass(false)
         setErrorEmail(false)
         setUniqueEmail(false)
         setError({upper:true,lower:true,number:true,chars:true})
      }

      const verifyInformation = () =>{
         const arroba = "@"
         
         if(name.length > 0 && email.length >0 && password.length > 0  && email.includes(arroba) && error.upper == false && error.lower == false && error.number == false && error.chars == false){
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
         let user
         let promises = db.collection("medic").where("email","==",email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                  user = doc.data()
                  console.log(doc.id, " => ", doc.data());
            });
         })


         promises.then(function(result){
            if(user == null){
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
            }else{
               setUniqueEmail(true)
               setDisabled("")
            }
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



      const setPasswordValidate = (e)=>{
         hasUpper(e.target.value)
         hasLower(e.target.value)
         hasNumber(e.target.value)
         hasChar(e.target.value)
         setPassword(e.target.value)
      }
      
      const hasUpper = (str) =>{
         return error.upper = !str.match(/[A-Z]/)
      }
      const hasLower = (str) =>{
         return error.lower = !str.match(/[a-z]/)
      }
      const hasNumber = (str) =>{
         return error.number = !str.match(/[0-9]/)
      }
      const hasChar = (str) =>{
         return error.chars = str.length < 8
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
            <p className="modal-add-input-cont-error">{errorEmail ? "Introduzca un email valido": uniqueEmail ? "Instroduzca un mail no registrado" : ""}</p>
            <div className="add-inside-the-modal">
                <p>Contraseña</p>
            </div> 
            <div className="modal-add-input-cont">
               <div className={errorPass ? "numero-del-paciente error" :"numero-del-paciente"} >
                  <input style={{border: "none",width: "90%"}} className="input-new-medic" type={passwordShown ? "text" : "password"} 
                     value={password}
                     id="passDoctor"
                     placeholder="Al menos 8 carateres"
                     onChange={e => setPasswordValidate(e)}
                     disabled={disabled}
                     variant="outlined"/>
                  <FontAwesomeIcon style={{paddingRight: "2%",cursor: "pointer"}} onClick={()=>setPasswordShown(!passwordShown)} icon={passwordShown ? faEye:faEyeSlash}/>
               </div>
            </div>
            <div className="add-inside-the-modal modal-add-input-cont " style={{alignItems:"start"}}>
               <p className={error.upper ? "modal-password-validate-text error-not-valid" :"modal-password-validate modal-password-validate-text"}><FontAwesomeIcon icon={error.upper ? faTimes:faCheck}/> Al menos 1 mayúscula</p>
               <p className={error.lower ? "modal-password-validate-text error-not-valid" :"modal-password-validate modal-password-validate-text"}><FontAwesomeIcon icon={error.lower ? faTimes : faCheck}/> Al menos 1 minúscula</p>
               <p className={error.number ? "modal-password-validate-text error-not-valid" :"modal-password-validate modal-password-validate-text"}><FontAwesomeIcon icon={error.number ? faTimes : faCheck}/> Al menos 1 número</p>
               <p className={error.chars ? "modal-password-validate-text error-not-valid" :"modal-password-validate modal-password-validate-text"}><FontAwesomeIcon icon={error.chars ? faTimes : faCheck}/> Al menos 8 caracteres</p>

            </div>
            <div className="add-cont-button">
            <button className="agregar-button" onClick ={verifyInformation}>Agregar</button>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverNewMedic;
