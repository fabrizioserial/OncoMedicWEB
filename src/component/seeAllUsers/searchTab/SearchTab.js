import React,{useState} from 'react'
import './SearchTab.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faHome, faChevronDown, fas } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuItem } from '@material-ui/core'
import { Picker } from './picker/Picker'
import MyDatePicker from '../../datePicker/MyDatePicker'

export const SearchTab = ({handleClick,categories}) => {
    const [title, setTitle] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected,setSelected] = useState()
    const [date2,setDate2] = useState()

    const handlePickClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = ()=>{
        setAnchorEl(null);
    }

    const handleSelectCat = (name) =>{
        setSelected(name)
        handleClose()
    }

    const handleDate = (date) =>{
        setTitle(date)
    }

    const handleDate2 = (date) =>{
        setDate2(date)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="searchtab-back">
        <div className="searchtab-cont-cont one">
            {selected != "FECHA" ?
            <React.Fragment>
            <input
                onKeyPress={(e) => e.key === 'Enter' && handleClick(e,title,selected,date2)}   
                placeholder="Buscar por Nombre, Apellido, DNI, ID paciente" 
                className="searchtab-input"
                onChange={event => setTitle(event.target.value)}
                value={title}
                />
            </React.Fragment>:
                <div className="searchtab-date-input">
                    <a >Desde:</a>
                    <MyDatePicker handleDate={handleDate}/>
                    <a style={{marginLeft: "2%"}} >Hasta:</a>
                    <MyDatePicker handleDate={handleDate2}/>
                </div>
            }
            <FontAwesomeIcon onClick={(e)=>handleClick(e,title,selected,date2)} icon={faSearch} className="searchtab-input-icon" />
        </div>
        <div onClick={handlePickClick} className="searchtab-cont-cont two">
            <p>{selected ? selected:"Filtrar por:"}</p>
            <FontAwesomeIcon icon={faChevronDown} className="searchtab-input-icon" />
        </div>
        <Menu style={{marginTop: "1%"}}
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
                horizontal: 'center',
                }}>
                {categories && categories.map(item => <Picker handleClick={handleSelectCat} name={item}></Picker>)}
            </Menu>
        </div>
    )
}
