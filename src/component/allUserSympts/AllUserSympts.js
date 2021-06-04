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
import ModalPopOverSymptom from '../modals/ModalPopOverSymptom';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';



const AllUserSympts = ({medicData}) =>{

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [symptomsList, setSymptomsList]= useState([])
    const [showedSymptomsList, setShowedSymptomsList]= useState([])
    const [load,setLoad] = useState(false)
    const [userNotFound,setUserNotFound] = useState(false)
    const [update,setUpdateData] = useState(false)
    const [sympInfo,setSympInfo] = useState([])
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")
    const [symptom,setSymptom] = useState("")
    const [reTitle,setRetitle] = useState(false)
    const [openModal,setOpenModal] = useState("")
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

    useEffect(()=>{
        setShowedSymptomsList(symptomsList)
    },[symptomsList])

  const handleCloseAndOpenModal = (event,item) => {
    item!==undefined && setSymptom(item);
    setOpenModal(true)
    }; 

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(()=>{
    setRefresh(false)
    },[refresh])


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
                    case "SINTOMA":
                        return setShowedSymptomsList(showedSymptomsList.filter((item=>item.symptoms.some(el=>el.symptom.toUpperCase().includes(selected.title.toUpperCase())))));  
                    default:
                        return handleWarnBar() 
                }
             })} 
    }
    const handleRefresh=()=>{
        setShowedSymptomsList(symptomsList)
        setRefresh(true)
    }


    function formatedDate (date) {
        var dateComponent = moment(date).format('DD/MM/YYYY');
        return dateComponent
    }
    
    const handleWarnBar = (warnTitle) => {
        setSeverity("error")
        setMessage(warnTitle)
        setOpenSnackBar(!openSnackBar)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleElCat = (name) => {
        setShowedSymptomsList(symptomsList)
    }

    return(
        <div className="userall-cont-background">
            <div className="userall-head">
                <ButtonGoBack id={id} type="allUsers" text="VOLVER ATRAS" color="purple"/>
                <ButtonRefresh handleClick={handleRefresh} text="VOLVER AL INICIO" color="purple"/>
            </div>

            <div className="userall-cont-cont">
                <SearchTab elCAt={handleElCat} warnBar={handleWarnBar} reTitle={reTitle} refresh={refresh} categories={["FECHA","SINTOMA","URGENCIA","NO URGENCIA"]} handleClick={handleSearch}/>
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-sympts">
                            <tr>
                            <th style={{width: '30%',paddingLeft: '5vw'}} className="patientsymptoms-th-fecha" scope="col">FECHA</th>
                            <th style={{width: "50%"}} scope="col">SINTOMAS</th>
                            <th style={{width: "10%"}} scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {load ?
                            <>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                                <Skeleton style={{marginBottom: '18%'}} variant="rect" animation="wave" width={"2683%"} height={"41px"}></Skeleton>
                            </>
                            :
                            <>
                            {
                                showedSymptomsList.length > 0 && showedSymptomsList.map((item,key) => <ItemUser key={key} symptom={item} desc={sympInfo.find(element => element.label===item.symptom)} handleClick={handleCloseAndOpenModal}  type="seeUserSymptoms"/>)
                            }
                            </>}
                        </tbody>
                    </table>
                    {showedSymptomsList && <button className="userall-btn-load-more">Cargar mas</button>}
                </div>
                <MySnackbar
                        severity={severity}
                        message={message}
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={handleCloseSnackBar}
                />
                <ModalPopOverSymptom
                type="profile"
                symptoms={symptom}
                displayModal={openModal}
                closeModal={handleCloseModal}
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