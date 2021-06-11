import React, { useEffect, useState } from 'react'
import './AcceptUser.css'
import { ButtonGoBack } from './../seeAllUsers/ButtonGoBack';
import { AcceptItemUser } from './acceptItemUser/AcceptItemUser';
import { AcceptForm } from './acceptForm/AcceptForm';
import { connect } from 'react-redux'
import {getFirestore} from '../../firebase'
import { Skeleton } from '@material-ui/lab';

const AcceptUser = ({medicData}) => {
    window.onscroll = function() {myFunction()};
    const[userList,setUserList] = useState([])
    const [sticky,setSicky] = useState(true)
    const[skeleton,setSkeleton] = useState(true)
    const[otherIndex,setIndex] = useState(0)
    const [user,setUser] = useState('')

    function myFunction() {
        if (window.pageYOffset <= 83) {
            setSicky(true)
        } else {
            setSicky(false)
        }
    }

    useEffect(()=>{
        const db = getFirestore()
        const itemCollection = db.collection("users").where("medic","==",medicData.id)
        itemCollection.onSnapshot((querySnapshot) => {
            
            let userlista = querySnapshot.docs.map(doc => {
                    return(
                        {docid:doc.id,...doc.data()}
                        )
                    }
                )
            setUserList(userlista.filter(item=>item.status==="Pendiente"))
            startTimer()
            }
        )
    },[medicData])

    const startTimer = () => {
        setTimeout(function(){
            setSkeleton(false)
        }.bind(this),500)
    }

    useEffect(()=>{
        setUser(userList[0])
    },[userList])

    const handleChangeUser =(user,ind)=>{
        setIndex(ind)
        setUser(user)
    }


    return (
        <div className="accept-user-background-cont">
            <div className="accept-user-left">
                <ButtonGoBack classNameProp="accept-user-btn" text="VOLVER AL INICIO" color="purple"/>
                <div className={sticky ? "accept-user-list":"accept-user-list fixed"}>
                    {skeleton ? 
                    <>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'6.1vh'}/>
                    </>
                    :
                    <>
                        {userList.length>0 && userList.map((item,index)=>(<AcceptItemUser index={index} otherIndex={otherIndex} handleClick={handleChangeUser} user={item}/>))}
                    </>}
                </div>
            </div>
            <div className="accept-user-right">
                {skeleton ? 
                    <>
                        <Skeleton style={{borderRadius: '10px'}} width={'63vw'} height={'100%'}/>
                    </>
                :
                <>
                {user && <AcceptForm  user={user}/>}
                </>}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(AcceptUser)