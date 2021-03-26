import React from 'react'
import '../seeAllUsers/UserTabAllUsers.css'
import optionIcon from '../../../img/option_icon.png'
import { UserTabHome } from '../usertabhome/UserTabHome'
import { ButtonHome } from '../buttonsHome/ButtonHome'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from './ItemUser/ItemUser';

export const UserTabAllUsers = () => {

    const i = [1,2,3,4,5,6,7,8,9]
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
                        {
                            i.map(item => <ItemUser/>)
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}