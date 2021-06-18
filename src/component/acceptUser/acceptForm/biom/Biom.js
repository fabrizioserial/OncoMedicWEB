import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { counter } from '@fortawesome/fontawesome-svg-core';

export const Biom = ({index,handleElimIndex,show,handleAddBio,propbio,propeval,array}) => {
    const [bio,setBio] = useState(propbio)
    const [evaluation,setEvaluation] = useState(propeval)

    const handleBio = (bi) =>{
        setBio(bi)
    }

    useEffect(()=>{
        setBio(propbio)
        console.log(bio)
    },[propbio])


    useEffect(()=>{
        setEvaluation(propeval)
    },[propeval])

    const handleEval = (ev) =>{
        setEvaluation(ev)
    }

    useEffect(()=>{
       handleAddBio(bio,evaluation,index)
    },[evaluation,bio])


    return (
        <div className="af-input-line">
                    <div style={{flex: '0.7 1'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Biomarcador</p>
                        <div  className="select">
                            <select value={bio} onChange={event=>handleBio(event.target.value)}  id="standard-select">
                                <option >--Seleccione una opcion--</option>
                                <option disabled={array.some(x=>x.bio.includes("1"))} value={1}>1</option>
                                <option disabled={array.some(x=>x.bio.includes("2"))} value={2}>2</option>
                                <option disabled={array.some(x=>x.bio.includes("3"))} value={3}>3</option>
                            </select>
                        </div>
                    </div>
                    <div style={{flex: '0.3 1',marginLeft: '20px'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Evaluacion</p>
                            <div className="select">
                                <select value={evaluation} onChange={event=>handleEval(event.target.value)} id="standard-select">
                                    <option value="No evaluada">No evaluada</option>
                                    <option value="Positiva">Positiva</option>
                                    <option value="Negativa">Negativa</option>
                                </select>
                            </div>
                    </div>
                    {array.length>1 ?
                    <div onClick={()=>handleElimIndex(index)} style={{flex: '0 1',marginLeft: '20px',cursor: 'pointer'}} className="af-input-cont flex50" >
                            <div className="af-input theper">
                                <FontAwesomeIcon color='red' icon={faTrash}/>
                            </div>
                    </div>:null}
        </div>
    )
}
