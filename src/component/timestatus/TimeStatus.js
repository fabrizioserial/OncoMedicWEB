import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../timestatus/TimeStatus.css'
import deco from '../../img/decoTimeState.png' 

export const TimeStatus = () => {
    var today = new Date();
    const [day,setDay] = useState('')
    const [date,setDate] = useState('')
    const [month,setMonth] = useState('')

    const getMonthByNumber = (monthT) =>{
        switch(monthT){
            case 0:
                return "ENERO";
            case 1:
                return "FEBRERO";
            case 2:
                return "MARZO";
            case 3:
                return "ABRIL";
            case 4:
                return "MAYO";
            case 5:
                return "JUNIO";
            case 6:
                return "JULIO";
            case 7:
                return "AGOSTO";
            case 8:
                return "SEPTIEMBRE";
            case 9:
                return "OCTUBRE";
            case 10:
                return "NOVIEMBRE";
            case 11:
                return "DICIEMBRE";
        }
    }

    const getDayByNumber = (dayN) =>{
        switch(dayN){
            case 1: 
                return "LUN";
            case 2: 
                return "MAR";
            case 3: 
                return "MIE";
            case 4: 
                return "JUE";
            case 5: 
                return "VIE";
            case 6: 
                return "SAB";
            case 7: 
                return "DOM";
        }
    }

    const getDateByNumber = (dateN) =>{
        switch(dateN){
            case 1:
                return "01";
            case 2:
                return "02";
            case 3:
                return "03";
            case 4:
                return "04";
            case 5:
                return "05";
            case 6:
                return "06";
            case 7:
                return "07";
            case 8:
                return "08";
            case 9:
                return "09";
        }
        return dateN;
    }

    useEffect(()=>{
        today &&
        setDate(getDateByNumber(today.getDate()))

        setDay(getDayByNumber(today.getDay()))

        setMonth(getMonthByNumber(today.getMonth()))


    },[today])

    return(
        
        <div className="timestatus-cont-background">
            <div className="timestatus-cont">
                {
                    console.log(today)
                }
                <p className="timestatus-date">{date}</p>
                <p className="timestatus-day">{day}</p>
                <p className="timestatus-month">{month}</p>
            </div>
            <img src={deco} className="img-timestate"/>
        </div>
    )
}