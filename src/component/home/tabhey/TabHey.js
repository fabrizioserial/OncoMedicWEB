import React from 'react'
import '../tabhey/TabHey.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faBell } from '@fortawesome/free-solid-svg-icons'
import { Tuerquita } from '../../tuerquita/Tuerquita.js'



export const TabHey = (props) => {
    return(
            <div className="tabhey-cont-background">
                <div className="tabhey-cont">
                    <p className="tabhey-cont-bd">Buen dia,</p>
                    <p className="tabhey-cont-name">{props.name}!</p> 
                </div>
                <div className="tabhey-cont-options">

                    <div >
                       <Tuerquita style="home"/>
                    </div>
                    
                    <button className="tabhey-btn-options">
                        <FontAwesomeIcon icon={faBell}/>
                    </button>
                </div>
            </div>
    )
}