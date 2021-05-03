import React from 'react'
import '../tabhey/TabHey.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Menu from '@material-ui/core/Menu';
import { CustomMenuItem } from '../../customMenuItem/CustomMenuItem'
import { OptionsMenu } from '../../optionsMenu/OptionsMenu';



export const TabHey = ({name,userlist,handleEl,handleAc}) => {

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
                       <OptionsMenu style="home"/>
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
                            style: { width: '450px',marginTop: '2px' },
                            }}
                        >
                        {
                            (userlist.length>0) ? (
                                console.log(userlist),
                                userlist.map((item,index) => <CustomMenuItem handleAc={handleAc} handleEl={handleEl} name={item.name}  id={item.id}/>)
                            ) : (
                                <CustomMenuItem type="finished">No hay mas usuarios para aceptar</CustomMenuItem>
                            )
                        }
                        </Menu>
                </div>
            </div>
    )
}