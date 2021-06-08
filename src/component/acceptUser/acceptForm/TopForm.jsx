import React from 'react'
import './TopForm.css'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TopForm = ({name,topRadius=false}) => {
    return (
        <div className={topRadius ? "tf-container tf-tradius" : "tf-container"}>
            <div className={"form-container tf-cont"}>

                <FontAwesomeIcon icon={faUser} className="ic-user-tf"  color="#3B3B3B" />
                <p className="tf-text">{name}</p>
            </div>
        </div>
    )
}
