import React,{useEffect,useState} from 'react'
import '../home/Home.css'
import { ButtonHome } from './buttonsHome/ButtonHome'
import ModalPopOver from '../modals/ModalPopOver'
import  {UserTabHome}  from './usertabhome/UserTabHome'
import { Component } from 'react';
import { TabHey } from './tabhey/TabHey';
import {getFirestore} from '../../firebase'



export const Home = () =>{

    const [userList,setUserList] = useState([])
    const [modal,setModal] = useState(false)
    const selectModal = (info) => {
       setModal(!modal) 
    }

    useEffect(()=>{
        console.log("DB READING")
        
         const db = getFirestore()
        const itemCollection = db.collection("users")
        
        itemCollection.get().then((querySnapshot) => {
            
            let userlista = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setUserList(userlista)
        })
    },[])

    useEffect(()=>{
        console.log(userList)
    },[userList])

    return(
            <div className="home-cont-background">
                <TabHey name={"RICARDO"}/>
                    <div className="home-cont-buttons">
                        <ButtonHome text="REGISTRAR NUEVO PACIENTE" color="purple" onClick={selectModal }></ButtonHome>
                        <ButtonHome text="VER TODOS LOS PACIENTES" color="blue" link="seeAllUsers"></ButtonHome>
                        <ButtonHome text="VER ULTIMOS PACIENTES CON SINTOMAS" color="lightblue" link="seeAllUsers"></ButtonHome>
                    </div>
                        <ModalPopOver 
                            displayModal={modal}
                            closeModal={selectModal}/>
                    <div className="home-cont-usertabs">
                        {userList.length > 0 && <UserTabHome userlist={userList?userList : []} margin_left={{marginRight:"50px"}}/>}
                        <UserTabHome/>
                    </div>
            </div>
        )
    
} 
