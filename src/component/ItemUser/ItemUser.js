import React from 'react'
import './ItemUser.css'
import optionIcon from 'src/img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons'



export const ItemUser = (props) => {
    return (

        props.type=="seeAllUsers"?
            <tr className="item-user-fila">
                <th scope="row" className="item-user-user-image-table"><img className="item-user-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>1122334455</td> 
                <td>Carmen Cardozo</td>
                <td><button className="item-user-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
            </tr>: 

        props.type=="home"?
            <tr className="usertab-fila">
                <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>1122334455</td>
                <td>Carmen Cardozo</td>
                <td><Button className="item-user-options" onClick={props.handleClick}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
            </tr>: 

        props.type=="estado"?
            <tr className="estado-usertab-fila">
                <td>11/2/21</td>
                <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>Feliz</td>
                <td><Button className="item-user-options" onClick={props.handleClick}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
            </tr>:
        props.type=="sintomas"?
            <tr className="item-user-fila">
                <td>22/1/22</td> 
                <td>Fiebre</td>
                <td></td>
                <td>3</td>
            </tr>:
        props.type=="regdiario"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Estado de animo</td>
                <td></td>
                <td>1</td>
            </tr>: ""
    )
}
