import React,{useState,useEffect} from 'react'
import '../login/Login.css'
import medical_ilustrator from '../../img/medical_ilustration.png'
import { getFirestore } from '../../firebase'
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { setMedicUserAction } from '../../reduxStore/actions/loginAction'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as bcrypt from 'bcryptjs'

export const Login = ({setMedicUserAction}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [medic] = useState({})
    const [loading,setLoad] = useState(false)
    const [errorComplete,setEComplete] = useState(false)
    const [errorInvalid,setEInvalid] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);

    const history = useHistory();
   

    const checkUser =  () =>{

        if(email.length > 0 && password.length >0){
            setEComplete(false)
            setEInvalid(false)
            setLoad(true)
            
            const db = getFirestore()
            const itemCollection = db.collection("medic")
            
            itemCollection.get().then((querySnapshot)=>{

                let email2 = ""
                
                querySnapshot.docs.map(doc => {
                    
                    if(doc.data().email === email){
                        bcrypt.compare(password,doc.data().password).then(ras=>{
                            console.log(ras)
                            if(ras){
                                email2 = doc.data().email
                                setMedicUserAction({id:doc.id,name:doc.data().name,email:doc.data().email,admin:doc.data().admin})
                                history.push('/home')   
                                return 1;
                            }else{
                                setError("error no data")
                            }
                        })
                    }
                    return 1;
                })
                if(email2 === ""){
                    setError("error2")
                }
                setLoad(false)

            }).catch(e=>{
                setLoad(false)
            })
            
        }else if(email.length === 0 || password.length === 0){
            setError("error")
        } 

     
    }


    const setError = (type) =>{
        type === "error" ? setEComplete(true):setEInvalid(true)
    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    


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
                        <p /*onClick={pushToDatabase}*/ className="text-login-punto">.</p>
                    </div>
                    <form>
                        <div>
                            <p className="text-login-input">Ingresar direccion de email</p>
                            <input type="email" className={(errorComplete || errorInvalid)  ? "input-login error" :"input-login normal"} onChange={e => setEmail(e.target.value)} placeholder="nombre@ejemplo.com"></input>
                        </div>
                        <div style={{marginTop:"40px"}}>
                            <p className="text-login-input">Ingresar constraseña</p>
                            <div className={(errorComplete || errorInvalid) ? "input-login error" :"input-login normal"}>
                                <input type={passwordShown ? "text" : "password"} className="input-place" onChange={e => setPassword(e.target.value)} placeholder="Al menos 8 caracteres"></input>
                                <FontAwesomeIcon onClick={togglePasswordVisiblity} icon={passwordShown ? faEye:faEyeSlash}/>
                            </div>
                        </div>  
                            {errorComplete ? <p className="input-error-text">Complete los campos</p> : 
                            errorInvalid && <p className="input-error-text">Introduzca datos validos</p>}
                        <Button id="Btnlogin" color="primary" className={errorComplete || errorInvalid ? "btn-login-input active":"btn-login-input inactive"} onClick={checkUser}>
                            Log In
                        </Button>
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