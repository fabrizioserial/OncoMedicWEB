import React,{useEffect,useState,useLayoutEffect} from 'react'
import '../home/Home.css'
import { ButtonHome } from './buttonsHome/ButtonHome'
import ModalPopOverNewMedic from '../modals/ModalPopOverNewMedic'
import  {UserTabHome}  from './usertabhome/UserTabHome'
import { TabHey } from './tabhey/TabHey';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { UserTabLastSymptoms } from './userTabLastSymptoms/UserTabLastSymptoms'
import { MySnackbar } from '../mySnackBar/MySnackbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import sorry from '../../img/sorry-removebg-preview.png'

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
    const [width] = useWindowSize();

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }


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

        const itemCollectionAvatar = db.collection("avatars")
        
        itemCollectionAvatar.get().then((querySnapshot) => {
            
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        {...doc.data()}
                        )
                    }
                )
            setImageList(avatars)
            console.log("hola ",avatars)
        })

        const itemCollectionSymptoms = db.collection("symptoms").orderBy("date")

        itemCollectionSymptoms.onSnapshot((querySnapshot) => {
            let symptomslista = querySnapshot.docs.map(doc => doc.data())
            setSymptomsList(symptomslista)
        })
    },[medicData])

    useEffect(()=>{
    },[userList,images,medic])

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
                        lista = [...lista,{name:item.name,id:item.id,...doc.data()}]
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
        })) 


    }

    useEffect(()=>{
        console.log("se actualizo",symptomsList2)
    },[symptomsList2])

    useEffect(()=>{
        cleanSym()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[symptomsList,userList])

    const handleLoad = (bool) =>{
        setLoad(bool)
    } 


    return( 
        <div className="home-cont-background">
            {width>910 ?
            <>
                {(loading) && <div className="home-circ-progress">
                    <div className="login-loading"><CircularProgress  color="var(--primary)"/></div>
                </div>
                }
                <TabHey 
                    handleEl={()=>handleOpensnackBar("Usuario eliminado con exito!")}  
                    handleAc={()=>handleOpensnackBar("Usuario creado con exito!")}  
                    name={medic&&medic.name} userlist={userList.filter(item=>item.status==="Pendiente")}/>
                    <div className="home-cont-buttons">
                        {medic.admin&&<ButtonHome text="REGISTRAR NUEVO MÉDICO" color="purple" onClick={selectModal }></ButtonHome>}
                        <ButtonHome text="VER TODOS LOS PACIENTES" color="blue" link="seeAllUsers"></ButtonHome>
                        <ButtonHome text="VER ULTIMOS PACIENTES CON SINTOMAS" color="lightblue" link="seeSymptoms"></ButtonHome>
                    </div>
                        <ModalPopOverNewMedic 
                            handleOpensnackBar={()=>handleOpensnackBar("Medico creado con exito!")}
                            displayModal={modal}
                            closeModal={selectModal}/>
                    <div className="home-cont-usertabs">
                        {(userList.filter(item=>item.status==="Activo").length > 0 && images.length > 0) && <UserTabHome handleLoad={handleLoad} handleEl={()=>handleOpensnackBar("Usuario eliminado con exito!")} userlist={userList.filter(item=>item.status==="Activo")} images={images} margin_left={{marginRight:"50px"}}/>}
                        {(userList.filter(item=>item.status==="Activo").length > 0 && images.length > 0) && <UserTabLastSymptoms className="usersympts-second" symptomsList={symptomsList2}/>}
                        
                    </div>
                    <MySnackbar
                        severity="success"
                        message={textSnack}
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={handleCloseSnackBar}
                    />
                </>
                :   
                <>
               <h1>Estamos trabajando para usar la web en celulares, por ahora solo se puede usar desde la computadora!</h1>
               <img alt="" src={sorry}/>
               </>
            }
        </div>
    )
} 

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(Home)