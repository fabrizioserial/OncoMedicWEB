import moment from 'moment'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import './AcceptForm.css'
import { TopForm } from './TopForm'
import {faUser,faUserMd,faStarOfLife} from '@fortawesome/free-solid-svg-icons'
import { Biom } from './biom/Biom'
import { Recaida } from './recaida/Recaida'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
    const [defaultMeds,setDefaultMeds] = useState([])  
    const animatedComponents = makeAnimated();
    const defOptions = []
    const theOptions = [
        { value: 'Hipertension', label: 'Hipertension' },
        { value: 'EPOC', label: 'EPOC' },
        { value: 'ACV', label: 'ACV' },
        { value: 'Infarto', label: 'Infarto' }
    ]

    //Medic
    const [pdl,setPdl] = useState('')  
    const[counter,setCounter] = useState([{bio: '',evaluation: 'No evaluada'}])
    const[recaidas,setRecaidas] = useState([{date: null,local: 'Local'}])
    const [t,setT] = useState('')  
    const [n,setN] = useState('')  
    const [m,setM] = useState('')  
    const [estadio,setEstadio] = useState('')  
    const [primTumor,setPrimTumor] = useState('')  
    const [histology,SetHistology] = useState('')  
    const [tumorTreatment,setTumorTreatment] = useState('')  


    //Error
    const [enableErrors,setEnableErrors] = useState(false)
    
    useEffect(()=>{ 

        setDefaultMeds()
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
        user.med.acv && defOptions.push({ value: 'ACV', label: 'ACV' })
        user.med.epoc && defOptions.push({ value: 'EPOC', label: 'EPOC' })
        user.med.hip && defOptions.push({ value: 'Hipertension', label: 'Hipertension' })
        user.med.inf && defOptions.push({ value: 'Infarto', label: 'Infarto' })
    },[user])

    useEffect(()=>{
        console.log(defaultMeds,'meds')
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
        setCounter([...counter,{bio: '',evaluation: 'No evaluada'}])
    }

    const handleEliminateBiom =(index)=>{
        setCounter(counter.filter(x=>x.bio!==index))
    }


    const handleAddBio = (bio,evaluation,index) => {
        counter[index]={bio: bio,evaluation: evaluation}
    }

    const handleRecaida = () =>{
        setRecaidas([...recaidas,{date: null,local: 'Local'}])
    }

    const handleDateChange = (Adate,Alocal,index) => {
        recaidas[index]={date: Adate,local: Alocal}
    }

    const verifyInformation=()=>{
        setRecaidas(recaidas.filter(x=>x.date!==null))
        setCounter(counter.filter(x=>x.bio!==''))
        setEnableErrors(true)
        window.scroll(0,0)
        console.log(medInf,medAcv,medHip,medEpoc,'epo')
    }

    const handleInputChange = (newValue) => {
        setMedInf(false)
        setMedHip(false)
        setMedEpoc(false)
        setMedAcv(false)
        newValue.map((item)=>{
            item.label=="Infarto" && setMedInf(true)
            item.label=="Hipertension" && setMedHip(true)
            item.label=="EPOC" && setMedEpoc(true)
            item.label=="ACV" && setMedAcv(true)
            
        })
        
    };

    return (
        <>
        <div className="aform-background">
            <TopForm name="Datos de usuario" topRadius={true} icon={faUser}/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Nombre</p>
                        <input value={name} onChange={event=>setName(event.target.value)} className={`af-input ${(enableErrors && name==="")}`}/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Apellido</p>
                        <input value={surname} onChange={event=>setSurname(event.target.value)}  className={`af-input ${(enableErrors && surname==="")}`}/>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-text">Email</p>
                        <input type="email" value={email} onChange={event=>setEmail(event.target.value)}  className={`af-input ${(enableErrors && email==="")}`}/>
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
                        <input type='number' value={hist} onChange={event=>setHist(event.target.value)} className={`af-input ${(enableErrors && hist==="")}`}/>
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
                        <input placeholder={!smokeEnabled ? "No aplica":"Ingrese cantidad"} value={smokeQuant} onChange={event=>setSmokeQuant(event.target.value)} disabled={!smokeEnabled} className={`af-input ${(enableErrors && smokeQuant==="" && smokeEnabled)}`}/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Tiempo fumado en años</p>
                        <input  placeholder={!smokeEnabled ? "No aplica":"Ingrese tiempo"} value={smokeTime} onChange={event=>setSmokeTime(event.target.value)} disabled={!smokeEnabled} className={`af-input ${(enableErrors && smokeTime==="" && smokeEnabled)}`}/>
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
                            <select value={diabMed} onChange={event=>setDiabMed(event.target.value)}  disabled={!dbtEnabled} id="standard-select">
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
                            <Select id="standard-select"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={defOptions}
                                isMulti
                                options={theOptions}
                                onChange={e=>handleInputChange(e)}
                                />
                    </div>
                </div>

                <div className="af-input-line" >
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Tumor Primario</p>
                        <div className="select">
                            <select value={primTumor} onChange={e=>setPrimTumor(e.target.value)} id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Histología</p>
                        <div className="select">
                            <select value={histology} onChange={e=>SetHistology(e.target.value)}  id="standard-select">
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
                            <div className={`af-input theper ${(enableErrors && pdl==="")}`}>
                                <input min='0' max='100' type="number" value={pdl} onChange={e=>handleSetPdl(e.target.value)} className={`af-input-per`} placeHolder="Introduzca un numero del 1 al 100"/>
                                <p className="af-input-text">%</p>
                            </div>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Tratamiento del tumor primario</p>
                        <div className="select">
                            <select value={tumorTreatment} onChange={e=>setTumorTreatment(e.target.value)} id="standard-select">
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
                        <input value={t} onChange={e=>setT(e.target.value)} className={`af-input ${(enableErrors && t==="")}`}/>
                    </div>
                    <div style={{flex: '0.2 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">N</p>
                        <input value={n} onChange={e=>setN(e.target.value)} className={`af-input ${(enableErrors && n==="")}`}/>
                    </div>
                    <div style={{flex: '0.2 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">M</p>
                        <input value={m} onChange={e=>setM(e.target.value)} className={`af-input ${(enableErrors && m==="")}`}/>
                    </div>
                    <div style={{flex: '0.4 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Estadio</p>
                        <input value={estadio} onChange={e=>setEstadio(e.target.value)} className={`af-input ${(enableErrors && estadio==="")}`}/>
                    </div>
                </div>
            </div>

            <TopForm icon={faStarOfLife} name="Recaída"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                {recaidas.map((item,index)=>
                    <Recaida handleChangeDate={handleDateChange} customDate={item.date} customLocal={item.local} index={index} />
                )}
                <div onClick={handleRecaida} className="ad-new-bio">
                        <p className="ad-new-bio-p">Añadir nueva recaida</p>
                </div>
            </div>
        </div>
        <div className="div-final-btn-acceptform">
            <button onClick={verifyInformation} className="final-btn-acceptform">Guardar</button>
        </div>
        </>
    )
}
