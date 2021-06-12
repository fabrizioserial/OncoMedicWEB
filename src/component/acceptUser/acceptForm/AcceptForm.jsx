import moment from 'moment'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import './AcceptForm.css'
import { TopForm } from './TopForm'
import {faUser,faUserMd,faStarOfLife} from '@fortawesome/free-solid-svg-icons'
import { Biom } from './biom/Biom'
import { BottomNavigation } from '@material-ui/core'
import MyDatePicker from '../../datePicker/MyDatePicker'

export const AcceptForm = ({user,handleAcept}) => {
    const [registerDate,setRegisterDate] = useState(new Date())
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [email,setEmail] = useState("")
    const [sex,setSex] = useState("")
    const [hist,setHist] = useState("")
    const [smoke,setSmoke] = useState("")
    const [smokeQuant,setSmokeQuant] = useState("")
    const [smokeTime,setSmokeTime] = useState("")
    const [diab,setDiab] = useState("")
    const [diabMed,setDiabMed] = useState("")
    const [medAcv,setMedAcv] = useState(false)
    const [medEpoc,setMedEpoc] = useState(false)
    const [medHip,setMedHip] = useState(false)
    const [medInf,setMedInf] = useState(false)
    const [smokeEnabled,setSmokeEnabled] = useState(false)
    const [dbtEnabled,setDbtEnabled] = useState(false)  
    const[counter,setCounter] = useState([{bio: '',evaluation: 'No evaluada'}])

    //Medic
    const [pdl,setPdl] = useState('')  
    const [biom,setBiom] = useState([])
    const [date,setDate] = useState(new Date())
    
    useEffect(()=>{
        setName(user.name)
        setRegisterDate(user.registerDate)
        setSurname(user.surname)
        setEmail(user.email)
        setSex(user.gender)
        setHist(user.id)

        setSmoke(user.smoke.smoke)

        setDiab(user.dbt.dbt)

        setMedAcv(user.med.acv)
        setMedEpoc(user.med.epoc)
        setMedHip(user.med.hip)
        setMedInf(user.med.inf)

    },[user])

    useEffect(()=>{
        if(smoke!==0) {
            setSmokeEnabled(true)
            setSmokeQuant(user.smoke.qnt)
            setSmokeTime(user.smoke.time)
        } else {
            setSmokeEnabled(false)
            setSmokeQuant('')
            setSmokeTime('')
        }
    },[smoke])

    const handleDate = (date) =>{
        setDate(date)
    }

    useEffect(()=>{
        if(diab===1) {
            setDbtEnabled(true)
            setDiabMed(user.dbt.med)
        } else {
            setDbtEnabled(false)
            setDiabMed('')
        }
    },[diab])

    const handleSmokeChanger =(smoke)=>{
        smoke==="No" && setSmoke(0)
        smoke==="Fumo" && setSmoke(1)
        smoke==="Fumaba" && setSmoke(2)
    }

    const smokeToWord =()=>{
        if(smoke===0) { return "No"}
        if(smoke===1) { return "Fumo"}
        if(smoke===2) { return "Fumaba"}
    }

    const handleDiabChanger =(diab)=>{
        diab==="No" && setDiab(0)
        diab==="Si" && setDiab(1)
    }

    const handleSetPdl =(pdl)=>{
        pdl>100 ? setPdl(100):pdl<0 ? setPdl(0):setPdl(pdl)
    }
    function otherformatedDate (date) {
        var dateComponent = moment(date).format('DD-MM-YYYY');
        return dateComponent
    }

    const handleCounter =()=>{
        console.log(counter,'arr2')
        setCounter([...counter,{bio: '',evaluation: 'No evaluada'}])
    }

    const handleEliminateBiom =(index)=>{
        setCounter(counter.filter(x=>x.bio!==index))
    }


    const handleAddBio = (bio,evaluation,index) => {
        counter[index]={bio: bio,evaluation: evaluation}
    }

    return (
        <div className="aform-background">
            <TopForm name="Datos de usuario" topRadius={true} icon={faUser}/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Nombre</p>
                        <input value={name} onChange={event=>setName(event.target.value)} className="af-input"/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Apellido</p>
                        <input value={surname} onChange={event=>setSurname(event.target.value)}  className="af-input"/>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-text">Email</p>
                        <input type="email" value={email} onChange={event=>setEmail(event.target.value)}  className="af-input"/>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Sexo (como figura en el DNI)</p>
                        <div className="select">
                            <select value={sex} onChange={event=>setSex(event.target.value)} id="standard-select">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Numero del historial médico</p>
                        <input type='number' value={hist} onChange={event=>setHist(event.target.value)} className="af-input"/>
                    </div>
                </div>
            </div>
            <TopForm icon={faUserMd} name="Datos hospitalarios"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50" style={{marginRight:"40px"}}>
                        <p className="af-input-title">Fumar</p>
                        <p className="af-input-text">¿Fumas?</p>
                        <div  onChange={event=>handleSmokeChanger(event.target.value)}  className="select">
                            <select value={smokeToWord()} id="standard-select">
                                <option value="Fumo">Fumo</option>
                                <option value="Fumaba">Fumaba</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Cantidad por día</p>
                        <input placeholder={!smokeEnabled ? "No aplica":"Ingrese cantidad"} value={smokeQuant} onChange={event=>setSmokeQuant(event.target.value)} disabled={!smokeEnabled} className="af-input"/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Tiempo fumado en años</p>
                        <input  placeholder={!smokeEnabled ? "No aplica":"Ingrese tiempo"} value={smokeTime} onChange={event=>setSmokeTime(event.target.value)} disabled={!smokeEnabled} className="af-input"/>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50" >
                        <p className="af-input-title">Diabetes</p>
                        <p className="af-input-text">¿Tiene Diabetes?</p>
                        <div className="select">
                            <select value={diab===0 ? "No":"Si"} onChange={event=>handleDiabChanger(event.target.value)} id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Medicamento</p>
                        <div className="select">
                            <select disabled={!dbtEnabled} id="standard-select">
                                {(!dbtEnabled) ? <option value="No aplica">No aplica</option>:
                                <>
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                                </>}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-title">Otros</p>
                        <p className="af-input-text">Otros factores de riesgo</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">EPOC</option>
                                <option value="Option 2">Infarto</option>
                                <option value="Option 3">Obesidad</option>
                                <option value="Option 4">Hipertension</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="af-input-line" >
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Tumor Primario</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Histología</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                {counter.map((item,index)=><Biom array={counter} handleElimIndex={handleEliminateBiom} handleAddBio={handleAddBio} propbio={item.bio} propeval={item.evaluation} index={index}/>)}

                <div onClick={handleCounter} className="ad-new-bio">
                    <p className="ad-new-bio-p">Añadir nuevo biomarcador</p>
                </div>

                <div className="af-input-line" >
                    <div className="af-input-cont">
                        <p className="af-input-text">Expresiones del PDL1</p>
                            <div className="af-input theper">
                                <input min='0' max='100' type="number" value={pdl} onChange={e=>handleSetPdl(e.target.value)} className="af-input-per" placeHolder="Introduzca un numero del 1 al 100"/>
                                <p className="af-input-text">%</p>
                            </div>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Tratamiento del tumor primario</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Tratamiento perioperatorio</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="af-input-line">
                    <div style={{flex: '0.2 1'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">T</p>
                        <input className="af-input"/>
                    </div>
                    <div style={{flex: '0.2 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">N</p>
                        <input className="af-input"/>
                    </div>
                    <div style={{flex: '0.2 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">M</p>
                        <input className="af-input"/>
                    </div>
                    <div style={{flex: '0.4 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Estadio</p>
                        <input className="af-input"/>
                    </div>
                </div>
            </div>

            <TopForm icon={faStarOfLife} name="Recaída"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                        <div style={{flex: '0.3 1'}} className="af-input-cont flex50" >
                                <p className="af-input-text">Fecha de recaida</p>
                                <MyDatePicker classname={"accept-patient"} className="af-input" handleDate={handleDate}></MyDatePicker>
                        </div>
                        <div style={{flex: '0.7 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                            <p className="af-input-text">Local o distancia</p>
                            <div style={{height: '40px'}} className="select">
                                <select  >
                                    <option value={'L'}>Local</option>
                                    <option value={'D'}>Distancia</option>
                                    <option value={'LyD'}>Local y Distancia</option>
                                </select>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
