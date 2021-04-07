import React,{useEffect,useState} from 'react'
import '../home/Home.css'
import { ButtonHome } from './buttonsHome/ButtonHome'
import ModalPopOver from '../modals/ModalPopOver'
import  {UserTabHome}  from './usertabhome/UserTabHome'
import { Component } from 'react';
import { TabHey } from './tabhey/TabHey';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'




const Home = ({medicData}) =>{
    console.log(medicData)

    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
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
    },[medicData])

    useEffect(()=>{
        console.log("se actualizo la lista")
    },[userList,images,medic])

    useEffect(()=>{
      console.log("medico es ",medic)
      setMedic(medicData)
    },[medicData])

    return(
            <div className="home-cont-background">
                <TabHey name={medic&&medic.name} userlist={userList.filter(item=>item.status==="Pendiente")}/>
                    <div className="home-cont-buttons">
                        <ButtonHome text="REGISTRAR NUEVO PACIENTE" color="purple" onClick={selectModal }></ButtonHome>
                        <ButtonHome text="VER TODOS LOS PACIENTES" color="blue" link="seeAllUsers"></ButtonHome>
                        <ButtonHome text="VER ULTIMOS PACIENTES CON SINTOMAS" color="lightblue" link="seeAllUsers"></ButtonHome>
                    </div>
                        <ModalPopOver 
                            displayModal={modal}
                            closeModal={selectModal}/>
                    <div className="home-cont-usertabs">
                    
                        {(userList && images.length > 0) && <UserTabHome userlist={userList.filter(item=>item.status=="Pendiente")} images={images} margin_left={{marginRight:"50px"}}/>}
                        {(userList.length > 0 && images.length > 0) && <UserTabHome userlist={userList.filter(item=>item.status=="Activo")} images={images}/>}
                        
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
