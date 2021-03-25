import React from 'react'
import '../home/Home.css'
import { ButtonHome } from './buttonsHome/ButtonHome'
import ModalPopOver from './modals/ModalPopOver'
import  {UserTabHome}  from './usertabhome/UserTabHome'
import { Component } from 'react';
import { TabHey } from './tabhey/TabHey';



export class Home extends Component {

    state = {
        modal: false
     }
      
     selectModal = (info) => {
       this.setState({modal: !this.state.modal}) // true/false toggle
     }

     render(){
        return(
                <div className="home-cont-background">
                    
                    <TabHey name={"RICARDO"}/>
                        
                        <div className="home-cont-buttons">
                        
                            <ButtonHome text="REGISTRAR NUEVO PACIENTE" color="purple" onClick={this.selectModal }></ButtonHome>
                            <ModalPopOver 
                                displayModal={this.state.modal}
                                closeModal={this.selectModal}
                            />
                            <ButtonHome text="VER TODOS LOS PACIENTES" color="blue" link="seeAllUsers"></ButtonHome>
                            <ButtonHome text="VER ULTIMOS PACIENTES CON SINTOMAS" color="lightblue" link="seeAllUsers"></ButtonHome>
                        </div>
                        
                        <div>
                            <UserTabHome/>
                        </div>
                </div>
            )
    }
} 
