import React,{useState,useEffect} from 'react';
import './ModalPopOverSintoma.css'
import 'fontsource-roboto';
import {getFirestore} from '../../firebase'


const ModalPopOverSintoma = (props) => {
      const [disabled,setDisabled] = useState("")

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
            <div >
               <p className="modal-title">SINTOMA PRESENTADO</p>
               <hr className="add-modal-line"/>
            </div>
            <div className="add-inside-the-modal">
                <p>Nombre y apellido</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>{props.number}</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>ID</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>Email</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>Contraseña</p>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverSintoma;
