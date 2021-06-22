import React,{useEffect,useState} from 'react'
import './PatientSymptoms.css'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { ButtonRefresh } from '../seeAllUsers/ButtonRefresh'
import { SearchTab } from '../seeAllUsers/searchTab/SearchTab';
import { MySnackbar } from '../mySnackBar/MySnackbar';
import moment from 'moment';
import ModalPopOverSymptom from '../modals/ModalPopOverSymptom';
import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';




const PatientSymptoms = ({medicData}) =>{

    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
    const [symptomsList,setSymptomsList] = useState([])
    const [symptomsList2,setSymptomsList2] = useState([])
    const [showedSymptomsList2,setShowedSymptomsList2] = useState([])
    const [images,setImageList] =useState([])
    const [sympInfo,setSympInfo] = useState([])
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")
    const [load,setLoad] = useState(true)
    const [refresh,setRefresh] = useState(false)
    const [reTitle,setRetitle] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [symptom, setSymptom] = useState('');
    const history = useHistory();


    const handleCloseModal = () => {
        setOpenModal(false);
    };
    
    const handleCloseAndOpenModal = (event,item) => {
    item!==undefined && setSymptom(item);
    setOpenModal(true)
    }; 

    useEffect(()=>{
        if(medicData.id === ""){
            history.push('/notfound/login')   
        }

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
    },[medicData])

    useEffect(()=>{
      setMedic(medicData)
    },[medicData])

    const cleanSym = () =>{
        const db = getFirestore()
        const itemCollectionSymptoms = db.collection("symptoms")

        var lista = []
        var promises = userList.map(item=> item.status==="Activo" && itemCollectionSymptoms.where("id","==",item.id).get().then((querySnapshot) => {
 
            querySnapshot.docs.map(doc => {
                    return(
                        lista = [...lista,{name:item.name,surname:item.surname,desc:item.desc,...doc.data()}]
                        )
                    }
                )
            lista.sort(function (a, b) {
                                            if (b.date > a.date) {
                                                return 1;
                                            }
                                            if (b.date < a.date) {
                                                return -1;
                                            }
                                            // a must be equal to b
                                            return 0;
                                            })
        })) 
        
        Promise.all(promises).then(function(results) {
            setSymptomsList2(lista)
            startTimer()
        })

    }

    const startTimer = () =>{
        setTimeout(function(){
            setLoad(false)
        }.bind(this),1500)
    }
    useEffect(()=>{
        cleanSym()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[symptomsList,userList])

    useEffect(()=>{
        setShowedSymptomsList2(symptomsList2)
    },[symptomsList2])



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

    const handleElCat = (name) => {
        setShowedSymptomsList2(symptomsList2)
    }
 


    function handleSearch(e,hash){
        if(hash.length===0) { handleRefresh()} else {
        setRetitle(!reTitle)
        hash.map((selected)=>{
            switch (selected.selected){
                case "URGENCIA":
                    return setShowedSymptomsList2(showedSymptomsList2.filter((item=>item.symptoms.some(el=>el.grade>5)))); 
                case "NO URGENCIA":
                    return setShowedSymptomsList2(showedSymptomsList2.filter((item=>!item.symptoms.some(el=>el.grade>5))));  
                case "FECHA":
                    return setShowedSymptomsList2(showedSymptomsList2.filter((item=>
                        formatedDate(item.date.toDate()) >= (formatedDate(selected.dateStart))
                        && formatedDate(item.date.toDate()) <= (formatedDate(selected.dateEnd)))));
                case "PACIENTE":
                    return setShowedSymptomsList2(showedSymptomsList2.filter((item=>item.name.toUpperCase().includes(selected.title.toUpperCase()) || item.surname.toUpperCase().includes(selected.title.toUpperCase()))));   
                case "SINTOMA":
                    return setShowedSymptomsList2(showedSymptomsList2.filter((item=>item.symptoms.some(el=>el.symptom.toUpperCase().includes(selected.title.toUpperCase())))));  
                default:
                    return handleWarnBar() 
            }
         })} 
    }

    function formatedDate (date) {
        var dateComponent = moment(date).format('DD/MM/YYYY');
        return dateComponent
    }

    const handleRefresh=()=>{
        setShowedSymptomsList2(symptomsList2)
        setRefresh(true)
    }

    useEffect(()=>{
        setRefresh(false)
    },[refresh])


    return(
        <div className="userall-cont-background">
            <div className="userall-head">
                <ButtonGoBack text="VOLVER AL INICIO" color="purple"/>
                <ButtonRefresh handleClick={handleRefresh} text="VOLVER AL INICIO" color="purple"/>
            </div>

            <div className="userall-cont-cont">
                <SearchTab  reTitle={reTitle} elCAt={handleElCat} warnBar={handleWarnBar} refresh={refresh} categories={["FECHA","PACIENTE","SINTOMA","URGENCIA","NO URGENCIA"]} handleClick={handleSearch}/>
                   <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-sympts">
                            <tr>
                            {!(showedSymptomsList2.length ===0 && showedSymptomsList2.length === 0 && !load) && <th className="patientsymptoms-th-empty" scope="col"></th>}
                            {!(showedSymptomsList2.length ===0 && showedSymptomsList2.length === 0 && !load) && <th className="patientsymptoms-th-fecha" scope="col">FECHA</th>}
                            {!(showedSymptomsList2.length ===0 && showedSymptomsList2.length === 0 && !load) && <th className="patientsymptoms-th-patient" scope="col">PACIENTE</th>}
                            {!(showedSymptomsList2.length ===0 && showedSymptomsList2.length === 0 && !load) && <th className="patientsymptoms-th-symptom" scope="col">SINTOMAS</th>}
                            {!(showedSymptomsList2.length ===0 && showedSymptomsList2.length === 0 && !load) && <th className="patientsymptoms-th-grade" scope="col">RESPUESTA</th>}
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
                                showedSymptomsList2.length > 0 && showedSymptomsList2.map((item,key) => <ItemUser  key={key} symptom={item} desc={sympInfo.find(element => element.label===item.symptom)} handleClick={handleCloseAndOpenModal}  type="seeSymptoms"/>)
                            }
                            {
                                (showedSymptomsList2.length === 0) &&
                                    <div className="patiens-error-cont">
                                        <img className="patients-error" alt="" src="https://firebasestorage.googleapis.com/v0/b/oncoback.appspot.com/o/images%2FdataNotFound.png?alt=media&token=6678405a-2133-4f49-8bd9-bd2f348b1962"/>
                                        <p style={{fontSize: "1.3rem"}}>No se encontraron sintomas</p>
                                    </div> 
                            }</>
                            }
                        </tbody>
                    </table>
                </div>
                <ModalPopOverSymptom
                    symptoms={symptom}
                    displayModal={openModal}
                    closeModal={handleCloseModal}
                    />
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