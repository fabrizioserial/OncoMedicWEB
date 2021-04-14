import React,{useState} from 'react';
import 'fontsource-roboto';
import './ModalPopOverAsignCancer.css'
import { Alert } from '@material-ui/lab';



const ModalPopOverAsignCancer = (props) => {
   const [title, setTitle] = React.useState("")
   const [cancer, setCancer] = React.useState("")
     
   const divStyle = { 
         display: props.displayModal ? 'block' : 'none'
   };
   function closeModal(e) {
      e.stopPropagation()
      props.closeModal()
   }
   const handleAceptar = () => {
      setCancer(title)
      setTitle("")
      props.updateUser(cancer)
      
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
         <div>
            <p className="modal-eliminate-title">TIPO DE CANCER DEL PACIENTE</p>

         </div>
         <div className="inside-the-modal">
               <p>Paciente: {props.name}</p>
               <p>Id: {props.id}</p>
         </div> 
         <div>
            <input className="eliminate-numero-del-paciente"
               onChange={event => setTitle(event.target.value)}
               type="text"
               value={title}
               autocomplete="off"
               id="idDelPaciente"
               placeholder="Introduzca el tipo de cancer del paciente:"
               variant="outlined"/>
         </div>
         <div>
            <button onClick={handleAceptar} className="aceptar-cancer-button">ACEPTAR</button>   
         </div>
         
      </div>
   </div>
   );
}
export default ModalPopOverAsignCancer;

