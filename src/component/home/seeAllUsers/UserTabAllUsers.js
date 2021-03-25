import React from 'react'
import '../seeAllUsers/UserTabAllUsers.css'
import optionIcon from '../../../img/option_icon.png'
import { UserTabHome } from '../usertabhome/UserTabHome'
import { ButtonHome } from '../buttonsHome/ButtonHome'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'

export const UserTabAllUsers = () => {
    return(
        <div className="home-cont-background">

            <ButtonGoBack text="VOLVER AL INICIO" color="purple"/>

            <div>
            <div className="usertab-cont-info-allUsers">
                <table class="big-table">
                    <thead className="usertab-thead-allUsers">
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">N PACIENTE</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td><button className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
                        </tr>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td><button className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
                        </tr>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td><button className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
                        </tr>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td><button className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
                        </tr>
                        <tr className="usertab-fila">
                            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                            <td>1122334455</td>
                            <td>Carmen Cardozo</td>
                            <td><button className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
                        </tr>
                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}