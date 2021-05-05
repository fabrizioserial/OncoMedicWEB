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
                <p>Nombre y apellido:</p>
                <p>{props.name}</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>ID:</p>
                <p>{props.id}</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>Sintoma:</p>
                <p>{props.symptom}</p>
            </div> 
            <div className="add-inside-the-modal">
                <p>Grado:</p>
                <p>{props.grade}</p>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverSintoma;
