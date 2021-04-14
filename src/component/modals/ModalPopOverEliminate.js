import React,{useState} from 'react';
import './ModalPopOverEliminate.css'
import 'fontsource-roboto';
import { Alert } from '@material-ui/lab';



const ModalPopOverEliminate = (props) => {
   const [title, setTitle] = React.useState(null)
   const [errorMessage, setErrorMessage] = React.useState("");
     
     const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };
     function closeModal(e) {
        e.stopPropagation()
        setErrorMessage("")
        setTitle("")
        props.closeModal()
     }

     function handleIf(){
         {title===props.id ? idCorrect():idNotCorrect()}
     }

     const idNotCorrect = () => {
         setErrorMessage("Id del paciente incorrecto")
     }

     function idCorrect(){
         setTitle("")
         setErrorMessage("")
         props.handleEliminate()
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
               <p className="modal-eliminate-title">¿ESTA SEGURO QUE DESEA ELIMINAR AL USUARIO?</p>

            </div>
            <div className="inside-the-modal">
                <p>Numero del paciente: {props.id}</p>
            </div> 
            <div>
               <input className="eliminate-numero-del-paciente"
                  onChange={event => setTitle(event.target.value)}
                  value={title}
                  type="text"
                  autocomplete="off"
                  id="idDelPaciente"
                  placeholder="Introduzca el numero del paciente para confirmar"
                  variant="outlined"/>
            </div>
            
            <div className="modalopoovereliminate-error">
               {errorMessage && <div> {errorMessage} </div>}
            </div>
            <div>
               <button onClick={handleIf} className="agregar-eliminate-button">ELIMINAR</button>   
            </div>
            
         </div>
      </div>
     );
}
export default ModalPopOverEliminate;

