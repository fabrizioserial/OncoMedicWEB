import React from 'react'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { Router,Link, Route, Switch,Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faBell } from '@fortawesome/free-solid-svg-icons'
import '../tabhey/Tuerquita.css'

export const Tuerquita = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event,number) => {
        setAnchorEl(event.currentTarget);
      }; 

    function handleClose(){
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div onClick={handleClick} className="tabhey-btn-options">
               <FontAwesomeIcon icon={faCog} className="button-log-out" />
            </div>
            
             <Menu className="menu-eliminate-1"
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'rigt',
                        }}
                        transformOrigin={{
                        vertical: 'left',
                        horizontal: 'right',
                        }}>
                        
                        <Link to={{
                            pathname:"/",
                        }}>
                            <MenuItem >Log out</MenuItem>
                        </Link>

            </Menu>
                
        </div>
    )
}
