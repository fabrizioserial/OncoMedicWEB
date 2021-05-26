import React,{useEffect,useState} from 'react'
import "../profile/CompleteProfile.css"
import {ButtonGoBack} from "../seeAllUsers/ButtonGoBack"
import { UsertabState } from './usertabState/UsertabState'
import { UsertabSymptoms } from '../profile/usertabSymptoms/UsertabSymptoms'
import ProfileTab from './profileTab/ProfileTab'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../firebase'
import moment from 'moment'
import { makeStyles } from "@material-ui/core/styles";
import { MySnackbar } from '../mySnackBar/MySnackbar'
import { Skeleton } from '@material-ui/lab'
import * as V from 'victory';
import { VictoryArea,VictoryChart,VictoryScatter,VictoryAxis,VictoryTooltip,VictoryVoronoiContainer,VictoryLabel } from 'victory';
import {Button,Menu,MenuItem} from '@material-ui/core'
import arrow from '../../img/arrow_down.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
    btn: {
        marginLeft: "10px"
    },
    profileTab: {
        marginTop: '25px',
        borderRight: '30px solid var(--primary)',
        borderTopRightRadius: '9px',
        borderBottomRightRadius: '9px',
    },
    squares: {
        borderRight: '30px solid var(--primary)',
        borderTopRightRadius: '9px',
        borderBottomRightRadius: '9px',
    },
    squares2: {
        borderRight: '30px solid var(--primary)',
        borderTopRightRadius: '9px',
        borderBottomRightRadius: '9px',
        marginLeft: '50px'
    }
}));

export const CompleteProfile = () => {
    const classes = useStyles();

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [symptomsList, setSymptomsList]= useState([])
    const [image, setImage] = useState("")
    const [symInfo,setSympInfo] = useState([])
    const [load,setLoad] = useState(true)
    const [userNotFound,setUserNotFound] = useState(false)
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [update,setUpdateData] = useState(false)
    const [severity,setSeverity] = useState('')
    const [message,setMessage] = useState('')
    const [regDiarios,setRegDiario] = useState([])
    const [mood,setMood] = useState([])
    const [pain,setPain] = useState([])
    const [activeSelect,setActiveSelect] = useState("Estado de Animo")
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [dateActive,setActiveDate] = useState("Ultimos 7 dias")
  
    const handleOpensnackBar = (sev,mes) =>{
        setSeverity(sev)
        setMessage(mes)
        setOpenSnackBar(!openSnackBar)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const updateDate = () =>{
        setUpdateData(!update)
    }
    const listEvents = () => {

        let eventList = regDiarios.reverse().map((item,index) => {
            return (
                {
                x : index+1,
                y : item.mood,
                label: (otherformatedDate(item.date.toDate()))}
            )
        })
        setMood(eventList)


        let otherList = regDiarios.map((item,index) => {
            return (
                {
                x : index+1,
                y : item.sad,
                label: (otherformatedDate(item.date.toDate()))}
            )
        })
        setPain(otherList)

        regDiarios.reverse()
    }

    function otherformatedDate (date) {
        var dateComponent = moment(date).format('DD/MM/YYYY');
        return dateComponent
    }

    useEffect(()=>{

    },[activeSelect])


    useEffect(()=>{

        if(id){
            setUserNotFound(false)
            console.log("DB READING")
            const db = getFirestore()
            const itemCollection = db.collection("users").doc(id)

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

            db.collection("symptoms").where("id","==", id).limit(6)
            .onSnapshot((querySnapshot) => {
                let symptomslista = querySnapshot.docs.map(doc => doc.data())
                setSymptomsList(symptomslista)
            })

            db.collection("diaryReg").where("id","==",id).limit(6)
            .onSnapshot((querySnapshot) => {
                
                let regList = querySnapshot.docs.map(doc => {
                        return(
                            {id:doc.id,...doc.data()}
                            )
                        }
                    )
                setRegDiario(regList)
            })

        }
    },[id,update])

    useEffect(()=>{
            listEvents()
    },[regDiarios])

    useEffect(()=>{
        
        if(id && user.avatar){
            
            const db = getFirestore()
            let stringAvatar = user.avatar
            const itemCollection = db.collection("avatars").doc(stringAvatar.toString())
            itemCollection.get().then((querySnapshot) => {
                let imgFound =querySnapshot.data()
                setImage(imgFound)
            })

            const itemCollectionSymp = db.collection("mainSymptoms")
            itemCollectionSymp.onSnapshot((querySnapshot) => {
            
            let sympList = querySnapshot.docs.map(doc => {
                    return(
                        {id:doc.id,...doc.data()}
                        )
                    }
                )
            setSympInfo(sympList)
            
        })

        }
        startTimer()
    },[id, user])

    const startTimer = () => {
        setTimeout(function(){
            setLoad(false)
        }.bind(this),500)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickDate = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    const handleClose2 = () => {
    setAnchorEl2(null);
    };

    const handleChange = (event) => {    setActiveSelect(event.target.textContent)
    handleClose()  }

    const handleChange2 = (event) => {    setActiveDate(event.target.textContent)
    handleClose2()  }

 

    return (
        <React.Fragment>
            { 
            load ? 
            <div className="profile-cont-background">
                    <Skeleton className={classes.btn} height={40} width={250} />
                    <Skeleton className={classes.profileTab} height={199} width={"97.5%"} />
                    <div className="two-squares-complete-profile">
                        <Skeleton className={classes.squares} height={'34vw'} width={"98%"} />
                        <Skeleton className={classes.squares2} height={'34vw'} width={"98%"} />
                    </div>
            </div>:
            (user && user.name && image)? 
            <div className="profile-cont-background">
                <div className="userall-head">
                    <ButtonGoBack text="VOLVER AL INICIO" color="purple"></ButtonGoBack>
                </div>
                <ProfileTab handleSnackBar={handleOpensnackBar} updateDate={updateDate} image={image} user={user}/>
                <div className="profile-chart-cont">
                    <div className="profile-chart-top-cont">
                        <p className="profile-chart-top-text">{activeSelect.toUpperCase()}</p>
                        <div>
                        <Button onClick={handleClickDate}>{dateActive} <FontAwesomeIcon icon={faChevronDown} className="profile-arrow"/></Button>
                        <Menu
                        style={{marginTop: "45px"}}
                            id="date"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={handleClose2}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            >
                            <MenuItem onClick={handleChange2}>Ultimos 7 dias</MenuItem>
                            <MenuItem onClick={handleChange2}>Ultimos 14 dias</MenuItem>
                            <MenuItem onClick={handleChange2}>Ultimos 30 dias</MenuItem>
                            <MenuItem onClick={handleChange2}>Ultimos 6 meses</MenuItem>
                            <MenuItem onClick={handleChange2}>Ultimos año</MenuItem>


                        </Menu>
                        <Button style={{marginLeft:"10px"}} onClick={handleClick}>{activeSelect} <FontAwesomeIcon icon={faChevronDown} className="profile-arrow"/></Button>
                        <Menu
                        style={{marginTop: "45px"}}
                            id="select"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            >
                            <MenuItem onClick={handleChange}>Estado de Animo</MenuItem>
                            <MenuItem onClick={handleChange}>Dolor</MenuItem>
                        </Menu>
                        </div>

                    </div>
                    
                    <svg style={{ height: 0 }}>
                        <defs>
                        <linearGradient id="myGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="#9357F7" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#9357F7" stopOpacity="0.05"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <div className="profile-chart-svg-cont">
                        <VictoryChart animate={{ duration: 1000 }} containerComponent={<VictoryVoronoiContainer  responsive={true} height={450}/>}height={400} width={1100}>
                            <VictoryAxis dependentAxis
                                domain={[0, 10]}
                                style={{

                                    axis: { stroke: "#e0e0e0", strokeWidth: 0 },
                                    ticks: { strokeWidth: 0 },
                                    tickLabels: {
                                    fill: "#b7b7b7",
                                    fontFamily: "inherit",
                                    fontSize: 15
                                    }
                                }}
                            />
                            <VictoryAxis  style={{axis: { stroke: "#e0e0e0", strokeWidth: 0 }, tickLabels: { fontSize:'10px', fill:"#b7b7b7"} }}   tickValues={mood.map(item=>item.label)}/>
                            <VictoryArea
                                labelComponent={<VictoryTooltip  activateData={true} style={{fontSize: '10px'}} cornerRadius={0} flyoutStyle={{ fill:"#9357F7",stroke: "transparent", strokeWidth: 0.5 }}/>}
                                style={{
                                    data: { stroke: "#9357F7",fill: "url(#myGradient)" },
                                    parent: { border: "1px solid #e8e8e8"},
                                    labels: {color: "tomato"}
                                }}
                                interpolation="natural"
                                data={activeSelect == "Estado de Animo" ? mood : pain }/>
                            <VictoryScatter
                                size={3}
                                    style={{
                                    data: {fill: "#9357F7"}
                                    }}
                                    labelComponent={<VictoryTooltip activateData={true} style={{fontSize: '10px'}} cornerRadius={0} flyoutStyle={{ fill:"#9357F7", stroke: "transparent", strokeWidth: 0.5 }}/>}
                                    data={activeSelect == "Estado de Animo" ? mood : pain }
                                />

                                
                        </VictoryChart>
                    </div>

                </div>
                <div className="two-squares-complete-profile">
                    <div className="estado-usertab-cont-background">
                        <UsertabState regDiarios={regDiarios}  user={user} type="profile" flexi={{Flex:1}}/>
                    </div>
                    <div className="sintoms-usertab-cont-background">
                        <UsertabSymptoms id={user.id} sympstoms={symptomsList} descs={symInfo} flexi={{Flex:1}}/>
                    </div>  
                </div>
            </div>
            : 
            userNotFound ?
            <div className="profile-cont-background">
                <div className="profile-not-found">
                    <img alt="" className="sintoms-img-error" src="https://www.clicktoko.com/assets/images/nodata.png"/>
                    <p>No se encontró al usuario que buscabas</p>
                </div>
            </div>:null
            }
            <MySnackbar
                severity={severity}
                message={message}
                openSnackBar={openSnackBar}
                handleCloseSnackBar={handleCloseSnackBar}
            />
        
        </React.Fragment>
        
    )
}
