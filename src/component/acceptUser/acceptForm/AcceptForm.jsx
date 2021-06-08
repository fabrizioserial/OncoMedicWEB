import React from 'react'
import './AcceptForm.css'
import { TopForm } from './TopForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AcceptForm = () => {
    return (
        <div className="aform-background">
            <TopForm name="Datos de usuario" topRadius={true}/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Nombre</p>
                        <input placeHolder="Introduzca nombre" className="af-input"/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Apellido</p>
                        <input placeHolder="Introduzca apellido" className="af-input"/>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-text">Email</p>
                        <input placeHolder="Introduzca direccion de email" className="af-input"/>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Género</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Numero del historial médico</p>
                        <input placeHolder="Introduzca historial médico" className="af-input"/>
                    </div>
                </div>
            </div>
            <TopForm name="Datos hospitalarios"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50" style={{marginRight:"40px"}}>
                        <p className="af-input-title">Fumar</p>
                        <p className="af-input-text">¿Fumas?</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Fumo">Fumo</option>
                                <option value="Fumaba">Fumaba</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Cantidad por día</p>
                        <input className="af-input"/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Tiempo fumado</p>
                        <input className="af-input"/>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50" >
                        <p className="af-input-title">Diabetes</p>
                        <p className="af-input-text">¿Tiene Diabetes?</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Medicamento</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-title">Otros</p>
                        <p className="af-input-text">Otros factores de riesgo</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">EPOC</option>
                                <option value="Option 2">Infarto</option>
                                <option value="Option 3">Obesidad</option>
                                <option value="Option 4">Hipertension</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="af-input-line" >
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Tumor Primario</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Histología</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Biomarcadores</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Expresiones del PDL1</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont flex50" >
                        <p className="af-input-text">Tratamiento del tumor primario</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Tratamiento preoperatorio</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                                <option value="Option 4">Option 4</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <TopForm name="Metástasis"/>
            <div className="form-container" style={{marginBottom:"40px"}}>
                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Nombre</p>
                        <input placeHolder="Introduzca nombre" className="af-input"/>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Apellido</p>
                        <input placeHolder="Introduzca apellido" className="af-input"/>
                    </div>
                </div>
                <div className="af-input-line">
                    <div className="af-input-cont">
                        <p className="af-input-text">Email</p>
                        <input placeHolder="Introduzca direccion de email" className="af-input"/>
                    </div>
                </div>

                <div className="af-input-line">
                    <div className="af-input-cont flex50">
                        <p className="af-input-text">Género</p>
                        <div className="select">
                            <select id="standard-select">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>
                    <div className="af-input-cont flex50" style={{marginLeft:"40px"}}>
                        <p className="af-input-text">Numero del historial médico</p>
                        <input placeHolder="Introduzca historial médico" className="af-input"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
