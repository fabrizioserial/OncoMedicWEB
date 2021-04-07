import React,{useState,useEffect,useCallback} from 'react'
import '../login/Login.css'
import medical_ilustrator from '../../img/medical_ilustration.png'
import { Link,NavLink } from 'react-router-dom'
import {getFirestore} from '../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import {setMedicUserAction} from '../../reduxStore/actions/loginAction'

const Login = ({setMedicUserAction}) => {

    const [name,setName] = useState("")
    const [password,setPassword] =useState("")
    const [medic,setMedic] = useState({})
    const [loading,setLoad] = useState(false)

    const checkUser = () =>{
        const db = getFirestore()
        const itemCollection = db.collection("medic")
        setLoad(true)

        itemCollection.get().then((querySnapshot)=>{
            let usermedic = querySnapshot.docs.map(doc => {
              return doc.data().name == name && doc.data().password == password ? ({id:doc.id,...doc.data()})
                : null
            })
            console.log(usermedic)
            
            setLoad(false)
            usermedic && setMedicUserAction({id:usermedic[0].id,name:usermedic[0].name,email:usermedic[0].email})
            usermedic && handleClick()
        }).catch(e=>{
            setLoad(false)
        })
    }


    const pushToDatabase = () =>{
        const db = getFirestore()
        db.collection("users").add({
            name:"Fabri",
            email:"aaa@",
            gender:"",
            birth:"",
            medic:"",
            place:"",
            etnia:"",
            smoke:{
                smoke:false,
                time:"",
                qnt:"",
            },
            dbt:{
                dbt:false,
                med:""
            },
            med:{
                hip:false,
                epoc:false,
                acv:false,
                inf:false
            },
            avatar:"1",
            status:"Pendiente"
        }).then(()=>{
        }).catch((e)=>{
        });
        const date = new Date()
        db.collection('symptoms').add({
            id:"123",
            symptom:"fiebre",
            grade:"4",
            date:date
        })
     }

    const history = useHistory();
    const handleClick = () => history.push('/home');


    useEffect(() => {
        console.log(medic);
    }, [medic])

    useEffect(()=>{

    },[loading])

    useEffect(() => {
        console.log("name: ",name)
        console.log("password: ",password)
    }, [name,password])

    return(
        <div className="cont-login-container">
            {
                loading && <div className="login-cont-loading">
                    <div className="login-loading"><CircularProgress color="#9357F7"/></div>
                </div>
            }
            <div className="cont-login-backlogin">
                <div className="cont-login-cont-ev">
                    <div className="login-text-cont">
                        <p className="text-login-login">Log In</p>
                        <p className="text-login-punto">.</p>
                    </div>
                    <form>
                        <div>
                            <p className="text-login-input">Ingresar direccion de email</p>
                            <input className="input-login" onChange={e => setName(e.target.value)} placeholder="name@example.com"></input>
                        </div>
                        <div style={{marginTop:"40px"}}>
                            <p className="text-login-input">Ingresar direccion de email</p>
                            <input className="input-login" onChange={e => setPassword(e.target.value)} placeholder="atleast 8 caracters"></input>
                        </div>  
                        <button className="btn-login-input" onClick={()=>checkUser()}>
                            Log In
                        </button>
                        <button onClick={pushToDatabase}/>
                            
                    </form>
                    
                </div>

            </div>
            <div className="cont-login-ilustrator">
                <img src={medical_ilustrator} className="img-login-ilustrator"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setMedicUserAction
}

export default connect(null,mapDispatchToProps)(Login)