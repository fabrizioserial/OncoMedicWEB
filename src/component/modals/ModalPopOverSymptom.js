import React, {useEffect} from 'react';
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
            <tr style={{marginTop: "5%",backgroundColor: 'white'}} className="tabs-fila">
                <td >Fecha:</td>
                {props.symptoms.date &&  <td >{Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(props.symptoms.date.toDate())}</td> }
            </tr>
            <tr style={{backgroundColor: 'white'}} className="tabs-fila">
                <td >Nombre:</td>
                <td>{props.symptoms.surname}, {props.symptoms.name}</td>
            </tr>
            {
                props.symptoms.symptoms ? 
                    <table  className="table-modal-sympts">
                        <thead className="usertab-thead">
                            <tr>
                            <th >Sintoma</th>
                            <th>Grado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                    props.symptoms.symptoms.map((item,index)=>
                                    <tr style={{marginTop: 0}} >
                                        <td className="td-table-modal-sympts">{item.symptom}</td>
                                        <td  className="td-table-modal-sympts grade">{item.grade}</td>
                                    </tr>
                                )
                            }
                        </tbody>
 
                    </table>
                :null
            }
         </div>
      </div>
     );
}
export default ModalPopOverSymptom;
