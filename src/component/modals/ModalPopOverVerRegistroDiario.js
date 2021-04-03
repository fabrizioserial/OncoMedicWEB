import React from 'react';
import './ModalPopOverVerRegistroDiario.css'
import 'fontsource-roboto';
import { UserTabHome } from '../home/usertabhome/UserTabHome';
import { UsertabEstado } from '../profile/usertabEstado/UsertabEstado';
import { Tuerquita } from '../tuerquita/Tuerquita';



const ModalPopOverVerRegistroDiario = (props) => {
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
                  <p className="modal-title">REGISTRO DIARIO</p>
                  <hr className="add-modal-line"/>
               </div>
               <div className="inside-the-modal-diario">
                  <p className="paciente-of-modal">Paciente:_____________</p>
                  <table class="modal-diario-table">
                    <tbody>
                        {
                          i.map((item,index)=> <ItemUser key={index} type="regdiario"/>)
                        } 
                    </tbody>
                </table>
               </div> 
         </div>
      </div>
     );
}
export default ModalPopOverVerRegistroDiario;

