import React, { useEffect, useState } from 'react'
import MyDatePicker from '../../../datePicker/MyDatePicker'

export const Recaida = ({customDate,customLocal,index,handleChangeDate}) => {
    const [date,setDate] = useState(null)
    const [local,setLocal] = useState('Local')

    useEffect(()=>{
        setDate(customDate)
    },[customDate])

    useEffect(()=>{
        setLocal(customLocal)
    },[customLocal])

    
    const handleDate = (aDate) =>{
        setDate(aDate)
    }


    const handleLocal = (aLocal) =>{
        setLocal(aLocal)
    }


    useEffect(()=>{
        console.log('date',date,local)
        handleChangeDate(date,local,index)
     },[date,local])

    return (
        <div className="af-input-line">
                    <div style={{flex: '0.3 1'}} className="af-input-cont flex50" >
                            <p className="af-input-text">Fecha de recaida</p>
                            <MyDatePicker customDate={date}  classname={"accept-patient"} className="af-input" handleDate={handleDate}></MyDatePicker>
                    </div>
                    <div style={{flex: '0.7 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Local o distancia</p>
                        <div style={{height: '40px'}} className="select">
                            <select value={local}  onChange={e=>handleLocal(e.target.value)}>
                                <option value={'L'}>Local</option>
                                <option value={'D'}>Distancia</option>
                                <option value={'LyD'}>Local y Distancia</option>
                            </select>
                        </div>
                    </div>
            </div>
    )
}
