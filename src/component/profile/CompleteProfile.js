import React,{useEffect,useState} from 'react'
import "../profile/CompleteProfile.css"
import {ButtonGoBack} from "../seeAllUsers/ButtonGoBack"
import { UsertabState } from './usertabState/UsertabState'
import { UsertabSymptoms } from '../profile/usertabSymptoms/UsertabSymptoms'
import ProfileTab from './profileTab/ProfileTab'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../firebase'
import { makeStyles } from "@material-ui/core/styles";
import { MySnackbar } from '../mySnackBar/MySnackbar'
import { Skeleton } from '@material-ui/lab'


const useStyles = makeStyles(theme => ({
    btn: {
        marginLeft: "10px"
    },
    profileTab: {
        marginTop: '25px',
        borderRight: '30px solid var(--primary)',
        borderTopRightRadius: '9px',
        borderBottomRightRadius: '9px',
    },
    squares: {
        borderRight: '30px solid var(--primary)',
        borderTopRightRadius: '9px',
        borderBottomRightRadius: '9px',
    },
    squares2: {
        borderRight: '30px solid var(--primary)',
        borderTopRightRadius: '9px',
        borderBottomRightRadius: '9px',
        marginLeft: '50px'
    }
}));

export const CompleteProfile = () => {
    const classes = useStyles();

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [symptomsList, setSymptomsList]= useState([])
    const [image, setImage] = useState("")
    const [symInfo,setSympInfo] = useState([])
    const [load,setLoad] = useState(true)
    const [userNotFound,setUserNotFound] = useState(false)
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [update,setUpdateData] = useState(false)
    const [severity,setSeverity] = useState('')
    const [message,setMessage] = useState('')
    const [regDiarios,setRegDiario] = useState([])

  
    const handleOpensnackBar = (sev,mes) =>{
        setSeverity(sev)
        setMessage(mes)
        setOpenSnackBar(!openSnackBar)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const updateDate = () =>{
        setUpdateData(!update)
    }

    useEffect(()=>{

        if(id){
            setUserNotFound(false)
            console.log("DB READING")
            const db = getFirestore()
            const itemCollection = db.collection("users").doc(id)

            itemCollection.get().then((doc) => {
                if (doc.exists) {
                    let userFound ={id:doc.id,...doc.data()}
                    console.log("El usuario encontrado es: ",userFound)
                    setUser(userFound)
                } else {
                    setUserNotFound(true)
                }
            }).catch((error) => {
                console.log("Error getting user:", error);
            });

            db.collection("symptoms").where("id","==", id).limit(6)
            .onSnapshot((querySnapshot) => {
                let symptomslista = querySnapshot.docs.map(doc => doc.data())
                setSymptomsList(symptomslista)
            })

            db.collection("diaryReg").where("id","==",id).limit(6)
            .onSnapshot((querySnapshot) => {
                
                let regList = querySnapshot.docs.map(doc => {
                        return(
                            {id:doc.id,...doc.data()}
                            )
                        }
                    )
                setRegDiario(regList)
            })

        }
    },[id,update])

    useEffect(()=>{
        
        if(id && user.avatar){
            
            const db = getFirestore()
            let stringAvatar = user.avatar
            const itemCollection = db.collection("avatars").doc(stringAvatar.toString())
            itemCollection.get().then((querySnapshot) => {
                let imgFound =querySnapshot.data()
                setImage(imgFound)
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

        }
        startTimer()
    },[id, user])

    const startTimer = () => {
        setTimeout(function(){
            setLoad(false)
        }.bind(this),500)
    }


    return (
        <React.Fragment>
            { 
            load ? 
            <div className="profile-cont-background">
                    <Skeleton className={classes.btn} height={40} width={250} />
                    <Skeleton className={classes.profileTab} height={199} width={"97.5%"} />
                    <div className="two-squares-complete-profile">
                        <Skeleton className={classes.squares} height={'34vw'} width={"98%"} />
                        <Skeleton className={classes.squares2} height={'34vw'} width={"98%"} />
                    </div>
            </div>:
            (user && user.name && image)? 
            <div className="profile-cont-background">
                <div className="userall-head">
                    <ButtonGoBack text="VOLVER AL INICIO" color="purple"></ButtonGoBack>
                </div>
                <ProfileTab handleSnackBar={handleOpensnackBar} updateDate={updateDate} image={image} user={user}/>
                <div className="two-squares-complete-profile">
                    <div className="estado-usertab-cont-background">
                        <UsertabState regDiarios={regDiarios}  user={user} type="profile" flexi={{Flex:1}}/>
                    </div>
                    <div className="sintoms-usertab-cont-background">
                        <UsertabSymptoms id={user.id} sympstoms={symptomsList} descs={symInfo} flexi={{Flex:1}}/>
                    </div>  
                </div>
            </div>
            : 
            userNotFound ?
            <div className="profile-cont-background">
                <div className="profile-not-found">
                    <img alt="" className="sintoms-img-error" src="https://www.clicktoko.com/assets/images/nodata.png"/>
                    <p>No se encontró al usuario que buscabas</p>
                </div>
            </div>:null
            }
            <MySnackbar
                severity={severity}
                message={message}
                openSnackBar={openSnackBar}
                handleCloseSnackBar={handleCloseSnackBar}
            />
        
        </React.Fragment>
        
    )
}
