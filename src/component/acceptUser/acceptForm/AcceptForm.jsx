import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AcceptForm.css'
import { TopForm } from './TopForm'
import {faUser,faUserMd,faStarOfLife,faNotesMedical, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { Biom } from './biom/Biom'
import { Recaida } from './recaida/Recaida'
import Select, { components }  from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import {getFirestore} from '../../../firebase'
import ModalPopOverEliminate from '../../modals/ModalPopOverEliminate'

const DropdownIndicator = (
    props: ElementConfig<typeof components.DropdownIndicator>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon size={'lg'} icon={faCaretDown} />
      </components.DropdownIndicator>
    );
};

const SelectContainer = ({ children, ...props }) => {
    return (
        <components.SelectContainer {...props}>
          {children}
        </components.SelectContainer>
    );
  };

export const AcceptForm = ({user,accept,id,finish,eliminateUser}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [cancerList,setCancerList] = useState([])
    const [registerDate,setRegisterDate] = useState(new Date())
    const [lastConnection,setLastConnection] = useState(new Date())
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
    const[biomarkers,setBiomarkers] = useState([{bio: '',evaluation: 'No evaluada'}])
    const[recaidas,setRecaidas] = useState([{date: '',local: 'L'}])
    const [t,setT] = useState('')  
    const [n,setN] = useState('')  
    const [m,setM] = useState('')  
    const [estadio,setEstadio] = useState('')  
    const [primTumor,setPrimTumor] = useState('')    
    const [histology,setHistology] = useState('Option 1')  
    const [tumorTreatment,setTumorTreatment] = useState('Si')  
    const [periTreatment,setPeriTreatment] = useState('Option 1')  
    const [status,setStatus] = useState("Activo")  


    //Error
    const [enableErrors,setEnableErrors] = useState(false)

    useEffect(()=>{
        const db = getFirestore()
        const itemCollection = db.collection("cancer")
        itemCollection.onSnapshot((querySnapshot) => {
            
            let canerList = querySnapshot.docs.map(doc => {
                    return(
                        {value:doc.data().name , label:doc.data().name}
                        )
                    }
                )
            setCancerList(canerList.sort(function (a, b) {
                if (b.value > a.value) {
                    return -1;
                }
                if (b.value < a.value) {
                    return 1;
                }
                // a must be equal to b
                return 0;
                }))
        })
    },[])

    
    useEffect(()=>{ 
        setDefaultMeds()
        user.name && setName(user.name)
        user.registerDate && setRegisterDate(user.registerDate.toDate())
        user.lastConnection && setLastConnection(user.lastConnection.toDate())
        user.surname && setSurname(user.surname)
        user.email && setEmail(user.email)
        user.gender && setSex(user.gender)
        user.id ? setHist(user.id):setHist('')

        user.smoke.smoke ? setSmoke(user.smoke.smoke):setSmoke("")

        user.dbt.dbt ? setDiab(user.dbt.dbt):setDiab("")

        user.med.acv ? setMedAcv(user.med.acv):setMedAcv("")
        user.med.epoc ? setMedEpoc(user.med.epoc):setMedEpoc("")
        user.med.hip ? setMedHip(user.med.hip):setMedHip("")
        user.med.inf ? setMedInf(user.med.inf):setMedInf("")

        user.cancer ? setPrimTumor(user.cancer):setPrimTumor("")
        user.histogoly ? setHistology(user.histology):setHistology("")
        user.biomarkers ? setBiomarkers(user.biomarkers):setBiomarkers([{bio: '',evaluation: 'No evaluada'}])
        user.PDL1 ? setPdl(user.PDL1):setPdl("")
        user.tumorTreatment ? setTumorTreatment(user.tumorTreatment):setTumorTreatment("")
        user.periTreatmen ? setPeriTreatment(user.periTreatment):setPeriTreatment("")
        user.T ? setT(user.T):setT("")
        user.N ? setN(user.N):setN("")
        user.M ? setM(user.M):setM("")
        user.estadio ? setEstadio(user.estadio):setEstadio("")
        user.recaidas ? setRecaidas(user.recaidas):setRecaidas([{date: null,local: 'L'}])
        setStatus("Activo")
    },[user])

    useEffect(()=>{
        user.med.acv && defOptions.push({ value: 'ACV', label: 'ACV' })
        user.med.epoc && defOptions.push({ value: 'EPOC', label: 'EPOC' })
        user.med.hip && defOptions.push({ value: 'Hipertension', label: 'Hipertension' })
        user.med.inf && defOptions.push({ value: 'Infarto', label: 'Infarto' })
    },[user])

    useEffect(()=>{
        if(smoke!=0) {
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
        if(smoke==0) { return "No"}
        if(smoke==1) { return "Fumo"}
        if(smoke==2) { return "Fumaba"}
    }

    const handleDiabChanger =(diab)=>{
        diab==="No" && setDiab(0)
        diab==="Si" && setDiab(1)
    }

    const handleSex =(sex)=>{
        sex==="Masculino" && setSex(0)
        sex==="Femenino" && setSex(1)
    }

    const handleSexToWord =()=>{
        console.log('sex',sex)
        if(sex==0) { return "Masculino"}
        if(sex==1) { return "Femenino"}
    }

    const handleSetPdl =(pdl)=>{
        pdl>100 ? setPdl(100):pdl<0 ? setPdl(0):setPdl(pdl)
    }
    function otherformatedDate (date) {
        var dateComponent = moment(date).format('DD/MM/YYYY');
        return dateComponent
    }

    const handlebiomarkers =()=>{
        if (biomarkers[biomarkers.length-1].bio){
            setBiomarkers([...biomarkers,{bio: '',evaluation: 'No evaluada'}])
        }
    }

    const handleEliminateBiom =(index)=>{
        const values = [...biomarkers];
        values.splice(index,1)
        setBiomarkers(values)
    }

    useEffect(()=>{
        console.log('ba2',biomarkers)
    },[biomarkers])

    const handleChangeBio = (index,event) => {
        const values = [...biomarkers]
        values[index][event.target.name]=event.target.value
        setBiomarkers(values)
    }

    const handleRecaida = () =>{
        if (recaidas[recaidas.length-1].date){
            setRecaidas([...recaidas,{date: null,local: 'L'}])
        }
    }

    const handleChangeRecaida = (index,event,bool) => {
        const values = [...recaidas]
        if (bool){
            values[index]['date']=event
        } else {
            values[index][event.target.name]=event.target.value
            setRecaidas(values)
        }
    }


    const handleEliminateRec =(index)=>{
        const value = recaidas.splice(index,1)
        setRecaidas(recaidas.filter(x=>x!=value))
    }


    useEffect(()=>{
        console.log(recaidas,'rec')
    },[recaidas])

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

    const verifyInformation=()=>{
        console.log(recaidas,'rec')
        if (!name || !surname || !email || !hist || !surname  || !pdl || !t || !n || !m || !estadio || (primTumor==="")){
            setEnableErrors(true) 
        } else {
            pushToDatabase()
        }
        window.scroll(0,0)
    }

    const pushToDatabase = () => {
        let obj = {
            cancer: primTumor,
            dbt: {
                dbt: diab,
                med: diabMed
            },
            email: email,
            gender: sex,
            id: hist,
            med: {
                acv: medAcv,
                epoc: medEpoc,
                hip: medHip,
                inf: medInf,
            },
            name: name,
            smoke: {
                smoke: smoke,
                qnt: smokeQuant,
                time: smokeTime
            },
            histology: histology,
            PDL1: pdl,
            tumorTreatment: tumorTreatment,
            periTreatment: periTreatment,
            T: t,
            N: n,
            M: m,
            estadio: estadio,
            status: status
        }
        if (biomarkers.filter(x=>x.bio!=='').length>0){
            obj={...obj,biomarkers: biomarkers.filter(x=>x.bio!=='')}
        }
        console.log(recaidas,'obj')
        if (recaidas.filter(x=>x.date!==null).length>0){
            obj={...obj,recaidas: recaidas.filter(x=>x.date!==null)}
        }
        const db = getFirestore()
        db.doc('users/' + id).update({
            ...obj
        });

        finish(user)
    }


    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleElimUser = () =>{
        setOpenModal(false)
        eliminateUser(user)
    }


    return (
        <>
        <div className="aform-background">
            <TopForm name="Datos de usuario" topRadius={true} icon={faUser}/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Fecha de registro</p>
                        <input value={otherformatedDate(registerDate)} disabled={true} className={`af-input`}/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Fecha de ultima conexion</p>
                        <input value={otherformatedDate(lastConnection)} disabled={true} className={`af-input`}/>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Nombre</p>
                        <input value={name} placeHolder="Ingrese nombre" onChange={event=>setName(event.target.value)} className={`af-input`}/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Apellido</p>
                        <input value={surname} placeHolder="Ingrese apellido" onChange={event=>setSurname(event.target.value)}  className={`af-input ${(enableErrors && !surname)}`}/>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-text">Email</p>
                        <input type="email" placeHolder="Ingrese email" value={email} onChange={event=>setEmail(event.target.value)}  className={`af-input ${(enableErrors && !email)}`}/>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Sexo (como figura en el DNI)</p>
                        <div className="select">
                            <select value={handleSexToWord()} onChange={event=>handleSex(event.target.value)} id="standard-select">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Numero del historial médico</p>
                        <input type='number' placeHolder="Ingrese historial médico" value={hist} onChange={event=>setHist(event.target.value)} className={`af-input ${(enableErrors && !hist)}`}/>
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
                        <input placeholder={!smokeEnabled ? "No aplica":"Ingrese cantidad"} value={smokeQuant} onChange={event=>setSmokeQuant(event.target.value)} disabled={!smokeEnabled} className={`af-input ${(enableErrors && !smokeQuant && smokeEnabled)}`}/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Tiempo fumado en años</p>
                        <input  placeholder={!smokeEnabled ? "No aplica":"Ingrese tiempo"} value={smokeTime} onChange={event=>setSmokeTime(event.target.value)} disabled={!smokeEnabled} className={`af-input ${(enableErrors && !smokeTime && smokeEnabled)}`}/>
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
                                placeholder= "Ninguno"
                                closeMenuOnSelect={false}
                                components={{animatedComponents,DropdownIndicator}}
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
                        {(cancerList.length>0) &&
                            <Select id="standard-select"
                                defaultValue={primTumor && {value: primTumor, label: primTumor }}
                                closeMenuOnSelect={true}
                                placeholder= "--Seleccione un cancer--"
                                components={{animatedComponents,DropdownIndicator,SelectContainer}}
                                styles={(enableErrors && (primTumor==="")) && {
                                    container: base => ({
                                    ...base,
                                    backgroundColor: 'red',
                                    borderRadius: '5px',
                                    padding: 3,
                                }),
                                }}
                                options={cancerList}
                                onChange={e=>setPrimTumor(e.value)} 
                        />}
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Histología</p>
                        <div className="select">
                            <select  value={histology} onChange={e=>setHistology(e.target.value)}  id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                {biomarkers.map((item,index)=><Biom array={biomarkers} handleElimIndex={handleEliminateBiom} handleChangeBio={handleChangeBio} propbio={item.bio} propeval={item.evaluation} index={index}/>)}

                <div onClick={handlebiomarkers} className="ad-new-bio">
                    <p className="ad-new-bio-p">Añadir nuevo biomarcador</p>
                </div>

                <div className="af-input-line" >
                    <div className="af-input-cont">
                        <p className="af-input-text">Expresiones del PDL1</p>
                            <div className={`af-input theper ${(enableErrors && !pdl)}`}>
                                <input  min='0' max='100' type="number" value={pdl} onChange={e=>handleSetPdl(e.target.value)} className={`af-input-per`} placeholder="Introduzca un numero del 1 al 100"/>
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
                            <select   value={periTreatment} onChange={e=>setPeriTreatment(e.target.value)} id="standard-select">
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
                        <input value={t} placeHolder="Ingrese tumor" onChange={e=>setT(e.target.value)} className={`af-input ${(enableErrors && !t)}`}/>
                    </div>
                    <div style={{flex: '0.2 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">N</p>
                        <input value={n} placeHolder="Ingrese ganglio" onChange={e=>setN(e.target.value)} className={`af-input ${(enableErrors && !n)}`}/>
                    </div>
                    <div style={{flex: '0.2 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p style={{marginLeft: '7px'}} className="af-input-text">M</p>
                        <input value={m} placeHolder="Ingrese metastasis" onChange={e=>setM(e.target.value)} className={`af-input ${(enableErrors && !m)}`}/>
                    </div>
                    <div style={{flex: '0.4 1',marginLeft: '10px'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Estadio</p>
                        <input value={estadio} placeHolder="Ingrese estadio" onChange={e=>setEstadio(e.target.value)} className={`af-input ${(enableErrors && !estadio)}`}/>
                    </div>
                </div>
            </div>

            <TopForm icon={faStarOfLife} name="Recaída"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                {recaidas.map((item,index)=>
                    <Recaida handleElimIndex={handleEliminateRec} array={recaidas} handleChangeRecaida={handleChangeRecaida} customDate={item.date} customLocal={item.local} index={index} />
                )}
                <div onClick={handleRecaida} className="ad-new-bio">
                        <p className="ad-new-bio-p">Añadir nueva recaida</p>
                </div>
            </div>
            <TopForm icon={faNotesMedical} name="Estado"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-cont flex50" style={{marginTop: '30px'}}>
                    <p className="af-input-text">Estado</p>
                    <div className="select">
                        <select value={status} onChange={e=>setStatus(e.target.value)} id="standard-select">
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Muerto">Muerto</option>
                        </select>
                    </div>
                </div>
            </div>
            

        </div>
        <div className={`div-final-btn-acceptform ${accept}`}>
            {accept && <button onClick={e=>setOpenModal(true)} className="final-btn-acceptform elim">Eliminar</button>}
            <button onClick={verifyInformation} className="final-btn-acceptform guard" >{accept ? "Confirmar":"Guardar"}</button>
        </div>

        <ModalPopOverEliminate
            id={user.id}
            name={user.name}
            surname={user.surname}
            displayModal={openModal}
            closeModal={handleCloseModal}
            handleEliminate={handleElimUser}
        />
        </>
    )
}
