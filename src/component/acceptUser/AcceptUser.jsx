import React, { useEffect, useState } from 'react'
import './AcceptUser.css'
import { ButtonGoBack } from './../seeAllUsers/ButtonGoBack';
import { AcceptItemUser } from './acceptItemUser/AcceptItemUser';
import { AcceptForm } from './acceptForm/AcceptForm';
import { connect } from 'react-redux'
import {getFirestore} from '../../firebase'
import { Skeleton } from '@material-ui/lab';
import { MySnackbar } from '../mySnackBar/MySnackbar';
import { useHistory } from 'react-router-dom';


const AcceptUser = ({medicData}) => {
    window.onscroll = function() {myFunction()};
    const[userList,setUserList] = useState([] )
    const [sticky,setSicky] = useState(true)
    const[skeleton,setSkeleton] = useState(true)
    const[otherIndex,setIndex] = useState(0)
    const [user,setUser] = useState('')
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")
    const [empty,setEmpty] = useState(false)
    const history = useHistory();



    function myFunction() {
        if (window.pageYOffset <= 83) {
                        console.log("HOLAAAA")

            setSicky(true)
        } else {
            setSicky(false)
        }
    }

    useEffect(()=>{
        if(medicData.id === ""){
            history.push('/notfound/login')   
        }
        const db = getFirestore()
        const itemCollection = db.collection("users").where("medic","==",medicData.id)
        itemCollection.onSnapshot((querySnapshot) => {
            
            let userlista = querySnapshot.docs.map(doc => {
                console.log('recs',doc.data().recaidas)
                    return(
                        {docid:doc.id,...doc.data()}
                        )
                    }
                )
            userlista.sort(function (a, b) {
                if (b.registerDate > a.registerDate) {
                    return -1;
                }
                if (b.registerDate < a.registerDate) {
                    return 1;
                }
                // a must be equal to b
                return 0;
                })
                
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
        userList && userList.lengt == 0 && setEmpty(true)
        setUser(userList[0])
    },[userList])

    const handleChangeUser =(user,ind)=>{
        setIndex(ind)
        setUser(user)
    }

    const handleFinish = (theUser) => {
        setUserList(userList.filter(x=>x!==theUser))
    }

    const eliminateUser = (theUser) => {
        const db = getFirestore()
        db.collection("users").doc(user.docid).delete().then(() => {
            handleWarnBar()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setUserList(userList.filter(x=>x!==theUser))
    }

    const handleWarnBar = () => {
        setSeverity("success")
        setMessage("Usuario eliminado con exito")
        setOpenSnackBar(!openSnackBar)
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    useEffect(()=>{

    },[empty])


    return (
        <div className="accept-user-background-cont">
            <div className={"accept-user-left"}>
                <ButtonGoBack classNameProp="accept-user-btn" text="VOLVER AL INICIO" color="purple"/>
                <>
                {(user || skeleton) ?
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
                        {userList.length>0 ? userList.map((item,index)=>(<AcceptItemUser index={index} otherIndex={otherIndex} handleClick={handleChangeUser} user={item}/>)):null}
                    </>}
                </div>
                :null}
                </>
            </div>
            <div className="accept-user-right">
                {skeleton ? 
                    <>
                        <Skeleton style={{borderRadius: '10px'}} width={'61vw'} height={'100%'}/>
                    </>
                :
                <>
                    {user ? <AcceptForm eliminateUser={eliminateUser} finish={handleFinish} id={user.docid} accept={true} user={user}/>
                        :
                        null}
                </>}
            </div>
            {
                !user && !skeleton &&
                    <div className="div-patients-error absolute" >
                        <div className="patiens-error-cont au">
                            <img className="patients-error" alt="" src="https://www.clicktoko.com/assets/images/nodata.png"/>
                            <p style={{fontSize: "1.3rem"}}>No se encontraron pacientes</p>
                        </div>
                    </div>
            }
            <MySnackbar
                severity={severity}
                message={message}
                openSnackBar={openSnackBar}
                handleCloseSnackBar={handleCloseSnackBar}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(AcceptUser)