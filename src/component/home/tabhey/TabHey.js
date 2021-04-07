import React from 'react'
import '../tabhey/TabHey.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Tuerquita } from '../../tuerquita/Tuerquita.js'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CustomMenuItem } from '../../customMenuItem/CustomMenuItem'



export const TabHey = ({name,users}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
            <div className="tabhey-cont-background">
                <div className="tabhey-cont">
                    <p className="tabhey-cont-bd">Buen dia,</p>
                    <p className="tabhey-cont-name">{name}!</p> 
                </div>
                <div className="tabhey-cont-options">

                    <div >
                       <Tuerquita style="home"/>
                    </div>
                    
                    <button aria-describedby={id} className="tabhey-btn-options" onClick={handleClick}>
                        <FontAwesomeIcon icon={faBell}/>
                    </button>

                        
                        <Menu className="menu-1"
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            PaperProps={{
                            style: { width: '300px',marginTop: '2px' },
                            }}
                        >
                            <CustomMenuItem name="Serial, Fabrizio" id="666" onClick={handleClose}/>



                        </Menu>
                </div>
            </div>
    )
}