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
                setLoad(false)
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

    useEffect(()=>{
        setShowedSymptomsList(symptomsList)
    },[symptomsList])

    function handleSearch(e,title,selected,dateStart,dateEnd){
        (title === "" && selected!=="FECHA") && handleRefresh()
        switch (selected){
            case "FECHA":
                return setShowedSymptomsList(showedSymptomsList.filter((item=>
                    item.date.toDate() >= (dateStart)
                    && item.date.toDate() <= (dateEnd))));
            case "SINTOMA":
                return setShowedSymptomsList(showedSymptomsList.filter((item=>item.symptom.toUpperCase().includes(title.toUpperCase()))));  
            case "GRADO":
                // eslint-disable-next-line eqeqeq
                return setShowedSymptomsList(showedSymptomsList.filter((item=>item.grade==(title))));  
            default:
                return handleWarnBar() 
            }
    }
    const handleRefresh=()=>{
        setShowedSymptomsList(symptomsList)
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
                <SearchTab categories={["FECHA","SINTOMA","GRADO"]}  handleClick={handleSearch}/>
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-sympts">
                            <tr>
                            <th className="patientsymptoms-th-empty" scope="col"></th>
                            <th className="patientsymptoms-th-fecha" scope="col">FECHA</th>
                            <th className="patientsymptoms-th-symptom" scope="col">SINTOMA</th>
                            <th className="patientsymptoms-th-grade" scope="col">GRADO</th>
                            <th className="patientsymptoms-th-grade" scope="col">RESPUESTA</th>
                            <th className="patientsymptoms-th-empty" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showedSymptomsList.length > 0 && showedSymptomsList.map((item,key) => <ItemUser key={key} symptom={item} desc={sympInfo.find(element => element.label===item.symptom)}   type="seeUserSymptoms"/>)
                            }
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