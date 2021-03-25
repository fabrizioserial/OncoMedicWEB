import React from 'react'
import '../login/Login.css'
import medical_ilustrator from '../../img/medical_ilustration.png'
import { Link } from 'react-router-dom'

export const Login = () => {
    return(
        <div className="cont-login-container">
            <div className="cont-login-backlogin">
                <div className="cont-login-cont-ev">
                    <div className="login-text-cont">
                        <p className="text-login-login">Log In</p>
                        <p className="text-login-punto">.</p>
                    </div>
                    <form>
                        <div>
                            <p className="text-login-input">Ingresar direccion de email</p>
                            <input className="input-login" placeholder="name@example.com"></input>
                        </div>
                        <div style={{marginTop:"40px"}}>
                            <p className="text-login-input">Ingresar direccion de email</p>
                            <input className="input-login" placeholder="atleast 8 caracters"></input>
                        </div>  
                        <Link to="/home" className="">
                            <button className="btn-login-input" >
                                Log In
                            </button>
                            </Link>
                    </form>
                    
                </div>

            </div>
            <div className="cont-login-ilustrator">
                <img src={medical_ilustrator} className="img-login-ilustrator"/>
            </div>
        </div>
    )
}