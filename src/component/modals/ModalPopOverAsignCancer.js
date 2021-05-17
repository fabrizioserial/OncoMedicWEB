import React,{useState} from 'react';
import 'fontsource-roboto';
import './ModalPopOverAsignCancer.css'



const ModalPopOverAsignCancer = (props) => {
   const [cancer, setCancer] = useState(null)
     
   const divStyle = { 
         display: props.displayModal ? 'block' : 'none'
   };
   function closeModal(e) {
      e.stopPropagation()
      props.closeModal()
   }

   const handleAceptar = () => {
      props.updateUser(cancer)
      setCancer("")
      props.closeModal(true)
   }

   return (
      <div 
      className="modal"
      onClick={closeModal}
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
               onChange={event => setCancer(event.target.value)}
               type="text"
               value={cancer}
               autocomplete="off"
               id="idDelPaciente"
               placeholder="Introduzca el tipo de cancer del paciente:"
               variant="outlined"/>
         </div>
         <div>
            <button style={{zIndex:"2"}} onClick={handleAceptar} className="aceptar-cancer-button">ACEPTAR</button>   
         </div>
      </div>
   </div>
   );
}
export default ModalPopOverAsignCancer;

