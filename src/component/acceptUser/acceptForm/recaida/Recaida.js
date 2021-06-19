import React, { useEffect, useState } from 'react'
import MyDatePicker from '../../../datePicker/MyDatePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Recaida = ({customDate,customLocal,index,handleChangeRecaida,array,handleElimIndex}) => {
    const [date,setDate] = useState('')
    const [local,setLocal] = useState('')

    useEffect(()=>{
        (customDate && customDate.seconds) ? setDate(new Date(customDate.seconds * 1000 + customDate.nanoseconds/1000000)):setDate(customDate)
     },[customDate])
 

    useEffect(()=>{
        customLocal && setLocal(customLocal)
    },[customLocal])

    const handleDate = (date)=>{
        handleChangeRecaida(index,date,true)
    }


    return (
        <div className="af-input-line">
                    <div style={{flex: '0.3 1'}} className="af-input-cont flex50" >
                            <p className="af-input-text">Fecha de recaida</p>
                            <MyDatePicker name="date" customDate={date}  classname={"accept-patient"} className="af-input" handleDate={handleDate}></MyDatePicker>
                    </div>
                    <div style={{flex: '0.7 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Local o distancia</p>
                        <div style={{height: '40px'}} className="select">
                            <select name="local" value={local}  onChange={e=>handleChangeRecaida(index,e)}>
                                <option value={'L'}>Local</option>
                                <option value={'D'}>Distancia</option>
                                <option value={'LyD'}>Local y Distancia</option>
                            </select>
                        </div>
                    </div>
                    {array.length>1 ?
                    <div onClick={()=>handleElimIndex(index)} style={{flex: '0 1',marginLeft: '20px',cursor: 'pointer'}} className="af-input-cont flex50" >
                            <div className="af-input theper">
                                <FontAwesomeIcon color='red' icon={faTrash}/>
                            </div>
                    </div>:null} 
            </div>
    )
}
