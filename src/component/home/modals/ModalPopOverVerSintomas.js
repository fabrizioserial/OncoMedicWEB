import React from 'react';
import './ModalPopOverVerSintomas.css'
import 'fontsource-roboto';


const ModalPopOverVerSintomas = (props) => {
     
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
            <div>
               <p className="modal-eliminate-title">...</p>

            </div>
            <div className="inside-the-modal">

            </div> 
            <div>
               <input className="eliminate-numero-del-paciente"
                  id="idDelPaciente"
                  placeholder="Introduzca el numero del paciente para confirmar"
                  variant="outlined"/>
            </div>
            <div>
               <button className="agregar-eliminate-button">ELIMINAR</button>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverVerSintomas;

