import React,{useState} from 'react';
import './ModalPopOverEliminate.css'
import 'fontsource-roboto';
import { Alert } from '@material-ui/lab';



const ModalPopOverEliminate = (props) => {
   const [title, setTitle] = useState(null)
   const [errorMessage, setErrorMessage] = useState(false);
     
     const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };
     function closeModal(e) {
        e.stopPropagation()
        setErrorMessage(false)
        setTitle("")
        props.closeModal()
     }

     function handleIf(){
         {title===props.id ? idCorrect():idNotCorrect()}
     }

     const idNotCorrect = () => {
         setErrorMessage(true)
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
            <div className="modal-add-input-cont">
               <input className={errorMessage? "numero-del-paciente error" :"numero-del-paciente"}
                  onChange={event => setTitle(event.target.value)}
                  value={title}
                  type="text"
                  autocomplete="off"
                  id="idDelPaciente"
                  placeholder="Introduzca el numero del paciente para confirmar"
                  variant="outlined"/>
            </div>
            <p className="modal-add-input-cont-error">{errorMessage ? "Id incorrecto":""}</p>
            <div>
               <button onClick={handleIf} className="agregar-eliminate-button">ELIMINAR</button>   
            </div>
            
         </div>
      </div>
     );
}
export default ModalPopOverEliminate;

