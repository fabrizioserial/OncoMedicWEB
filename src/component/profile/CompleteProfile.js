import React,{useEffect,useState} from 'react'
import "../profile/CompleteProfile.css"
import {ButtonGoBack} from "../seeAllUsers/ButtonGoBack"
import { UsertabEstado } from '../profile/usertabEstado/UsertabEstado'
import { UsertabSintomas } from '../profile/usertabSintomas/UsertabSintomas'
import ProfileTab from './profileTab/ProfileTab'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';


export const CompleteProfile = () => {

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [symptomsList, setSymptomsList]= useState([])
    const [image, setImage] = useState("")
    const [symInfo,setSympInfo] = useState([])
    const [load,setLoad] = useState(true)
    const [userNotFound,setUserNotFound] = useState(false)
  


    useEffect(()=>{

        if(id){
            setUserNotFound(false)
            console.log("DB READING")
            console.log("id ",id)
            const db = getFirestore()
            const itemCollection = db.collection("users").doc(id)
            
            itemCollection.get().then((querySnapshot) => {
                let userFound ={id:querySnapshot.id,...querySnapshot.data()}
                setUser(userFound)
                setLoad(false)
                console.log("El usuario encontrado es: ",userFound)
                if(userFound.name == null){
                    setUserNotFound(true)
                }
            })

            const symptoms = db.collection("symptoms").where("id","==", id)
            .onSnapshot((querySnapshot) => {
                let symptomslista = querySnapshot.docs.map(doc => doc.data())
                setSymptomsList(symptomslista)
        })

        }
    },[id])

    useEffect(()=>{
        console.log("user: ",user)
        
        if(id && user.avatar){
            console.log("DB READING")
            const db = getFirestore()
            let stringAvatar = user.avatar
            console.log(user.avatar.toString())
            const itemCollection = db.collection("avatars").doc(stringAvatar.toString())
            itemCollection.get().then((querySnapshot) => {
                let imgFound =querySnapshot.data()
                console.log(imgFound)
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
    },[user])

    useEffect(()=>{

    },[image,symInfo])

    return (
        <React.Fragment>
        { 
        load ? 
        <div className="login-cont-loading">
                    <div className="login-loading"><CircularProgress color="#9357F7"/></div>
        </div>:
        (user && user.name && image)? 
        <div className="profile-cont-background">
            <ButtonGoBack text="VOLVER AL INICIO" color="purple"></ButtonGoBack>
            <ProfileTab image={image} user={user}/>
            <div className="two-squares-complete-profile">
                <div  className="estado-usertab-cont-background">
                    <UsertabEstado idProp={user.id} type="profile" flexi={{Flex:1}}/>
                </div>
                <div className="sintoms-usertab-cont-background">
                    <UsertabSintomas sympstoms={symptomsList} descs={symInfo} flexi={{Flex:1}}/>
                </div>  
            </div>
        </div>
        : userNotFound &&
        <div className="profile-cont-background1">
            <img className={{width:"200px"}} src="https://www.initcoms.com/wp-content/uploads/2020/07/404-error-not-found-1.png" />
        </div>
        }
        
        </React.Fragment>
        
    )
}


