import React,{useEffect,useState} from 'react'
import './PatientSymptoms.css'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { ButtonRefresh } from '../seeAllUsers/ButtonRefresh'
import { SearchTab } from '../seeAllUsers/searchTab/SearchTab';
import { MySnackbar } from '../mySnackBar/MySnackbar';



const PatientSymptoms = ({medicData}) =>{

    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
    const [symptomsList,setSymptomsList] = useState([])
    const [symptomsList2,setSymptomsList2] = useState([])
    const [images,setImageList] =useState([])
    const [sympInfo,setSympInfo] = useState([])
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")

    useEffect(()=>{

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

        const itemCollectionSymp = db.collection("mainSymptoms")
        itemCollectionSymp.onSnapshot((querySnapshot) => {
            
            let sympList = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setSympInfo(sympList)
        })

        const itemCollectionAvatar = db.collection("avatars")
        
        itemCollectionAvatar.get().then((querySnapshot) => {
            
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        {...doc.data()}
                        )
                    }
                )
            setImageList(avatars)
        })

        const itemCollectionSymptoms = db.collection("symptoms")

        itemCollectionSymptoms.onSnapshot((querySnapshot) => {
            let symptomslista = querySnapshot.docs.map(doc => doc.data())
            setSymptomsList(symptomslista)
        })
    },[medicData])

    useEffect(()=>{
      setMedic(medicData)
    },[medicData])

    const cleanSym = () =>{
        const db = getFirestore()
        const itemCollectionSymptoms = db.collection("symptoms")

        var lista = []
        userList.map(item=> item.status==="Activo" && itemCollectionSymptoms.where("id","==",item.id).get().then((querySnapshot) => {
 
            querySnapshot.docs.map(doc => {
                    return(
                        lista = [...lista,{name:item.name,desc:item.desc,...doc.data()}]
                        )
                    }
                )
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
        })) 


    }
    useEffect(()=>{
        cleanSym()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[symptomsList,userList])

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


    function handleSearch(e,title,selected,dateStart,dateEnd){
        (title === "" && selected!=="FECHA") && handleRefresh()
        switch (selected){
            case "FECHA":
                return setSymptomsList2(symptomsList2.filter((item=>
                    item.date.toDate() >= (dateStart)
                    && item.date.toDate() <= (dateEnd))));
            case "PACIENTE":
                return setSymptomsList2(symptomsList2.filter((item=>item.name.toUpperCase().includes(title.toUpperCase()))));   
            case "SINTOMA":
                return setSymptomsList2(symptomsList2.filter((item=>item.symptom.toUpperCase().includes(title.toUpperCase()))));  
            case "GRADO":
                // eslint-disable-next-line eqeqeq
                return setSymptomsList2(symptomsList2.filter((item=>item.grade==(title))));  
            default:
                return handleWarnBar() 
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

export default connect(mapStateToProps)(PatientSymptoms)