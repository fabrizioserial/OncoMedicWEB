import React from 'react'
import '../tabhey/TabHey.css'

export const TabHey = (props) => {
    return(
            <div className="tabhey-cont-background">
                <div className="tabhey-cont">
                    <p className="tabhey-cont-bd">Buen dia,</p>
                    <p className="tabhey-cont-name">{props.name}!</p>
                </div>
            </div>
    )
}