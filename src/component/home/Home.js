import React,{useEffect,useState} from 'react'
import '../home/Home.css'
import { ButtonHome } from './buttonsHome/ButtonHome'
import ModalPopOver from '../modals/ModalPopOver'
import  {UserTabHome}  from './usertabhome/UserTabHome'
import { Component } from 'react';
import { TabHey } from './tabhey/TabHey';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { UserTabLastSymptoms } from './userTabLastSymptoms/UserTabLastSymptoms'




const Home = ({medicData}) =>{

    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
    const [symptomsList,setSymptomsList] = useState([])
    const [symptomsList2,setSymptomsList2] = useState([])
    const [modal,setModal] = useState(false)
    const [images,setImageList] =useState([])

    const selectModal = (info) => {
       setModal(!modal) 
    }

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
            console.log(avatars)
        })

        const itemCollectionSymptoms = db.collection("symptoms")

        itemCollectionSymptoms.onSnapshot((querySnapshot) => {
            let symptomslista = querySnapshot.docs.map(doc => doc.data())
            setSymptomsList(symptomslista)
        })
    },[medicData])

    useEffect(()=>{
        console.log("se actualizo la lista")
    },[userList,images,medic])

    useEffect(()=>{
      console.log("medico es ",medic)
      setMedic(medicData)
    },[medicData])

    const cleanSym = () =>{
        const db = getFirestore()
        const itemCollectionSymptoms = db.collection("symptoms")
        var lista = []
        userList.map(item=> item.status == "Activo" && itemCollectionSymptoms.where("id","==",item.id).get().then((querySnapshot) => {
 
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        lista = [...lista,{name:item.name,id:item.id,...doc.data()}]
                        )
                    }
                )
            console.log("los sintoms ",lista)
            setSymptomsList2(lista)
        })) 


    }

    useEffect(()=>{
        console.log("se actualizo",symptomsList2)
    },[symptomsList2])

    useEffect(()=>{
        cleanSym()
    },[symptomsList,userList])



    return(
            <div className="home-cont-background">
                <TabHey name={medic&&medic.name} userlist={userList.filter(item=>item.status==="Pendiente")}/>
                    <div className="home-cont-buttons">
                        <ButtonHome text="REGISTRAR NUEVO MÉDICO" color="purple" onClick={selectModal }></ButtonHome>
                        <ButtonHome text="VER TODOS LOS PACIENTES" color="blue" link="seeAllUsers"></ButtonHome>
                        <ButtonHome text="VER ULTIMOS PACIENTES CON SINTOMAS" color="lightblue" link="seeSymptoms"></ButtonHome>
                    </div>
                        <ModalPopOver 
                            displayModal={modal}
                            closeModal={selectModal}/>
                    <div className="home-cont-usertabs">
                        {(userList.filter(item=>item.status==="Activo").length > 0 && images.length > 0) && <UserTabHome userlist={userList.filter(item=>item.status==="Activo")} images={images} margin_left={{marginRight:"50px"}}/>}
                        {(userList.filter(item=>item.status==="Activo").length > 0 && images.length > 0) && <UserTabLastSymptoms symptomsList={symptomsList2}/>}
                        
                    </div>
            </div>
        )
    
} 

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(Home)