import React from 'react';
import './EliminatePatient.css'
import 'fontsource-roboto';


const EliminatePatient = props => {
     
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
               <p className="modal-title">REGISTRAR NUEVO PACIENTE</p>
               <ColoredLine color="gray" />
            </div>
            <div className="inside-the-modal">
                <p>Numero de paciente</p>
            </div> 
            <div>
               <input className="numero-del-paciente"
                  id="idDelPaciente"
                  placeholder="Introduzca el numero del paciente"
                  variant="outlined"/>
            </div>
            <div className="cancer-the-modal">
                <p>Tipo de cancer</p>
            </div> 
            <div>
               <input className="numero-del-paciente"
                  id="cancerDelPaciente"
                  placeholder="Introduzca el tipo de cancer"
                  variant="outlined"/>
            </div>
            <div>
               <button className="agregar-button">AGREGAR</button>
            </div>
         </div>
      </div>
     );
}
export default EliminatePatient;