import React,{useEffect, useState} from 'react'
import './SearchTab.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '@material-ui/core'
import { Picker } from './picker/Picker'
import MyDatePicker from '../../datePicker/MyDatePicker'
import FiltereBreadCrumb from './filtereBreadCrumb/FiltereBreadCrumb'
import { tr } from 'date-fns/locale'
import { set } from 'date-fns'

export const SearchTab = ({handleClick,categories,refresh,reTitle,warnBar,elCAt}) => {
    const [title, setTitle] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected,setSelected] = useState()
    const [dateStart,setDateStart] = useState(new Date())
    const [dateEnd,setDateEnd] = useState(new Date())
    const [hash,setHash] = useState([])
    const [dateIsActive,setDateIsActive] = useState(false)
    const [boolean,setBoolean] = useState(false)



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

    useEffect(()=>{
        setTitle("")
    },[reTitle])


    const handleDate = (date) =>{
        setDateIsActive(true)
        setDateStart(date)
    }

    const handledateEnd = (date) =>{
        setDateIsActive(true)
        setDateEnd(date)
    }

    const handleCross = (name) => {
        name==="FECHA" && setDateIsActive(false)
        name!=="FECHA" && setDateIsActive(true)
        elCAt()
        setHash(hash.filter(x => x.selected!==name))
    }

    useEffect(()=>{
        refresh && setHash([])
        refresh && setTitle("")
        setSelected("")
    },[refresh])

    const handleClickAndClose = (e) => {
        let found=false
        hash.map((item)=>{
            if(item.selected.includes(selected)) {
                found=true
            } 
        })
        !found && aFuncion()
    }

    function aFuncion () {
        if (dateIsActive) { 
            dateStart && setHash([...hash,{selected: selected,dateStart: dateStart,dateEnd: dateEnd}])
        } else {
            if(selected) {
                setHash([...hash,{selected: selected,title: title}])
            } else warnBar()
        }
    }

    useEffect(()=>{
        selected && handleClick(null,hash)
    },[hash])

    useEffect(()=>{
        selected!=="FECHA" && setDateIsActive(false)
    },[selected])
        


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
        <div className="searchtab-back">
        <div className="searchtab-cont-cont one">
            {selected !== "FECHA" ?
            <React.Fragment>
            <input
                onKeyPress={(e) => e.key === 'Enter' && handleClickAndClose(e)}   
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
                    <MyDatePicker dateStart={dateStart}  handleDate={handledateEnd}/>
                </div>
            }
            <FontAwesomeIcon onClick={(e)=>handleClickAndClose(e,dateStart)} icon={faSearch} className="searchtab-input-icon" />
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
        <div className="searchtab-filters-breadcrumbs">
            {hash && hash.map((item) => <FiltereBreadCrumb handleCross={handleCross} name={item.selected}></FiltereBreadCrumb>)}
        </div>
        </>
    )
}
