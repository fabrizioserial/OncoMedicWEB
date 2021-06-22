import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import './AllUserSympts.css'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import {getFirestore} from '../../firebase'
import { ButtonRefresh } from '../seeAllUsers/ButtonRefresh'
import { SearchTab } from '../seeAllUsers/searchTab/SearchTab';
import { connect } from 'react-redux';
import { MySnackbar } from '../mySnackBar/MySnackbar';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';



const AllUserSympts = ({medicData}) =>{

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [symptomsList, setSymptomsList]= useState([])
    const [showedSymptomsList, setShowedSymptomsList]= useState([])
    const [load,setLoad] = useState(true)
    const [userNotFound,setUserNotFound] = useState(false)
    const [update,setUpdateData] = useState(false)
    const [sympInfo,setSympInfo] = useState([])
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")
    const [reTitle,setRetitle] = useState(false)
    const [refresh,setRefresh] = useState(false)
  
    useEffect(()=>{

        if(id){
            setUserNotFound(false)
            console.log("DB READING")
            const db = getFirestore()
            const itemCollection = db.collection("testUsers").doc(id)
            
            itemCollection.get().then((querySnapshot) => {
                let userFound ={id:querySnapshot.id,...querySnapshot.data()}
                                console.log("El usuario encontrado es: ",userFound)

                setUser(userFound)
                startTimer()
                if(userFound.name===null){
                    setUserNotFound(true)
                }
            })

            db.collection("symptoms").where("id","==", id)
            .onSnapshot((querySnapshot) => {
                let symptomslista = querySnapshot.docs.map(doc => doc.data())
                setSymptomsList(symptomslista.sort(function (a, b) {
                    if (b.date > a.date) {
                        return 1;
                    }
                    if (b.date < a.date) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                    }))
            })

            const itemCollectionSymp = db.collection("mainSymptoms")
            itemCollectionSymp.onSnapshot((querySnapshot) => {
            
            let sympList = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setSympInfo(sympList)})
        }
    },[id,update])

    const startTimer = () =>{
        setTimeout(function(){
            setLoad(false)
        }.bind(this),1500)
    }

    const handleElCat = (name) => {
        setShowedSymptomsList(symptomsList)
    }


    useEffect(()=>{
        setShowedSymptomsList(symptomsList)
    },[symptomsList])

    function handleSearch(e,hash){
        if(hash.length===0) { handleRefresh()} else {
        setRetitle(!reTitle)
        hash.map((selected)=>{
            switch (selected.selected){
                case "URGENCIA":
                    return setShowedSymptomsList(showedSymptomsList.filter((item=>item.symptoms.some(el=>el.grade>5)))); 
                case "NO URGENCIA":
                    return setShowedSymptomsList(showedSymptomsList.filter((item=>!item.symptoms.some(el=>el.grade>5))));  
                case "FECHA":
                    return setShowedSymptomsList(showedSymptomsList.filter((item=>
                        formatedDate(item.date.toDate()) >= (formatedDate(selected.dateStart))
                        && formatedDate(item.date.toDate()) <= (formatedDate(selected.dateEnd)))));
                case "PACIENTE":
                    return setShowedSymptomsList(showedSymptomsList.filter((item=>item.name.toUpperCase().includes(selected.title.toUpperCase()) || item.surname.toUpperCase().includes(selected.title.toUpperCase()))));   
                case "SINTOMA":
                    return setShowedSymptomsList(showedSymptomsList.filter((item=>item.symptoms.some(el=>el.symptom.toUpperCase().includes(selected.title.toUpperCase())))));  
                default:
                    return handleWarnBar() 
            }
         })} 
    }

    const handleRefresh=()=>{
        setShowedSymptomsList(symptomsList)
    }

    function formatedDate (date) {
        var dateComponent = moment(date).format('DD/MM/YYYY');
        return dateComponent
    }



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

    return(
        <div className="userall-cont-background">
            <div className="userall-head">
                <ButtonGoBack id={id} type="allUsers" text="VOLVER ATRAS" color="purple"/>
                <ButtonRefresh handleClick={handleRefresh} text="VOLVER AL INICIO" color="purple"/>
            </div>

            <div className="userall-cont-cont">
                <SearchTab  reTitle={reTitle} elCAt={handleElCat} warnBar={handleWarnBar} refresh={refresh} categories={["FECHA","SINTOMA","GRADO"]}  handleClick={handleSearch}/>
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-sympts">
                            <tr>
                            {!(showedSymptomsList.length ===0 && showedSymptomsList.length === 0 && !load) && <th className="patientsymptoms-th-empty" scope="col"></th>}
                            {!(showedSymptomsList.length ===0 && showedSymptomsList.length === 0 && !load) && <th className="patientsymptoms-th-fecha" scope="col">FECHA</th>}
                            {!(showedSymptomsList.length ===0 && showedSymptomsList.length === 0 && !load) && <th className="patientsymptoms-th-symptom" scope="col">SINTOMA</th>}
                            {!(showedSymptomsList.length ===0 && showedSymptomsList.length === 0 && !load) && <th className="patientsymptoms-th-grade" scope="col">GRADO</th>}
                            {!(showedSymptomsList.length ===0 && showedSymptomsList.length === 0 && !load) && <th className="patientsymptoms-th-grade" scope="col">RESPUESTA</th>}
                            {!(showedSymptomsList.length ===0 && showedSymptomsList.length === 0 && !load) && <th className="patientsymptoms-th-empty" scope="col"></th>}
                            </tr>
                        </thead>
                        <tbody>
                            { load ? 
                                <>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2450%"} height={"41px"}></Skeleton>
                            </>
                            :
                                showedSymptomsList.length > 0 ? showedSymptomsList.map((item,key) => <ItemUser key={key} symptom={item} desc={sympInfo.find(element => element.label===item.symptom)}   type="seeUserSymptoms"/>)
                                : 
                                <div className="patiens-error-cont">
                                        <img className="patients-error" alt="" src="https://firebasestorage.googleapis.com/v0/b/oncoback.appspot.com/o/images%2FdataNotFound.png?alt=media&token=6678405a-2133-4f49-8bd9-bd2f348b1962"/>
                                        <p style={{fontSize: "1.3rem"}}>No se encontraron sintomas</p>
                                </div> 
                            }
                        </tbody>
                    </table>
                    {showedSymptomsList && showedSymptomsList.length > 0 && <button className="userall-btn-load-more">Cargar mas</button>}
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

export default connect(mapStateToProps)(AllUserSympts)