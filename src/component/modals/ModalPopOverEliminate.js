import React,{useState} from 'react';
import './ModalPopOverEliminate.css'
import 'fontsource-roboto';



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
                <p>Nombre: {props.surname}, {props.name}</p>
                <p>Numero del paciente: {props.id}</p>
            </div> 
            <p className="modal-add-input-cont-error">{errorMessage ? "Id incorrecto":""}</p>
            <div className="div-btn-eliminate">
               <button onClick={idCorrect} className="agregar-eliminate-button">CONFIRMAR</button>   
            </div>
            
         </div>
      </div>
     );
}
export default ModalPopOverEliminate;

