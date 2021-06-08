import React from 'react'
import './AcceptUser.css'
import { ButtonGoBack } from './../seeAllUsers/ButtonGoBack';
import { AcceptItemUser } from './acceptItemUser/AcceptItemUser';
import { AcceptForm } from './acceptForm/AcceptForm';

export const AcceptUser = () => {



    return (
        <div className="accept-user-background-cont">
            <div className="accept-user-left">
                <ButtonGoBack classNameProp="accept-user-btn" text="VOLVER AL INICIO" color="purple"/>
                <div className="accept-user-list">
                    <AcceptItemUser name="Carlos" surname="Perez" id="11223344"/>
                    <AcceptItemUser name="Carlos" surname="Perez" id="11223344"/>
                    <AcceptItemUser name="Carlos" surname="Perez" id="11223344"/>
                    <AcceptItemUser name="Carlos" surname="Perez" id="11223344"/>
                </div>
            </div>
            <div className="accept-user-right">
                <AcceptForm/>
            </div>
            
        </div>
    )
}
