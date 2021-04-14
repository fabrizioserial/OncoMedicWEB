import React,{useEffect,useState} from 'react'
import "../profile/CompleteProfile.css"
import {ButtonGoBack} from "../seeAllUsers/ButtonGoBack"
import { UsertabEstado } from '../profile/usertabEstado/UsertabEstado'
import { UsertabSintomas } from '../profile/usertabSintomas/UsertabSintomas'
import ProfileTab from './profileTab/ProfileTab'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../firebase'

export const CompleteProfile = () => {

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [symptomsList, setSymptomsList]= useState([])
    const [image, setImage] = useState("")


    useEffect(()=>{

        if(id){
            console.log("DB READING")
            console.log("id ",id)
            const db = getFirestore()
            const itemCollection = db.collection("users").doc(id)
            
            itemCollection.get().then((querySnapshot) => {
                let userFound ={id:querySnapshot.id,...querySnapshot.data()}
                setUser(userFound)
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
        
        if(id){
            console.log("DB READING")
            const db = getFirestore()
            console.log(user.avatar)        
            const itemCollection = db.collection("avatars").doc(user.avatar)
            itemCollection.get().then((querySnapshot) => {
                let imgFound =querySnapshot.data()
                console.log(imgFound)
                setImage(imgFound)
            })

        }
    },[user])

    useEffect(()=>{

    },[image])

    return (
        <div>
        {
        (user && user.name && image)? 
        <div className="profile-cont-background">
            <ButtonGoBack text="VOLVER AL INICIO" color="purple"></ButtonGoBack>
            <ProfileTab image={image} user={user}/>
            <div className="two-squares-complete-profile">
                <div  className="estado-usertab-cont-background">
                    <UsertabEstado type="profile" flexi={{Flex:1}}/>
                </div>
                <div className="sintoms-usertab-cont-background">
                    <UsertabSintomas sympstoms={symptomsList} flexi={{Flex:1}}/>
                </div>  
            </div>
        </div>
        :
        <div className="profile-cont-background1">
            <img className={{width:"200px"}} src="https://www.initcoms.com/wp-content/uploads/2020/07/404-error-not-found-1.png" />
        </div>
        }
        
        </div>
        
    )
}


