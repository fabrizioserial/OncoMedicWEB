import React from 'react';
import './ModalPopOverSymptom.css'
import 'fontsource-roboto';


const ModalPopOverSymptom = (props) => {

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
            <tr style={{marginTop: "5%"}} className="tabs-fila">
                <td style={{paddingLeft: "2%"}}>Fecha:</td>
                {props.date &&  <td style={{paddingRight: "2%"}}>{Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(props.date.toDate())}</td> }
            </tr>
            <tr className="tabs-fila">
                <td style={{paddingLeft: "2%"}}>Nombre:</td>
                <td style={{paddingRight: "2%"}}>{props.name}</td>
            </tr>
            <tr className="tabs-fila">
                <td style={{paddingLeft: "2%"}}>N paciente:</td>
                <td style={{paddingRight: "2%"}}>{props.id}</td>
            </tr>
            <tr className="tabs-fila">
                <td style={{paddingLeft: "2%"}}>Sintoma:</td>
                <td style={{paddingRight: "2%"}}>{props.symptom}</td>
            </tr>
            <tr className="tabs-fila">
                <td style={{paddingLeft: "2%"}}>Grado:</td>
                <td style={{paddingRight: "2%"}}>{props.grade}</td>
            </tr>
            <tr className="tabs-fila">
                <td style={{paddingLeft: "2%"}}>Respuesta:</td>
                <td style={{paddingRight: "2%"}}>{props.grade>5 ? 'Urgencia':'No urgencia'}</td>
            </tr>
         </div>
      </div>
     );
}
export default ModalPopOverSymptom;
