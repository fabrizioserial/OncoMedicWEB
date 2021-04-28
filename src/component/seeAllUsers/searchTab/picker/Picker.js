import { MenuItem } from '@material-ui/core'
import React from 'react'

export const Picker = ({name,handleClick}) => {
    return (
        <div onClick={()=>handleClick(name)}>
            <MenuItem>{name}</MenuItem>
        </div>
    )
}
