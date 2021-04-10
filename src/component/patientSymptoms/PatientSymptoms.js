import React,{useEffect,useState} from 'react'
import './PatientSymptoms.css'
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import { makeStyles } from '@material-ui/core/styles';
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import { ButtonRefresh } from '../seeAllUsers/ButtonRefresh'
import { SearchTab } from '../seeAllUsers/searchTab/SearchTab';


const PatientSymptoms = ({medicData}) =>{

    const [medic,setMedic] = useState(medicData)
    const [userList,setUserList] = useState([])
    const [symptomsList,setSymptomsList] = useState([])
    const [symptomsList2,setSymptomsList2] = useState([])
    const [images,setImageList] =useState([])

    useEffect(()=>{
        
        console.log("DB READING")
        const db = getFirestore()
        const itemCollection = db.collection("users").where("medic","==",medicData.id)
        itemCollection.onSnapshot((querySnapshot) => {
            
            let userlista = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setUserList(userlista)
        })

        const itemCollectionAvatar = db.collection("avatars")
        
        itemCollectionAvatar.get().then((querySnapshot) => {
            
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        {...doc.data()}
                        )
                    }
                )
            setImageList(avatars)
            console.log(avatars)
        })

        const itemCollectionSymptoms = db.collection("symptoms")

        itemCollectionSymptoms.onSnapshot((querySnapshot) => {
            let symptomslista = querySnapshot.docs.map(doc => doc.data())
            setSymptomsList(symptomslista)
        })
    },[medicData])

    useEffect(()=>{
        console.log("se actualizo la lista")
    },[userList,images,medic])

    useEffect(()=>{
      console.log("medico es ",medic)
      setMedic(medicData)
    },[medicData])

    const cleanSym = () =>{
        const db = getFirestore()
        const itemCollectionSymptoms = db.collection("symptoms")
        var lista = []
        userList.map(item=> item.status == "Activo" && itemCollectionSymptoms.where("id","==",item.id).get().then((querySnapshot) => {
 
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        lista = [...lista,{name:item.id,...doc.data()}]
                        )
                    }
                )
            

            console.log("los sintoms ",lista)
            setSymptomsList2(lista)
        })) 


    }

    useEffect(()=>{
        console.log("se actualizo",symptomsList2)
    },[symptomsList2])

    useEffect(()=>{
        cleanSym()
    },[symptomsList,userList])


    const handleSearch = (e,title) => {
        title === "" ? handleRefresh() :
        title = title.toUpperCase()
        setUserList(userList.filter((item=>item.id.toUpperCase().includes(title)||
                                    item.name.toUpperCase().includes(title))))
    }

    const handleRefresh=()=>{
        const db = getFirestore()
        const itemCollection = db.collection("users")

        const usersActive = itemCollection.where("status","!=","Pendiente")
        usersActive.get().then((querySnapshot)=>{
            let activeuser = querySnapshot.docs.map(doc =>{
                return(
                    {
                        id:doc.id,...doc.data()
                    }
                )
            })
            setUserList(activeuser)
        })
    }

    useEffect(()=>{
        console.log("DB READING")
        
         const db = getFirestore()
        const itemCollection = db.collection("users")

        const usersActive = itemCollection.where("status","!=","Pendiente")
        usersActive.get().then((querySnapshot)=>{
            let activeuser = querySnapshot.docs.map(doc =>{
                return(
                    {
                        id:doc.id,...doc.data()
                    }
                )
            })
            setUserList(activeuser)
        })

    },[])

    return(
        <div className="userall-cont-background">

            <div className="userall-head">
                <ButtonGoBack text="VOLVER AL INICIO" color="purple"/>
                <ButtonRefresh handleClick={handleRefresh} text="VOLVER AL INICIO" color="purple"/>
            </div>

            <div className="userall-cont-cont">
                <SearchTab handleClick={handleSearch}/>
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-allUsers">
                            <tr>
                            <th className="patientsymptoms-th-empty" scope="col"></th>
                            <th className="patientsymptoms-th-fecha" scope="col">FECHA</th>
                            <th className="patientsymptoms-th-avatar" scope="col"></th>
                            <th className="patientsymptoms-th-patient" scope="col">PACIENTE</th>
                            <th className="patientsymptoms-th-symptom" scope="col">SINTOMA</th>
                            <th scope="col">GRADO</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symptomsList2.length > 0 && symptomsList2.map((item,key) => <ItemUser image={images.find(element =>element.id==item.avatar)} key={key} symptom={item} type="seeSymptoms"/>)
                            }
                        </tbody>
                    </table>
                    {userList&& <button className="userall-btn-load-more">Cargar mas</button>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(PatientSymptoms)