import React , {useState, useEffect} from 'react'
import './ItemUser.css'
import optionIcon from 'src/img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam,faCircle } from '@fortawesome/free-solid-svg-icons'
import MouseOverPopover from '../mouseOverPopover/MouseOverPopover'



export const ItemUser = ({handleClick,type,user,image,symptom}) => {
    const [imgs,setImgs] = useState(image)

    useEffect(() => {
    }, [imgs])

    return (

        type=="seeAllUsers"?
            <tr className="item-user-fila">
                <th scope="row" className="item-user-user-image-table"><img className="item-user-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>{user.id}</td> 
                <td>{user.name}</td>
                <td>{user.cancer}</td>
               
                <td>{user.status== "Activo" ? <FontAwesomeIcon icon={faCircle} className="item-status-active" size="lg"/> : <FontAwesomeIcon icon={faCircle} className="item-status-inactive" size="lg"/>}</td>
                <td className="item-user-config"><button className="item-user-options" onClick={handleClick}><img className="usertab_icon_image" src={optionIcon}/></button></td>
            </tr>: 

        type=="home"?
            <tr className="usertab-fila">
                <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src={imgs&&imgs.url} /></th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td  className="item-user-config"><Button className="item-user-options" onClick={handleClick}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
            </tr>: 

        type=="estado"?
            <tr className="estado-usertab-fila">
                <td className="sintomas-fila-fecha">11/2/21</td>
                <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>Feliz</td>
                <td><Button className="item-user-options" onClick={handleClick}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
            </tr>:
        type=="sintomas"?
            <tr className="sintomas-usertab-fila">
                <td className="sintomas-fila-fecha">22/1/22</td> 
                <td className="sintomas-fila-fecha">Fiebre</td>
                <td className="sintomas-fila-grado"><MouseOverPopover name={3} descrip="mas de 40 grados"/></td>
            </tr>:
        type=="regdiario"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Estado de animo</td>
                <td></td>
                <td>1</td>
            </tr> : 
        type=="regDiario"?
            <tr className="estado-usertab-fila">
            <td className="sintomas-fila-fecha">11/2/21</td>
            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
            <td>Feliz</td>
            <td></td>
            </tr>: 
        type=="sympts"?
                <tr className="usertab-fila">
                    <td></td>
                    <td>{symptom.id}</td>
                    <td>{symptom.symptom}</td>
                    <td>{symptom.grade}</td>
                </tr>: ""
    )
}
  