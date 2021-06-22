import React,{useEffect,useState} from 'react'
import './SeeAllDiaryRegs.css'
import {getFirestore} from '../../firebase'
import { connect } from 'react-redux'
import {useParams} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import ModalPopOverSeeDiaryReg from '../modals/ModalPopOverSeeDiaryReg';
import { ButtonGoBack } from '../seeAllUsers/ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser'
import { SearchTab } from '../seeAllUsers/searchTab/SearchTab'
import { MySnackbar } from '../mySnackBar/MySnackbar'

const SeeAllDiaryRegs = ({medicData}) =>{
    const {id} = useParams()
    const [userNotFound,setUserNotFound] = useState(false)
    const [user,setUser] = useState('')
    const [regList,setRegsList] = useState([])
    const [showedRegList,setShowedRegList] = useState([])
    const [events,setEvents] = useState([])
    const [openModalDiario, setOpenModalDiario] = useState(false);
    const [modalDate, setModalDate] = useState("");
    const [regunique,setUnicReg] = useState([])
    const [color,setColor] = useState('')
    const [calendar,setCalendar] = useState(true)
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")
    const [reTitle,setRetitle] = useState(false)
    const [refresh,setRefresh] = useState(false)


    useEffect(()=>{
        if(id){
            setUserNotFound(false)
            const db = getFirestore()
            const itemCollection = db.collection("diaryReg")
                        
            itemCollection.onSnapshot((querySnapshot) => {
            
                let regList = querySnapshot.docs.map(doc => {
                        return(
                                doc.data().id === id && doc.data()
                            )
                        }
                    )
                setRegsList(regList.filter(item => item !== false))
            })

            db.collection("users").doc(id)
            
            itemCollection.get().then((doc) => {
                if (doc.exists) {
                    let userFound ={id:doc.id,...doc.data()}
                    console.log("El usuario encontrado es: ",userFound)
                    setUser(userFound)
                } else {
                    setUserNotFound(true)
                }
            }).catch((error) => {
                console.log("Error getting user:", error);
            });

        }
    },[id])

    useEffect(()=>{
        setRegsList(regList.sort(function (a, b) {
          if (b.date > a.date) {
              return 1;
          }
          if (b.date < a.date) {
              return -1;
          }
          // a must be equal to b
          return 0;
          }))
      },[regList])

    useEffect(()=>{
        let eventList = regList.map((item,index) => {
            (formatedDate(item.date.toDate()))===(formatedDate(new Date())) ? setColor(null):setColor("lightgreen")
            return (
                {
                title : '✓',
                display : 'background',
                backgroundColor: {color},
                start:(formatedDate(item.date.toDate()))}
            )
        })
        setEvents(eventList)
    },[regList])



    useEffect (()=>{
        setShowedRegList(regList)
        {console.log("Reglist",regList)}
    },[regList])

    function formatedDate (date) {
        var dateComponent = moment(date).format('YYYY-MM-DD');
        return dateComponent
    }

    function otherformatedDate (date) {
        var dateComponent = moment(date).format('DD-MM-YYYY');
        return dateComponent
    }



    function handleSearch(e,hash){
        
        if(hash.length===0) { handleRefresh()} else {
        setRetitle(!reTitle)
        hash.map((selected)=>{
            console.log('tit',selected.title,showedRegList)
            switch (selected.selected){
                case "FECHA":
                    return setShowedRegList(showedRegList.filter((item=>
                        formatedDate(item.date.toDate()) >= (formatedDate(selected.dateStart))
                        && formatedDate(item.date.toDate()) <= (formatedDate(selected.dateEnd)))));
                case "ANIMO":
                    return setShowedRegList(showedRegList.filter((item=>item.mood==(selected.title))));  
                case "DOLOR":
                    return setShowedRegList(showedRegList.filter((item=>item.sad==(selected.title)))); 
                default:
                    return handleWarnBar() 
            }
         })} 
    }
    const handleRefresh=()=>{
        setShowedRegList(regList)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };


    const handleWarnBar = () => {
        setSeverity("error")
        setMessage("Por favor seleccione una categoria")
        setOpenSnackBar(!openSnackBar)
    }

    const handleElCat = (name) => {
        setShowedRegList(regList)
    }

    const handleClick = (eventInfo,item) => {
        if (eventInfo!=="no") {
            setModalDate(eventInfo.event.start)
            var found = regList.find(function (element) {
                var fecha = Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(element.date.toDate())
                var hoy = Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(eventInfo.event.start)
                return  fecha===(hoy);
        });} else {
            setModalDate(item.date.toDate())
            var found = item
        }
        setUnicReg(found)
        setOpenModalDiario(true)
    }

    function handleCloseDiario(){
        setOpenModalDiario(false);
    }
      
    return (
        <>
            <div className="userall-cont-background">
                <div className="userall-top-btns">
                    <ButtonGoBack id={id} type="allUsers" text="VOLVER ATRAS" color="purple"/>
                    <div className="userall-final-btns">
                        <button className={`userall-final-btns-class ${calendar ? true:false}`} onClick={()=>setCalendar(true)}>Calendario</button>
                        <button className={`userall-final-btns-class ${!calendar ? true:false}`}  onClick={()=>setCalendar(false)}>Tabla</button>
                    </div>
                </div>
                {calendar ?
                <FullCalendar
                    buttonText={{
                        today:"Hoy"
                    }} 
                    eventSources= {[events]}
                    locale= 'es'
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    eventClick={handleClick}
                />:
                    <div className="userall-cont-cont">
                        <SearchTab  elCAt={handleElCat} warnBar={handleWarnBar} reTitle={reTitle} refresh={refresh}  handleClick={handleSearch} categories={["FECHA","ANIMO","DOLOR"]} />
                        <div className="userall-cont-info-allUsers">
                            {
                            regList && regList.length > 0 ?
                                <table class="userall-big-table">
                                    <thead>
                                    <tr>
                                        <th style={{paddingLeft: "5%"}} className="alldiarys-th" scope="col">FECHA</th>
                                        <th className="alldiarys-th" scope="col">ANIMO</th>
                                        <th className="alldiarys-th" scope="col">DOLOR</th>
                                        <th className="alldiarys-th" scope="col">HAMBRE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        (showedRegList.length > 0) && showedRegList.map((item,key) => <ItemUser handleClick={handleClick} key={key} type="allRegs" daily={item}/>)
                                    }
                                    </tbody>
                                </table>
                            :
                            <div className="patiens-error-cont">
                                <img className="patients-error" alt="" src="https://firebasestorage.googleapis.com/v0/b/oncoback.appspot.com/o/images%2FdataNotFound.png?alt=media&token=6678405a-2133-4f49-8bd9-bd2f348b1962"/>
                                <p style={{fontSize: "1.3rem"}}>No se encontraron sintomas</p>
                            </div>
                            }
                        </div>

                    </div>
                }
            </div>
            <ModalPopOverSeeDiaryReg  
                Date={modalDate}
                id={regunique}
                displayModal={openModalDiario}
                closeModal={handleCloseDiario}
            />

            <MySnackbar
                    severity={severity}
                    message={message}
                    openSnackBar={openSnackBar}
                    handleCloseSnackBar={handleCloseSnackBar}
                />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(SeeAllDiaryRegs)
