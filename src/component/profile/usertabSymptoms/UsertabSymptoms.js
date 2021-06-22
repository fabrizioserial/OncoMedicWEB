import React,{useEffect,useState} from 'react'
import './UsertabSymptoms.css'
import { ItemUser } from '../../ItemUser/ItemUser'
import { useHistory } from 'react-router'
import ModalPopOverSymptom from '../../modals/ModalPopOverSymptom'

export const UsertabSymptoms=({sympstoms,descs,id})=> {
  const [sympInfo,setSympInfo] = useState(descs)
  const [openModal, setOpenModal] = useState(false);
  const [symptom, setSymptom] = useState('');


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(()=>{
      setSympInfo(descs)
  },[sympInfo,descs])

  const history = useHistory()
  function handleCloseAndNavigate(){
      history.push(`/userSympts/${id}`);
  }


  const handleCloseAndOpenModal = (event,item) => {
    item!==undefined && setSymptom(item);
    setOpenModal(true)
  }; 

  return (
            <React.Fragment>
                {
                sympstoms.length > 0 ?
                (
                  <div>
                   <table class="sintoms-table">
                    <thead className="sintoms-usertab-thead">
                        <tr>
                        <th className="sintoms-th-fecha" scope="col">FECHA</th>
                        <th scope="col" style={{paddingRight:"3%"}}>SINTOMA</th>
                        <th scope="col" ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          sympstoms.map(item => <ItemUser handleClick={handleCloseAndOpenModal} desc={sympInfo.find(element => element.label===item.symptom)} symptom={item} type="symptoms"/>)
                        }
                    </tbody>
                  </table>
                  {sympstoms.length >= 6 && <button onClick={handleCloseAndNavigate} className="menu-finalbutton">VER TODO</button>}
                  <ModalPopOverSymptom
                    type="profile"
                    symptoms={symptom}
                    displayModal={openModal}
                    closeModal={handleCloseModal}
                  />
                </div>
                )
                :
                <div className="sintoms-img-error-cont">
                  <img alt="" className="sintoms-img-error" src="https://firebasestorage.googleapis.com/v0/b/oncoback.appspot.com/o/images%2FdataNotFound.png?alt=media&token=6678405a-2133-4f49-8bd9-bd2f348b1962"/>
                  <p>No se encontró registro de sintomas</p>
                </div>
                }
            </React.Fragment>
    )
}