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
import ReactApexChart from '../../../node_modules/react-apexcharts'

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
    const [serie,setSerie] = useState({})
    const [options,setOptions] = useState({})
    const [graph,setGraph] = useState(false)
  
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

        regDiarios.sort(function (a, b) {
                    if (b.date > a.date) {
                        return 1;
                    }
                    if (b.date < a.date) {
                        return -1;
                    }
                    return 0;
                    })
        console.log(regDiarios)
        let eventList = regDiarios.map((item,index) => {
            return (
                {
                x : index+1,
                y : item.mood,
                label: (otherformatedDate(item.date.toDate())),
                date: item.date.toDate()}
            )
        })
        setMood(eventList)


        let otherList = regDiarios.map((item,index) => {
            return (
                {
                x : index+1,
                y : item.sad,
                label: (otherformatedDate(item.date.toDate())),
                date: item.date.toDate()
                }
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

        if(id){
            setUserNotFound(false)
            console.log("DB READING")
            const db = getFirestore()
            const itemCollection = db.collection("users").doc(id)

            itemCollection.get().then((doc) => {
                if (doc.exists) {
                    let userFound ={docid:doc.id,...doc.data()}
                    console.log("El usuario encontrado es: ",userFound)
                    setUser(userFound)
                } else {
                    setUserNotFound(true)
                }
            }).catch((error) => {
                console.log("Error getting user:", error);
            });

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

            db.collection("symptoms").where("id","==", user.id).limit(6)
            .onSnapshot((querySnapshot) => {
                let symptomslista = querySnapshot.docs.map(doc => doc.data())
                setSymptomsList(symptomslista.sort(function (a, b) {
                    if (b.date > a.date) {
                        return 1;
                    }
                    if (b.date < a.date) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                    }))
            })

            const itemCollectionSymp = db.collection("mainSymptoms")
            itemCollectionSymp.onSnapshot((querySnapshot) => {
            
            let sympList = querySnapshot.docs.map(doc => {
                    return(
                        {docid:doc.id,...doc.data()}
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

    useEffect(()=>{
        mood.length > 0 && setGraph(true)
        console.log("el largo es ",mood)
        setSerie( [{
              name: 'Humor',
              data:  mood.map(item=>item.y)
            }, {
              name: 'Dolor',
              data: pain.map(item=>item.y)
            }])

        setOptions({
              chart: {
                height: 460,
                type: 'area',
                defaultLocale:'es',
                locales: [{
                    name: 'es',
                    options: {
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                    shortDays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                    toolbar: {
                        download: 'Descargar SVG',
                        selection: 'Seleccion',
                        selectionZoom: 'Seleccion Zoom',
                        zoomIn: 'Aumentar',
                        zoomOut: 'Disminuir',
                        pan: 'Panning',
                        reset: 'Resetear Zoom',
                    }
                    }
                }]
              },
              fill: {
                type: "gradient",
                gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.4,
                stops: [0, 90, 100]
                },
                colors:['#008FFB','#9357F7']
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth',
                colors:['#008FFB','#9357F7']
              },
              xaxis: {
                type: 'datetime',
                categories: mood.map(item=>item.date.toString()),
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: "MMM 'yy",
                        day: 'dd MMM'
                    }
                }
              },
              yaxis:{
                min:0,
                max:10
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy'
                },
              },
              legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'bottom',
                horizontalAlign: 'center', 
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400,
                formatter: undefined,
                inverseOrder: false,
                width: undefined,
                height: undefined,
                tooltipHoverFormatter: undefined,
                customLegendItems: [],
                offsetX: 0,
                offsetY: 0,
                labels: {
                    colors: undefined,
                    useSeriesColors: false
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: ['#008FFB','#9357F7'],
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 0
                },
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            }
            })
    },[mood,pain])
 
    useEffect(()=>{

    },[graph])

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
                <ProfileTab id={id} handleSnackBar={handleOpensnackBar} updateDate={updateDate} image={image} user={user}/>
               {graph &&  <div className="profile-chart-cont">
                    {
                     serie && <ReactApexChart options={options} series={serie} type="area" height={450} />
                     }
                </div>}
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