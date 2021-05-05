import React,{useEffect,useState} from 'react'
import './UsertabSymptoms.css'
import { ItemUser } from '../../ItemUser/ItemUser'
import { useHistory } from 'react-router'

export const UsertabSymptoms=({sympstoms,descs})=> {
  const [sympInfo,setSympInfo] = useState(descs)

  useEffect(()=>{
      setSympInfo(descs)
  },[sympInfo,descs])

  const history = useHistory()
  function handleCloseAndNavigate(){
    
  }

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
                        <th className="sintoms-th-fecha" scope="col">SINTOMA</th>
                        <th className="sintoms-th-grado" scope="col">GRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          sympstoms.map(item => <ItemUser desc={sympInfo.find(element => element.label===item.symptom)} symptom={item} type="symptoms"/>)
                        }
                    </tbody>
                  </table>
                  {sympstoms.length >= 6 && <button onClick={handleCloseAndNavigate} className="menu-finalbutton">VER TODO</button>}
                </div>
                )
                :
                <div className="sintoms-img-error-cont">
                  <img alt="" className="sintoms-img-error" src="https://www.clicktoko.com/assets/images/nodata.png"/>
                  <p>No se encontró registro de sintomas</p>
                </div>
                }
            </React.Fragment>
    )
}