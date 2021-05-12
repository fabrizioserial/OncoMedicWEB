import React,{useEffect,useState} from 'react'
import './SeeAllDiaryRegs.css'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import { makeStyles } from '@material-ui/core/styles';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { ButtonRefresh } from '../seeAllUsers/ButtonRefresh'
import { SearchTab } from '../seeAllUsers/searchTab/SearchTab';
import { MySnackbar } from '../mySnackBar/MySnackbar';



const SeeAllDiaryRegs = ({medicData}) =>{

    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
    const [symptomsList,setSymptomsList] = useState([])
    const [symptomsList2,setSymptomsList2] = useState([])
    const [symptomsOrigin,setSymptomsListOrigin] = useState([])
    const [images,setImageList] =useState([])
    const [sympInfo,setSympInfo] = useState([])
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")

    useEffect(()=>{
        
        console.log("DB READING")
        const db = getFirestore()
        const itemCollection = db.collection("users").where("medic","==",medicData.id)
        itemCollection.onSnapshot((querySnapshot) => {
            
            let userlista = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setUserList(userlista)
        })
    },[medicData])

    useEffect(()=>{
        console.log("se actualizo la lista")
    },[userList,images,medic])

    useEffect(()=>{
      setMedic(medicData)
    },[medicData])

    const cleanSym = () =>{
        const db = getFirestore()
        const itemCollectionSymptoms = db.collection("symptoms")

        var lista = []
        userList.map(item=> item.status==="Activo" && itemCollectionSymptoms.where("id","==",item.id).get().then((querySnapshot) => {
 
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        lista = [...lista,{name:item.name,desc:item.desc,...doc.data()}]
                        )
                    }
                )
            console.log("los sintoms ",lista)
            setSymptomsList2(lista.sort(function (a, b) {
                                            if (b.date > a.date) {
                                                return 1;
                                            }
                                            if (b.date < a.date) {
                                                return -1;
                                            }
                                            // a must be equal to b
                                            return 0;
                                            }))
            setSymptomsListOrigin(lista.sort(function (a, b) {
                                            if (b.date > a.date) {
                                                return 1;
                                            }
                                            if (b.date < a.date) {
                                                return -1;
                                            }
                                            // a must be equal to b
                                            return 0;
                                            }))

        })) 


    }

    useEffect(()=>{
        console.log("se actualizo",symptomsList2)
        
    },[symptomsList2])

    useEffect(()=>{
        cleanSym()
    },[symptomsList,userList])

{/*
    const handleSearch = (e,title) => {
        title === "" ? handleRefresh() :
        title = title.toUpperCase()
        setSymptomsList2(symptomsOrigin.filter((item=>item.name.toUpperCase().includes(title)||
                                    item.symptom.toUpperCase().includes(title) ||
                                    item.symptom.toUpperCase().includes(title) || filterDate(item.date,title,item)
                                    )))
}*/}

    const handleWarnBar = () => {
        setSeverity("error")
        setMessage("Por favor seleccione una categoria")
        setOpenSnackBar(!openSnackBar)
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    function handleSearch(e,title,selected,date2){
        title === "" && handleRefresh()
        switch (selected){
            case "FECHA":
                return setSymptomsList2(symptomsList2.filter((item=>
                    (Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(item.date.toDate())) >= (Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(title))
                    && (Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(item.date.toDate())) <= (Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date2)))));
            case "PACIENTE":
                console.log(title)
                return setSymptomsList2(symptomsList2.filter((item=>item.name.toUpperCase().includes(title.toUpperCase()))));   
            case "SINTOMA":
                return setSymptomsList2(symptomsList2.filter((item=>item.symptom.toUpperCase().includes(title.toUpperCase()))));  
            case "GRADO":
                return setSymptomsList2(symptomsList2.filter((item=>item.grade.toUpperCase().includes(title.toUpperCase()))));  
            default:
                return handleWarnBar() 
        }
    }

    const filterDate = (date,title,item) =>{
        if (Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date.toDate())== title){
            return item
        }
    }

    const handleRefresh=()=>{
        const db = getFirestore()
        const itemCollection = db.collection("users")

        const usersActive = itemCollection.where("status","!=","Pendiente")
        usersActive.get().then((querySnapshot)=>{
            let activeuser = querySnapshot.docs.map(doc =>{
                return(
                    {
                        id:doc.id,...doc.data()
                    }
                )
            })
            setUserList(activeuser)
        })
    }

    useEffect(()=>{
        console.log("DB READING")
        
         const db = getFirestore()
        const itemCollection = db.collection("users")

        const usersActive = itemCollection.where("status","!=","Pendiente")
        usersActive.get().then((querySnapshot)=>{
            let activeuser = querySnapshot.docs.map(doc =>{
                return(
                    {
                        id:doc.id,...doc.data()
                    }
                )
            })
            setUserList(activeuser)
        })

    },[])

    return(
        <div className="userall-cont-background">
            <div className="userall-head">
                <ButtonGoBack text="VOLVER AL INICIO" color="purple"/>
                <ButtonRefresh handleClick={handleRefresh} text="VOLVER AL INICIO" color="purple"/>
            </div>

            <div className="userall-cont-cont">
                <SearchTab categories={["FECHA","PACIENTE","SINTOMA","GRADO"]} handleClick={handleSearch}/>
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-sympts">
                            <tr>
                            <th className="patientsymptoms-th-empty" scope="col"></th>
                            <th className="patientsymptoms-th-fecha" scope="col">FECHA</th>
                            <th className="patientsymptoms-th-patient" scope="col">PACIENTE</th>
                            <th className="patientsymptoms-th-symptom" scope="col">SINTOMA</th>
                            <th className="patientsymptoms-th-grade" scope="col">GRADO</th>
                            <th className="patientsymptoms-th-grade" scope="col">RESPUESTA</th>
                            <th className="patientsymptoms-th-empty" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symptomsList2.length > 0 && symptomsList2.map((item,key) => <ItemUser  key={key} symptom={item} desc={sympInfo.find(element => element.label===item.symptom)} type="seeSymptoms"/>)
                            }
                        </tbody>
                    </table>
                    {userList&& <button className="userall-btn-load-more">Cargar mas</button>}
                </div>
                <MySnackbar
                        severity={severity}
                        message={message}
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={handleCloseSnackBar}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(SeeAllDiaryRegs)