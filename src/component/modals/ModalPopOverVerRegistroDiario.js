import React,{useState,useEffect} from 'react';
import './ModalPopOverVerRegistroDiario.css'
import 'fontsource-roboto';
import { UserTabHome } from '../home/usertabhome/UserTabHome';
import { UsertabEstado } from '../profile/usertabEstado/UsertabEstado';
import { Tuerquita } from '../tuerquita/Tuerquita';
import { ItemUser } from './../ItemUser/ItemUser';




const ModalPopOverVerRegistroDiario = (props) => {
      const i = [1,2,3,4,5,6]
      const [regdiario,setRegDiario] = useState()

     
     const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };
     function closeModal(e) {
        e.stopPropagation()
        props.closeModal()
     }

     useEffect(()=>{
         {console.log(props.loading)}
        console.log("el estado de registro: ",props.id)
        setRegDiario(props.id)
     },[props.id])

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
                  <p className="paciente-of-modal">Paciente: {props.name}</p>
                  <p className="paciente-of-modal">Fecha: {Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(props.Date)}</p>
                  { regdiario ?  
                  <table class="modal-diario-table">
                     <tbody>
                           <ItemUser  mood={regdiario.mood} type="regdiarioMood"/>
                           <ItemUser  sad={regdiario.sad} type="regdiarioSad"/>
                           <ItemUser  hungry={regdiario.hungry} type="regdiarioHungry"/>
                           <ItemUser  run={regdiario.run} type="regdiarioRun"/>
                           <ItemUser  hid={regdiario.hid} type="regdiarioHid"/>
                           <ItemUser  social={regdiario.social} type="regdiarioSocial"/>

                     </tbody>
                 </table>:
                    <div className="modal-error">
                        <img className="sintoms-img-error" src="https://www.clicktoko.com/assets/images/nodata.png"/>
                        <p>El usuario no ha hecho su registro diario todavia</p>
                     </div>
                  }
               </div> 
         </div>
      </div>
     );
}
ModalPopOverVerRegistroDiario.defaultProps = {
   Date: new Date()
}
export default ModalPopOverVerRegistroDiario;

