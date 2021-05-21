import React ,{useState,useEffect} from 'react'
import './FiltereBreadCrumb.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FiltereBreadCrumb = ({name,index,handleCross}) => {
    const [title,setTitle] = useState('')

    useEffect(() => {
        setTitle(name)
    }, [name])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div style={{marginLeft: index===0 ? "0%": "1%" }} className="filter-breadcrumb-background">
            {title && <p className="filter-breadcrumb-text">{capitalize(title.toLowerCase())}</p>}
            <div onClick={()=>handleCross(name)} className="filter-breadcrumb-div-cross">
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        </div>
    )
}

export default FiltereBreadCrumb
