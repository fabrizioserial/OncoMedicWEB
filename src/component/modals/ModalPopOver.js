import React,{useState,useEffect} from 'react';
import './ModalPopOver.css'
import 'fontsource-roboto';
import {getFirestore} from '../../firebase'


const ModalPopOver = (props) => {
      const [name,setName] = useState("")
      const [email,setEmail] = useState("")
      const [password,setPassword] = useState("")
      const [id,setID] = useState("")

      const [disabled,setDisabled] = useState("")

     
      const verifyInformation = () =>{
         name.length > 0 && email.length >0 && password.length > 0 && id.length >0 && pushToDatabase() 
      }

      const pushToDatabase = () =>{
         setDisabled("disabled")
         const db = getFirestore()
         db.collection("medic").limit(6).doc({id}).set({
            name:name,
            email:email,
            password:password
         }).then(()=>{
            setDisabled("")  
         }).catch((e)=>{
            setDisabled("")  
         });
      }

     const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };
     function closeModal(e) {
        e.stopPropagation()
        props.closeModal() 
     }
     return (
       <div 
         className="modal"
         onClick={ closeModal }
         style={divStyle} >
          <div 
            className="modal-content"
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
               <input className="numero-del-paciente"
                  id="nameDoctor"
                  placeholder="Introduzca nombre y apellido"
                  onChange={e => setName(e.target.value)}
                  disabled={disabled}
                  variant="outlined"/>
            </div>
            <div className="add-inside-the-modal">
                <p>ID</p>
            </div> 
            <div className="modal-add-input-cont">
               <input className="numero-del-paciente"
                  id="idDoctor"
                  placeholder="Introduzca ID del medico"
                  onChange={e => setID(e.target.value)}
                  disabled={disabled}
                  variant="outlined"/>
            </div>
            <div className="add-inside-the-modal">
                <p>Email</p>
            </div> 
            <div className="modal-add-input-cont">
               <input className="numero-del-paciente"
                  id="mailDoctor"
                  placeholder="Introduzca email"
                  onChange={e => setEmail(e.target.value)}
                  disabled={disabled}
                  variant="outlined"/>
            </div>
            <div className="add-inside-the-modal">
                <p>Contraseña</p>
            </div> 
            <div className="modal-add-input-cont">
               <input className="numero-del-paciente"
                  id="passDoctor"
                  placeholder="Introduzca contraseña"
                  onChange={e => setPassword(e.target.value)}
                  disabled={disabled}
                  variant="outlined"/>
            </div>
            <div className="add-cont-button">
               <button className="agregar-button" onClick ={()=>verifyInformation()}>AGREGAR</button>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOver;
