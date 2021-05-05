import React,{useState,useEffect} from 'react'
import '../login/Login.css'
import medical_ilustrator from '../../img/medical_ilustration.png'
import {getFirestore} from '../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import {setMedicUserAction} from '../../reduxStore/actions/loginAction'
import {faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = ({setMedicUserAction}) => {

    const [name,setName] = useState("")
    const [password,setPassword] =useState("")
    const [medic] = useState({})
    const [loading,setLoad] = useState(false)
    const [errorComplete,setEComplete] = useState(false)
    const [errorInvalid,setEInvalid] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);

    const checkUser = () =>{
        if(name.length > 0 && password.length >0){
            setEComplete(false)
            setEInvalid(false)
            const db = getFirestore()
            const itemCollection = db.collection("medic")
            setLoad(true)

            itemCollection.get().then((querySnapshot)=>{
                let name2 = ""
                querySnapshot.docs.map(doc => {
                    
                    if(doc.data().name === name){
                        if(doc.data().password === password){
                            name2 = doc.data().name
                            setMedicUserAction({id:doc.id,name:doc.data().name,email:doc.data().email,admin:doc.data().admin})
                            handleClick()
                            return 0;
                        }else{
                            setError("error no data")
                        }
                    }
                    return 0;
                })
                if(name2 === ""){
                    setError("error2")
                }
                setLoad(false)
                return 0;

            }).catch(e=>{
                setLoad(false)
            })
        }else if(name.length === 0 || password.length === 0){
            setError("error")
        }
        
    }

    const setError = (type) =>{
        type === "error" ? setEComplete(true):setEInvalid(true)
    }

    const pushToDatabase = () =>{
        const db = getFirestore()
        db.collection("users").add({
            name:"Fabri",
            email:"aaa@",
            gender:"",
            birth:"",
            medic:"123456",
            place:"",
            etnia:"",
            cancer: "",
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
            id:"DrleMt4ynfecs9OHnyr8",
            symptom:"fiebre",
            grade:"4",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date:date
        })
     }

     const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    
    const history = useHistory();
    const handleClick = () => history.push('/home');

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
                        <p onClick={pushToDatabase} className="text-login-login">Log In</p>
                        <p className="text-login-punto">.</p>
                    </div>
                    <form>
                        <div>
                            <p className="text-login-input">Ingresar direccion de email</p>
                            <input type="email" className={(errorComplete || errorInvalid)  ? "input-login error" :"input-login normal"} onChange={e => setName(e.target.value)} placeholder="name@example.com"></input>
                        </div>
                        <div style={{marginTop:"40px"}}>
                            <p className="text-login-input">Ingresar constraseña</p>
                            <div className={(errorComplete || errorInvalid) ? "input-login error" :"input-login normal"}>
                                <input type={passwordShown ? "text" : "password"} className="input-place" onChange={e => setPassword(e.target.value)} placeholder="atleast 8 caracters"></input>
                                <FontAwesomeIcon onClick={togglePasswordVisiblity} icon={passwordShown ? faEye:faEyeSlash}/>
                            </div>
                        </div>  
                            {errorComplete ? <p className="input-error-text">Complete los campos</p> : 
                            errorInvalid && <p className="input-error-text">Introduzca datos validos</p>}
                        <button className={errorComplete || errorInvalid ? "btn-login-input active":"btn-login-input inactive"} onClick={()=>checkUser()}>
                            Log In
                        </button>
                        {//<button onClick={pushToDatabase}/>
                        }
                            
                    </form>
                    
                </div>

            </div>
            <div className="cont-login-ilustrator">
                <img alt="" src={medical_ilustrator} className="img-login-ilustrator"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setMedicUserAction
}

export default connect(null,mapDispatchToProps)(Login)