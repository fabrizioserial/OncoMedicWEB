import React from 'react';
import './ModalPopOverVerRegistroDiario.css'
import 'fontsource-roboto';


const ModalPopOverVerRegistroDiario = (props) => {
     
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
               className="modal-content-diario"
               onClick={ e => e.stopPropagation() } >
               <span 
                  className="close"
                  onClick={ closeModal }>&times;
               </span>
               <div>
                  <p className="modal-title">REGISTRO DIARIO</p>
                  <hr className="add-modal-line"/>
               </div>
               <div className="inside-the-modal-diario">
                  <p className="paciente-of-modal">Paciente:_____________</p>
                  <table class="modal-diario-table">
                    <tbody>
                     <tr className="modal-diario-fila">
                           <td>11/2/21</td>
                     </tr>
                     <tr className="modal-diario-fila">
                           <td>11/2/21</td>
                     </tr>
                     <tr className="modal-diario-fila">
                           <td>11/2/21</td>
                     </tr>
                     <tr className="modal-diario-fila">
                           <td>11/2/21</td>
                     </tr>
                     <tr className="modal-diario-fila">
                           <td>11/2/21</td>
                     </tr>
                     <tr className="modal-diario-fila">
                           <td>11/2/21</td>
                     </tr>
                    </tbody>
                  </table>
               </div> 
         </div>
      </div>
     );
}
export default ModalPopOverVerRegistroDiario;

