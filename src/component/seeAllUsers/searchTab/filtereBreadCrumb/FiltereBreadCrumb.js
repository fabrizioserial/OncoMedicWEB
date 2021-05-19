import React from 'react'
import './FiltereBreadCrumb.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FiltereBreadCrumb = ({name,index,handleCross}) => {
    return (
        <div style={{marginLeft: index===0 ? "0%": "1%" }} className="filter-breadcrumb-background">
            <p className="filter-breadcrumb-text">{name}</p>
            <div onClick={()=>handleCross(name)} className="filter-breadcrumb-div-cross">
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        </div>
    )
}

export default FiltereBreadCrumb
