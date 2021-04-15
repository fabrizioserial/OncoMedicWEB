import React , {useState, useEffect} from 'react'
import './ItemUser.css'
import optionIcon from 'src/img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam,faCircle } from '@fortawesome/free-solid-svg-icons'
import MouseOverPopover from '../mouseOverPopover/MouseOverPopover'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';



export const ItemUser = ({handleClick,type,user,image,symptom}) => {
    const [imgs,setImgs] = useState(image)

    useEffect(() => {
    }, [imgs])

    const history = useHistory();
    const switchToProfle = () => history.push(`/profile/${user.id}`);

    return (

        type=="seeAllUsers"?
            <tr className="item-user-fila">
                <th scope="row" className="item-user-user-image-table"><img className="item-user-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>{user.id}</td> 
                <td>{user.name}</td>
                <td>{user.cancer}</td>
               
                <td>{user.status== "Activo" ? <FontAwesomeIcon icon={faCircle} className="item-status-active" size="lg"/> : <FontAwesomeIcon icon={faCircle} className="item-status-inactive" size="lg"/>}</td>
                <td className="item-user-config"><button className="item-user-options" onClick={(e)=>handleClick(e,user)}><img className="usertab_icon_image" src={optionIcon}/></button></td>
            </tr>: 

        type=="home"?
                <tr className="usertab-fila" >
                    <th onClick={()=>switchToProfle()} scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src={imgs&&imgs.url} /></th>
                    <td onClick={()=>switchToProfle()}>{user.id}</td>
                    <td onClick={()=>switchToProfle()}>{user.name}</td>
                    <td  className="item-user-config"><Button className="item-user-options" onClick={(e)=>handleClick(e,user)}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
                </tr>

            : 
        type=="estado"?
            <tr className="estado-usertab-fila">
                <td className="sintomas-fila-fecha">11/2/21</td>
                <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>Feliz</td>
                <td><Button className="item-user-options" onClick={handleClick}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
            </tr>:
        type=="sintomas"?
            <tr className="sintomas-usertab-fila">
                {  
                   symptom.date &&  <td className="sintomas-fila-fecha">{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> 
                }
                <td className="sintomas-fila-fecha">{symptom.symptom}</td>
                <td className="sintomas-fila-grado"><MouseOverPopover name={symptom.grade} descrip={symptom.desc}/></td>
            </tr>:
        type=="regdiario"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Estado de animo</td>
                <td>1</td>
                <td>1</td>
            </tr> : 
        type=="sympts"?
                <tr className="usertab-fila">
                    {symptom.date &&  <td className="sintomas-fila-fecha">{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
                    <td onClick={(e)=>handleClick(e,symptom)}>{symptom.id}</td>
                    <td onClick={(e)=>handleClick(e,symptom)}>{symptom.symptom}</td>
                    <td onClick={(e)=>handleClick(e,symptom)} className="usertab-sympts-col-grado">{symptom.grade}</td>
                </tr>:
        type=="seeSymptoms"?
        <tr className="usertab-fila">
            <td onClick={handleClick}></td>
            {symptom.date &&  <td>{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
            <td onClick={handleClick}>{symptom.id}</td>
            <td onClick={handleClick}>{symptom.symptom}</td>
            {symptom.desc.length<18 ? (
                <td className="usertab-first-col-grado"><MouseOverPopover name={symptom.desc} descrip={`Grado ${symptom.grade}`}/></td>
            ):(
                <td className="usertab-first-col-grado"><MouseOverPopover name={symptom.desc} descrip={`Grado ${symptom.grade}: ${symptom.desc}`}/></td> 
            )}
            <td onClick={handleClick}></td>
        </tr>: ""
    )
}
  