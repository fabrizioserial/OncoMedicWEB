import React,{useState} from 'react'
import './SearchTab.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '@material-ui/core'
import { Picker } from './picker/Picker'
import MyDatePicker from '../../datePicker/MyDatePicker'

export const SearchTab = ({handleClick,categories}) => {
    const [title, setTitle] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected,setSelected] = useState()
    const [dateStart,setDateStart] = useState(new Date())
    const [dateEnd,setDateEnd] = useState(new Date())

    const handlePickClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = ()=>{
        setAnchorEl(null);
    }

    const handleSelectCat = (name) =>{
        name==="ACTIVOS" && handleClick(null,title,name)
        name==="INACTIVOS" && handleClick(null,title,name)
        setSelected(name)
        handleClose()
    }

    const handleDate = (date) =>{
        setDateStart(date)
    }

    const handledateEnd = (date) =>{
        setDateEnd(date)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="searchtab-back">
        <div className="searchtab-cont-cont one">
            {selected !== "FECHA" ?
            <React.Fragment>
            <input
                onKeyPress={(e) => e.key === 'Enter' && handleClick(e,title,selected)}   
                placeholder="Buscar por Nombre, Apellido, DNI, ID paciente" 
                className="searchtab-input"
                onChange={event => setTitle(event.target.value)}
                value={title}
                />
            </React.Fragment>:
                <div className="searchtab-date-input">
                    <p >Desde:</p>
                    <MyDatePicker handleDate={handleDate}/>
                    <p style={{marginLeft: "2%"}} >Hasta:</p>
                    <MyDatePicker handleDate={handledateEnd}/>
                </div>
            }
            <FontAwesomeIcon onClick={(e)=>handleClick(e,title,selected,dateStart,dateEnd)} icon={faSearch} className="searchtab-input-icon" />
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
