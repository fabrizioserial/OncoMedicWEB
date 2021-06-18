import React, {useEffect} from 'react'
import '../tabhey/TabHey.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Menu from '@material-ui/core/Menu';
import { CustomMenuItem } from '../../customMenuItem/CustomMenuItem'
import {OptionsMenu} from '../../optionsMenu/OptionsMenu';
import { Link } from 'react-router-dom';



export const TabHey = ({name,userlist,handleEl,handleAc,cancerList}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        console.log(userlist)
    }, [userlist])

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
                       <OptionsMenu type="home"/>
                    </div>

                    <Link style={{color: "black"}} to="/acceptUser" className="tabhey-btn-options">
                        <FontAwesomeIcon icon={faBell}/>
                    </Link>
                </div>
            </div>
    )
}