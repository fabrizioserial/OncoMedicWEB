import React from 'react'
import "../profile/CompleteProfile.css"
import {ButtonGoBack} from "../seeAllUsers/ButtonGoBack"
import { UsertabEstado } from '../profile/usertabEstado/UsertabEstado'
import { UsertabSintomas } from '../profile/usertabSintomas/UsertabSintomas'
import ProfileTab from './profileTab/ProfileTab'

export const CompleteProfile = () => {
    return (
        <div className="profile-cont-background">
            <ButtonGoBack text="VOLVER AL INICIO" color="purple"></ButtonGoBack>
            <ProfileTab/>
            <div className="two-squares-complete-profile">
                <div  className="estado-usertab-cont-background">
                    <UsertabEstado flexi={{Flex:1}}/>
                </div>
                <div className="sintoms-usertab-cont-background">
                    <UsertabSintomas flexi={{Flex:1}}/>
                </div>  
            </div>
        </div>
    )
}


