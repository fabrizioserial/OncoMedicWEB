import React, {useEffect, useState} from 'react';
import './ModalPopOverSymptom.css'
import 'fontsource-roboto';


const ModalPopOverSymptom = (props) => {
    const [rta,setRta] = useState(false)

     const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };

     function closeModal(e) {
        setRta(false)
        e.stopPropagation()
        props.closeModal()
     }
     const handleGrade = (grade)=>{
         console.log("HOLA")
        grade>5 && setRta(true)
     }

     useEffect(()=>{
        if (props.symptoms.symptoms) {
            props.symptoms.symptoms.map((item,index)=>{
                item.grade>5 && setRta(true)
            })
        }
     },[props.symptoms.symptoms])
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
                <td className="tmodal-td" >Fecha:</td>
                {props.symptoms.date &&  <td className="tmodal-final-td" >{Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(props.symptoms.date.toDate())}</td> }
            </tr>
            {props.type!="profile"?
            <tr  className="tabs-fila">
                <td className="tmodal-td" >Nombre:</td>
                <td className="tmodal-final-td">{props.symptoms.surname}, {props.symptoms.name}</td>
            </tr>:null}
            {
                props.symptoms.symptoms ? 
                    <table  className="table-modal-sympts">
                        <thead className="usertab-thead">
                            <tr>
                            <th>Sintoma</th>
                            <th className="td-table-modal-sympts grade">Grado</th>
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
            <div>
                <tr className="tabs-fila">
                    <td className="tmodal-td" >Respuesta:</td>
                    <td className="tmodal-final-td">{rta ? "Urgencia":"No urgencia"}</td>
                </tr>
            </div>
         </div>
      </div>
     );
}
export default ModalPopOverSymptom;
