import React, { useEffect, useState } from 'react'
import { ButtonGoBack } from './../seeAllUsers/ButtonGoBack';
import { connect } from 'react-redux'
import {getFirestore} from '../../firebase'
import { Skeleton } from '@material-ui/lab';
import { AcceptForm } from '../acceptUser/acceptForm/AcceptForm';
import { AcceptItemUser } from '../acceptUser/acceptItemUser/AcceptItemUser';
import {useParams} from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import './../acceptUser/AcceptUser.css';

const EditUser = ({medicData}) => {
    const {id} = useParams()
    const [userNotFound,setUserNotFound] = useState(false)
    const [sticky,setSicky] = useState(true)
    const[skeleton,setSkeleton] = useState(true)
    const[otherIndex,setIndex] = useState(0)
    const [user,setUser] = useState('')
    window.onscroll = function() {myFunction()};

    function myFunction() {
        if (window.pageYOffset <= 83) {
            console.log("HOLAAAA")
            setSicky(true)
        } else {
            setSicky(false)
        }
    }
        
    useEffect(()=>{

        if(id){
            setUserNotFound(false)
            console.log("DB READING")
            const db = getFirestore()
            const itemCollection = db.collection("users").doc(id)

            itemCollection.get().then((doc) => {
                if (doc.exists) {
                    let userFound ={docid:doc.id,...doc.data()}
                    console.log("El usuario encontrado es: ",userFound)
                    setUser(userFound)
                    startTimer()
                } else {
                    setUserNotFound(true)
                    startTimer()
                }
            }).catch((error) => {
                console.log("Error getting user:", error);
            });
        }
    },[id])

    const startTimer = () => {
        setTimeout(function(){
            setSkeleton(false)
        }.bind(this),500)
    }

    const history = useHistory();
    const handleNaigate = () => {
        history.goBack();
    }

    return (
        <div className="accept-user-background-cont">
            <div className="accept-user-left">
                <ButtonGoBack classNameProp="accept-user-btn" text="VOLVER AL PERFIL" type="allUsers" color="purple"/>
                <div className={sticky ? "accept-user-list":"accept-user-list fixed"}>
                    {skeleton ? 
                    <>
                        <Skeleton style={{marginTop: '5%',borderRadius: '10px'}} width={'16vw'} height={'63px'}/>
                    </>
                    :
                    <>
                        {user && <AcceptItemUser  user={user}/>}
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
                {user && <AcceptForm finish={handleNaigate} id={id} accept={false} user={user}/>}
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

export default connect(mapStateToProps)(EditUser)