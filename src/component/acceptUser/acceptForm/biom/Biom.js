import React, { useEffect, useState } from 'react'
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2'

export const Biom = ({index,handleElimIndex,handleChangeBio,propbio,propeval,array}) => {
    const [bio,setBio] = useState(propbio)
    const [evaluation,setEvaluation] = useState(propeval)

    useEffect(()=>{
        setBio(propbio)
    },[propbio])


    useEffect(()=>{
        setEvaluation(propeval)
    },[propeval])


    return (
        <div className="af-input-line">
                    <div style={{flex: '0.7 1'}} className="af-input-cont flex50" >
                        <p className="af-input-text">Biomarcador</p>
                        <div  className="select">
                            <select name="bio" value={bio} onChange={event=>handleChangeBio(index,event)}  id="standard-select">
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
                                <select name="evaluation" value={evaluation} onChange={event=>handleChangeBio(index,event)} id="standard-select">
                                    <option value="No evaluada">No evaluada</option>
                                    <option value="Positiva">Positiva</option>
                                    <option value="Negativa">Negativa</option>
                                </select>
                            </div>
                    </div>
                    {array.length>1 ?
                    <div onClick={()=>handleElimIndex(index)} style={{flex: '0 1',marginLeft: '20px',cursor: 'pointer'}} className="af-input-cont flex50" >
                            <div className="af-input theper">
                                <UseAnimations animation={trash2} size={26} strokeColor='red' />
                            </div>
                    </div>:null}
        </div>
    )
}
