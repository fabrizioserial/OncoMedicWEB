import React , {useState, useEffect} from 'react'
import './ItemUser.css'
import optionIcon from 'src/img/option_icon.png'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam,faCircle,faSadTear,faFrown,faMeh,faSmile } from '@fortawesome/free-solid-svg-icons'
import MouseOverPopover from '../mouseOverPopover/MouseOverPopover'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';



export const ItemUser = ({handleClick,type,user,image,symptom,desc,daily,mood,sad,run,social,hid,hungry}) => {
    const [imgs,setImgs] = useState(image)
    const [descripcion,setDescripcion] = useState("")
    const [regdiario,setRegDiario] = useState()

    useEffect(() => {
    }, [imgs])

    useEffect(()=>{
        if(desc && symptom){
            const listOfGrades = desc.gravity.find(element => element.value == symptom.grade)
            setDescripcion(listOfGrades)
        }
    },[desc])

    useEffect(()=>{
        if(daily){
        console.log("reg diario: ",daily)
        setRegDiario(daily)
        } 

    },daily)

    useEffect(()=>{},[mood,sad,run,hungry,hid,social])

    useEffect(()=>{
        console.log("decripcion: ",descripcion)
    },[descripcion])

    const history = useHistory();
    const switchToProfle = () => history.push(`/profile/${user.id}`);

    const returnEmoji = (mood)=>{
        if(mood == 10){
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faLaughBeam}  size="2x"/></th>
        }else if(mood>=7){
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faSmile}  size="2x"/></th>
        }else if(mood>=4){
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faMeh}  size="2x"/></th>
        }else if(mood>=2){
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faFrown}  size="2x"/></th>
        }else{
            return <th scope="row" className="usertab-user-image-table"> <FontAwesomeIcon icon={faSadTear}  size="2x"/></th>
        }
    }
    const returnEmote = (mood)=>{
        if(mood == 10){
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

        type=="seeAllUsers"?
            <tr className="item-user-fila">
                <th scope="row" className="item-user-user-image-table"><img className="item-user-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
                <td>{user.id}</td> 
                <td>{user.name}</td>
                <td>{user.cancer}</td>
               
                <td>{user.status== "Activo" ? <FontAwesomeIcon icon={faCircle} className="item-status-active" size="lg"/> : <FontAwesomeIcon icon={faCircle} className="item-status-inactive" size="lg"/>}</td>
                <td className="item-user-config"><button className="item-user-options" onClick={(e)=>handleClick(e,user)}><img className="usertab_icon_image" src={optionIcon}/></button></td>
            </tr>: 

        type=="home"?
                <tr className="usertab-fila" >
                    <th onClick={()=>switchToProfle()} scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src={imgs&&imgs.url} /></th>
                    <td onClick={()=>switchToProfle()}>{user.id}</td>
                    <td onClick={()=>switchToProfle()}>{user.name}</td>
                    <td  className="item-user-config"><Button className="item-user-options" onClick={(e)=>handleClick(e,user)}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
                </tr>

            : 
        type=="estado"?
            <tr className="estado-usertab-fila">
                <td className="sintomas-fila-fecha">11/2/21</td>
                {
                    regdiario && returnEmoji(regdiario.mood)
                }
                {
                    regdiario && <td>{returnEmote(regdiario.mood)}</td>
                }

                <td><Button className="item-user-options" onClick={(e)=>handleClick(e,regdiario)}><img className="usertab_icon_image" src={optionIcon} /></Button></td>
            </tr>:
        type=="sintomas"?
            <tr className="sintomas-usertab-fila">
                {  
                   symptom.date &&  <td className="sintomas-fila-fecha">{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> 
                }
                <td className="sintomas-fila-fecha">{symptom.symptom}</td>
                <td className="sintomas-fila-grado"><MouseOverPopover name={symptom.grade} descrip={symptom.desc}/></td>
            </tr>:
        type=="regdiarioMood"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Estado de animo</td>
                <td>{mood}</td>
            </tr> : 
            type=="regdiarioSad"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Dolor</td>
                <td>{sad}</td>
            </tr> : 
            type=="regdiarioRun"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Actividad Fisica</td>
                <td>{run}</td>

            </tr> : 
            type=="regdiarioHungry"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Hambre</td>
                <td>{hungry}</td>
            </tr> : 
            type=="regdiarioSocial"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Actividad Social</td>
                <td>{social}</td>
            </tr> : 
            type=="regdiarioHid"?
            <tr className="item-user-fila-regdiario">
                <td> <FontAwesomeIcon icon={faLaughBeam} className="smile-icon" size="2x"/></td>
                <td>Hidratación</td>
                <td>{hid}</td>
            </tr> : 
        type=="sympts"?
                <tr className="usertab-fila">
                    {symptom.date &&  <td className="sintomas-fila-fecha">{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
                    <td onClick={(e)=>handleClick(e,symptom)}>{symptom.id}</td>
                    <td onClick={(e)=>handleClick(e,symptom)}>{symptom.symptom}</td>
                    <td onClick={(e)=>handleClick(e,symptom)} className="usertab-sympts-col-grado">{symptom.grade}</td>
                </tr>:
        type=="seeSymptoms"?
        <tr className="usertab-fila">
            <td onClick={handleClick}></td>
            {symptom.date &&  <td>{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(symptom.date.toDate())}</td> }
            <td onClick={handleClick}>{symptom.id}</td>
            <td onClick={handleClick}>{symptom.symptom}</td>
            { descripcion && 
                (descripcion.label.length<18   ? (
                    <td className="usertab-first-col-grado"><MouseOverPopover name={descripcion.label} descrip={`Grado ${symptom.grade}`}/></td>
                ):(
                    <td className="usertab-first-col-grado"><MouseOverPopover name={descripcion.label} descrip={`Grado ${symptom.grade}: ${descripcion.label}`}/></td> 
                ))
            }
            <td onClick={handleClick}></td>
        </tr>: ""
    )
}
  