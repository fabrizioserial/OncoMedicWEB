import React , {useState, useEffect} from 'react'
import './ItemUser.css'
import optionIcon from '../../img/option_icon.png'
import {Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLaughBeam,faSadTear,faFrown,faMeh,faSmile } from '@fortawesome/free-regular-svg-icons'
import {faCircle, faCrutch,faDrumstickBite,faRunning,faTint,faUsers,faClipboard,faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import MouseOverPopover from '../mouseOverPopover/MouseOverPopover'
import { useHistory } from 'react-router-dom';




export const ItemUser = ({handleClick,type,user,image,symptom,desc,daily,mood,sad,run,social,hid,hungry,handletotalClick}) => {
    const [imgs,setImgs] = useState(image)
    const [descripcion,setDescripcion] = useState("Descripcion del sintoma no encontrado")
    const [regdiario,setRegDiario] = useState()


    useEffect(() => {
        setImgs(image)
    }, [image])


    useEffect(()=>{
        if(desc && symptom){
            const listOfGrades = desc.gravity.find(element => element.value===symptom.grade)
            setDescripcion(listOfGrades)
        } 
    },[desc, symptom])

    useEffect(()=>{
        if(daily){
            setRegDiario(daily)
        } 
    },[daily])


    useEffect(()=>{},[mood,sad,run,hungry,hid,social])

    const history = useHistory();
    const switchToProfle = () => {
        console.log(user.docid)
        history.push(`/profile/${user.docid}`);
    }

    const returnEmoji = (mood,regdia)=>{
        if(mood===10){
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faLaughBeam}  className={regdia ? "smile-icon emote-size":"emote-size"}/></th>
        }else if(mood>=7){
            return <th  scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faSmile}  className={regdia ? "smile-icon emote-size":"emote-size"}/></th>
        }else if(mood>=4){
            return <th  scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faMeh}  className={regdia ? "smile-icon emote-size":"emote-size"}/></th>
        }else if(mood>=2){
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faFrown}  className={regdia ? "smile-icon emote-size":"emote-size"}/></th>
        }else{
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faSadTear}  className={regdia ? "smile-icon emote-size":"emote-size"}/></th>
        }
    }
    const returnEmote = (mood)=>{
        if(mood===10){
            return "Feliz"
        }else if(mood>=7){
            return "Bien"
        }else if(mood>=4){
            return "Meh"
        }else if(mood>=2){
            return "Un poco mal"
        }else{
            return "Mal"
        }
    }

    return (

        type==="seeAllUsers"?
            <tr   className="item-user-fila">
                <th scope="row" className="item-user-user-image-table"><img alt="" className="usertab-user-image" src={imgs&&imgs.url} /></th>
                <td onClick={()=>switchToProfle()}>{user.id}</td> 
                <td onClick={()=>switchToProfle()}>{user.surname}, {user.name}</td>
                <td onClick={()=>switchToProfle()}>{user.cancer}</td>
                <td onClick={()=>switchToProfle()}></td>
                <td onClick={()=>switchToProfle()}>{user.status=== "Activo" ? <FontAwesomeIcon icon={faCircle} className="item-status-active" size="lg"/> : <FontAwesomeIcon icon={faCircle} className="item-status-inactive" size="lg"/>}</td>
                <td className="item-user-config"><button className="item-user-options" onClick={(e)=>handleClick(e,user,user.status)}><img alt="" className="usertab_icon_image" src={optionIcon}/></button></td>
            </tr>: 

        type==="allRegs"?
        <tr onClick={()=>handleClick("no",regdiario)} className="item-user-fila">
            <td className="item-user-alldiaryRegs-fecha">{regdiario && Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(regdiario.date.toDate())}</td>
            {
                regdiario && <td className="regdiarios-td">{regdiario.mood}</td>
            }
            {
                regdiario && <td className="regdiarios-td">{regdiario.sad}</td>
            }
            {
                regdiario && <td>{regdiario.hungry}</td>
            }
        </tr>:

        type==="home"?
                <tr className="usertab-fila" >
                    <th onClick={()=>switchToProfle()} scope="row" className="usertab-user-image-table"><img alt="" className="usertab-user-image" src={imgs&&imgs.url} /></th>
                    <td onClick={()=>switchToProfle()}>{user.id}</td>
                    <td onClick={()=>switchToProfle()}>{user.surname}, {user.name}</td>
                    <td  className="item-user-config"><button className="item-user-options" onClick={(e)=>handleClick(e,user)}><img alt="" className="usertab_icon_image" src={optionIcon} /></button></td>
                </tr>

            : 
        type==="estado"?
            <tr  className="estado-usertab-fila">
                <td onClick={(e)=>handletotalClick(e,regdiario)} className="regdiario-fila-fecha">{regdiario && Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(regdiario.date.toDate())}</td>
                {
                    regdiario && <td onClick={(e)=>handletotalClick(e,regdiario)} >{returnEmoji(regdiario.mood) }</td>
                }
                {
                    regdiario && <td onClick={(e)=>handletotalClick(e,regdiario)} >{returnEmote(regdiario.mood)}</td>
                }

                <td><button className="item-user-options" onClick={(e)=>handleClick(e,regdiario)}><img alt="" className="usertab_icon_image" src={optionIcon} /></button></td>
            </tr>:
        type==="symptoms"?
            <tr onClick={(e)=>handleClick(e,symptom)}  className="usertab-fila">
                {  
                   symptom.date &&  <td className="symptoms-fila-fecha">{Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> 
                }
                {symptom.symptoms && <td onClick={(e)=>handleClick(e,symptom)}><div style={{display: 'flex',alignItems: 'center',paddingRight:"4%"}}>
                                            {`${symptom.symptoms[0].symptom} `}
                                            {symptom.symptoms.length>1 && `, ${symptom.symptoms[1].symptom} `}
                                            {symptom.symptoms.length>2 && <p className="p-itemuser-symptoms">+{symptom.symptoms.length-2}</p>}
                                            </div></td>}
                <td style={{width: '6%',paddingRight:"3%"}}>{symptom.symptoms.some(el => el.grade > 5) && <FontAwesomeIcon color='red' icon={faExclamationCircle}/>}</td>
            </tr>:
        type==="regdiarioMood"?
            <tr className="item-user-fila-regdiario">
                <td className="emote-regdiario">{returnEmoji(mood,true)}</td>
                <td>Estado de animo</td>
                <td className="value-regdiario">{mood}</td>
            </tr> : 
            type==="regdiarioSad"?
            <tr className="item-user-fila-regdiario">
                <td className="emote-regdiario"> <FontAwesomeIcon icon={faCrutch} className="smile-icon emote-size"/></td>
                <td>Dolor</td>
                <td className="value-regdiario">{sad}</td>
            </tr> : 
            type==="regdiarioRun"?
            <tr className="item-user-fila-regdiario">
                <td className="emote-regdiario"> <FontAwesomeIcon icon={faRunning} className="smile-icon emote-size"/></td>
                <td>Actividad Fisica</td>
                <td  className="value-regdiario">{run}</td>

            </tr> : 
            type==="regdiarioHungry"?
            <tr className="item-user-fila-regdiario">
                <td className="emote-regdiario"> <FontAwesomeIcon icon={faDrumstickBite} className="smile-icon emote-size"/></td>
                <td>Hambre</td>
                <td className="value-regdiario">{hungry}</td>
            </tr> : 
            type==="regdiarioSocial"?
            <tr className="item-user-fila-regdiario">
                <td className="emote-regdiario"> <FontAwesomeIcon icon={faUsers} className="smile-icon emote-size"/></td>
                <td>Actividad Social</td>
                <td className="value-regdiario">{social}</td>
            </tr> : 
            type==="regdiarioHid"?
            <tr className="item-user-fila-regdiario">
                <td className="emote-regdiario"> <FontAwesomeIcon icon={faTint} className="smile-icon emote-size"/></td>
                <td>Hidratación</td>
                <td  className="value-regdiario">{hid}</td>
            </tr> : 
        (type==="sympts")?
                <tr onClick={(e)=>handleClick(e,symptom)}  className="usertab-fila">
                    {symptom.date &&  <td  className="symptoms-fila-fecha">{Intl.DateTimeFormat('en-GB', {year: '2-digit', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
                    <td style={{paddingLeft: "3%"}}>{symptom.surname}, {symptom.name}</td>
                    {symptom && symptom.symptoms.length &&( <td style={{paddingLeft: "2%"}}><div style={{display: 'flex',alignItems: 'center'}}>
                                            {symptom.symptoms[0].symptom.length>8 ? `${symptom.symptoms[0].symptom.slice(0,8)}...`:`${symptom.symptoms[0].symptom}`}
                                            {symptom.symptoms.length>1 && <p className="p-itemuser-symptoms">+{symptom.symptoms.length-1}</p>}
                                            </div></td>)}
                    <td style={{width: '5%',paddingLeft: "4%"}}>{symptom.symptoms.some(el => el.grade > 5) && <FontAwesomeIcon color='red' icon={faExclamationCircle}/>}</td>
                </tr>:
        type==="seeSymptoms"?
        <tr  onClick={(e)=>handleClick(e,symptom)} className="usertab-fila">
            <td ></td>
            {symptom.date &&  <td>{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
            <td >{symptom.surname}, {symptom.name} </td>
            {symptom.symptoms && <td>
                                    <div style={{display: 'flex',alignItems: 'center'}}>
                                        {`${symptom.symptoms[0].symptom} `}
                                        {symptom.symptoms.length>1 && `, ${symptom.symptoms[1].symptom} `}
                                        {symptom.symptoms.length>2 &&<p className="p-itemuser-symptoms">+{symptom.symptoms.length-2}</p>}
                                    </div>
                                </td>
            }
            { symptom.symptoms.some(el => el.grade > 5) ?
                (
                    <td>Urgencia</td>
                ):(
                    <td>No urgencia</td>
                )
            }
        </tr>:
          type==="seeUserSymptoms"?
          <tr onClick={(e)=>handleClick(e,symptom)} className="usertab-fila">
              {symptom.date &&  <td style={{paddingLeft: '5vw'}}>{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
              {symptom.symptoms && <td><div style={{display: 'flex',alignItems: 'center'}}>
                                            {`${symptom.symptoms[0].symptom}`}
                                            {symptom.symptoms.length>1 && `, ${symptom.symptoms[1].symptom}`}
                                            {symptom.symptoms.length>2 &&`, ${symptom.symptoms[2].symptom}`}
                                            {symptom.symptoms.length>3 &&`, ${symptom.symptoms[3].symptom}`}
                                            {symptom.symptoms.length>4 &&`, ${symptom.symptoms[4].symptom}`}
                                            {symptom.symptoms.length>5 &&`, ${symptom.symptoms[4].symptom}`}
                                            {symptom.symptoms.length>6 &&`, ${symptom.symptoms[4].symptom}`}
                                            {symptom.symptoms.length>7 &&`, ${symptom.symptoms[4].symptom}`}
                                            {symptom.symptoms.length>8 &&`, ${symptom.symptoms[4].symptom}`}
                                            {symptom.symptoms.length>9 && <p className="p-itemuser-symptoms">+{symptom.symptoms.length-9}</p>}
                                            </div></td>}
                                    
                                            <td style={{width: '5%'}}>{symptom.symptoms.some(el => el.grade > 5) && <FontAwesomeIcon color='red' icon={faExclamationCircle}/>}</td>
          </tr>: ""
    )
}