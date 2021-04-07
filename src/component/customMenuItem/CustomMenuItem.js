import { MenuItem } from '@material-ui/core'
import React from 'react'
import '../customMenuItem/CustomMenuItem.css'
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CustomMenuItem = (props) => {
    return (
        <div>
                <table className="custom-menu-div">
                    <tbody>
                        <tr className="custom-menu-tr">
                            <td className="custom-menu-td1">
                                <p className="custom-menu-text">{props.name}</p>
                                <p className="custom-menu-id">Id: {props.id}</p>
                            </td>
                            <td >
                                <p onClick={props.handleClick} className="custom-menu-td2"><FontAwesomeIcon icon={faCheck} className="custom-menu-iconCheck" /><FontAwesomeIcon icon={faTimes} className="custom-menu-iconTimes" /></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}

