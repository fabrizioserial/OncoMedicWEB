import React from 'react';
import 'fontsource-roboto';
import { UsertabSintomas } from '../profile/usertabSintomas/UsertabSintomas';



const ModalPopOverSintomas = (props) => {
      const i = [1,2,3,4,5,6]
     
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
                  <p className="modal-title">SINTOMAS PRESENTADOS</p>
                  <hr className="add-modal-line"/>
               </div>
               <div className="inside-the-modal-diario">
                  <p className="paciente-of-modal">Paciente:_____________</p>
                  <div>
                     <UsertabSintomas/>
                  </div>
               </div> 
         </div>
      </div>
     );
}
export default ModalPopOverSintomas;

