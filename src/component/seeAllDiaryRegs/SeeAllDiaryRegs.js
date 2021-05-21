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

const SeeAllDiaryRegs = ({medicData}) =>{
    const {id} = useParams()
    const [userNotFound,setUserNotFound] = useState(false)
    const [regList,setRegsList] = useState([])
    const [events,setEvents] = useState([])
    const [openModalDiario, setOpenModalDiario] = useState(false);
    const [modalDate, setModalDate] = useState("");
    const [regunique,setUnicReg] = useState([])
    const [startDate,setStartDate] = useState('')
    const [color,setColor] = useState('')

    const returnEmoji = (mood)=>{
        if(mood===10){
            return '😀'
        }else if(mood>=7){
            return '🙂'
        }else if(mood>=4){
            return '😐'
        }else if(mood>=2){
            return '🙁'
        }else{
            return '😔'
        }
    }

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
        }
    },[id])

    useEffect(()=>{
        let eventList = regList.map(item => {
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

    function formatedDate (date) {
        var dateComponent = moment(date).format('YYYY-MM-DD');
        return dateComponent
    }

    const handleClick = (eventInfo) => {
        setModalDate(eventInfo.event.start)
        var found = regList.find(function (element) {
            var fecha = Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(element.date.toDate())
            var hoy = Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(eventInfo.event.start)
            return  fecha===(hoy);
        });
        setUnicReg(found)
        setOpenModalDiario(true)
    }

    function handleCloseDiario(){
        setOpenModalDiario(false);
      }
    
      
    return (
        <>
            <div className="userall-cont-background">
                <ButtonGoBack id={id} type="allUsers" text="VOLVER ATRAS" color="purple"/>
                <FullCalendar
                    buttonText={{
                        today:"Hoy"
                    }} 
                    eventSources= {[events]}
                    locale= 'es'
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    eventClick={handleClick}
                />
            </div>
            <ModalPopOverSeeDiaryReg  
                Date={modalDate}
                id={regunique}
                displayModal={openModalDiario}
                closeModal={handleCloseDiario}
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
