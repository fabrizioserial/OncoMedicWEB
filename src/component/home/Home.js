import React,{useEffect,useState,useLayoutEffect} from 'react'
import './Home.css'
import { ButtonHome } from './buttonsHome/ButtonHome'
import ModalPopOverNewMedic from '../modals/ModalPopOverNewMedic'
import { UserTabHome }  from './usertabhome/UserTabHome'
import { TabHey } from './tabhey/TabHey';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { UserTabLastSymptoms } from './userTabLastSymptoms/UserTabLastSymptoms'
import { MySnackbar } from '../mySnackBar/MySnackbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';



const Home = ({medicData}) =>{
    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
    const [symptomsList,setSymptomsList] = useState([])
    const [symptomsList2,setSymptomsList2] = useState([])
    const [modal,setModal] = useState(false)
    const [images,setImageList] =useState([])
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [textSnack,setTextSnack] = useState("")
    const [loading,setLoad] = useState(false)
    const [skeleton,setSkeleton] = useState(true)
    const [cancerList,setCancerList] = useState([])
    const history = useHistory();


    const selectModal = (info) => {
       setModal(!modal)
       handleCloseSnackBar()
    }

    const handleOpensnackBar = (title) =>{
        setTextSnack(title)
        setOpenSnackBar(!openSnackBar)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleNotFound = ()=>{
        history.push('/notfound/login')   
    }

    useEffect(()=>{
        medicData && medicData.name === "" && handleNotFound()
        const db = getFirestore()
        const itemCollection = db.collection("users").where("medic","==",medicData.id)
        itemCollection.onSnapshot((querySnapshot) => {
            
            let userlista = querySnapshot.docs.map(doc => {
                    return(
                        {docid:doc.id,...doc.data()}
                        )
                    }
                )
            setUserList(userlista)
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

        const itemCollectionSymptoms = db.collection("symptoms").orderBy("date")

        itemCollectionSymptoms.onSnapshot((querySnapshot) => {
            let symptomslista = querySnapshot.docs.map(doc => doc.data())
            setSymptomsList(symptomslista)
            startTimer()
        })

        const cancerListCollection = db.collection("cancer").orderBy('name')

        cancerListCollection.onSnapshot((querySnapshot)=>{
            let cancerListDB = querySnapshot.docs.map(doc=>doc.data())
            setCancerList(cancerListDB)
        })
        
    },[medicData])

    const startTimer = () => {
        setTimeout(function(){
            setSkeleton(false)
        }.bind(this),200)
    }

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
                        lista = [...lista,{name:item.name,surname:item.surname,id:item.id,...doc.data()}]
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

    const handleLoad = (bool) =>{
        setLoad(bool)
    } 


    return( 
        <div className="home-cont-background">
                {(loading) && <div className="home-circ-progress">
                    <div className="login-loading"><CircularProgress  color="var(--primary)"/></div>
                </div>
                }
                <TabHey 
                    handleEl={()=>handleOpensnackBar("Usuario eliminado con exito!")}  
                    handleAc={()=>handleOpensnackBar("Usuario creado con exito!")}  
                    name={medic&&medic.name} userlist={userList.filter(item=>item.status==="Pendiente")}
                    cancerList={cancerList.length > 0 && cancerList}/>
                    <div className="home-cont-buttons">
                        {medic.admin&&<ButtonHome text="REGISTRAR NUEVO MÉDICO" color="purple" onClick={selectModal}></ButtonHome>}
                        <ButtonHome test="BtnPurple" text="VER TODOS LOS PACIENTES" color="blue" link="seeAllUsers"></ButtonHome>
                        <ButtonHome text="VER ULTIMOS PACIENTES CON SINTOMAS" color="lightblue" link="seeSymptoms"></ButtonHome>
                    </div>
                        <ModalPopOverNewMedic 
                            handleOpensnackBar={()=>handleOpensnackBar("Medico creado con exito!")}
                            displayModal={modal}
                            closeModal={selectModal}/>
                    <div className="home-cont-usertabs">
                        {skeleton ?
                        <>
                            <Skeleton style={{marginRight: "50px"}} className="usertab-cont-info" variant="rect" animation="wave" width={"100%"} height={"31vw"} />
                            <Skeleton  className="usertab-cont-info" variant="rect" animation="wave" width={"100%"} height={"31vw"} />
                        </>
                        :
                        <>
                            <UserTabHome handleLoad={handleLoad} handleEl={()=>handleOpensnackBar("Usuario eliminado con exito!")} userlist={userList.filter(item=>item.status==="Activo").slice(0,6)} images={images} margin_left={{marginRight:"40px"}}/>
                            <UserTabLastSymptoms className="usersympts-second" symptomsList={symptomsList2.slice(0,6)}/>
                        </>
                        }
                    </div>
                    <MySnackbar
                        severity="success"
                        message={textSnack}
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={handleCloseSnackBar}
                    />
        </div>
    )
} 
Home.defaultProps = {
    medicData: {
        name: "121212", 
        email: "aa@aa.com", 
        id: "123456", 
        admin: "true"
    }
}
Home.propTypes = {
    medicData: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(Home)