import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom';
import './UserTabAllUsers.css'
import { ButtonGoBack } from './ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import { SearchTab } from './searchTab/SearchTab';
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'
import {Menu,MenuItem} from '@material-ui/core'
import {getFirestore} from '../../firebase'
import { ButtonRefresh } from './ButtonRefresh'
import { MySnackbar } from '../mySnackBar/MySnackbar';
import { connect } from 'react-redux'
import { Skeleton } from '@material-ui/lab';

const UserTabAllUsers = ({medicData}) => {

    const [medic,setMedic] = useState(medicData)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [userList,setUserList] = useState([])
    const [inactiveUserList,setInactiveUserList] = useState([])
    const [showedUserList,setShowedUserList] = useState([])
    const [inactiveShowedUserList,setInactiveShowedUserList] = useState([])
    const [images,setImageList] =useState([])
    const [user, setUser] = React.useState("");
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [severity,setSeverity] = useState("")
    const [message,setMessage] = useState("")
    const [bool,setBool] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [reTitle,setRetitle] = useState(false)
    const [loading,setLoading] = useState(true)



    const history = useHistory();
    const switchToProfle = () => history.push(`/profile/${user.id}`);
  
    const handleClick = (event,item,status) => {
        status==="Activo" ? setBool(true):setBool(false)
        setUser(item)
        setAnchorEl(event.currentTarget);
    }; 
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    function handleClose(){
      setAnchorEl(null);
    }
  
    function handleCloseAndOpenModal(){
      setOpenModal(true);
      setAnchorEl(null);
    }

    // Snack bar

    const handleOpensnackBar = () =>{
        setSeverity("success")
        setMessage("Usuario eliminado con exito!")
        setOpenSnackBar(!openSnackBar)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleWarnBar = (warnTitle) => {
        setSeverity("error")
        setMessage(warnTitle)
        setOpenSnackBar(!openSnackBar)
    }

    const handleElCat = () => {
       setShowedUserList(userList)
       setInactiveShowedUserList(inactiveUserList)
    }

    const handleSearch = (e,hash) => {
        if(hash.length===0) { handleRefresh()} else {
        setRetitle(!reTitle)
        
        hash.map((selected)=>{
            switch (selected.selected){
                case "ACTIVOS":
                    setInactiveShowedUserList([])
                    return
                case "INACTIVOS":
                    setShowedUserList([])
                    return
                case "N PACIENTE":
                    setShowedUserList(showedUserList.filter((item=>item.id.toUpperCase().includes(selected.title.toUpperCase()))));
                    setInactiveShowedUserList(inactiveShowedUserList.filter((item=>item.id.toUpperCase().includes(selected.title.toUpperCase()))));
                    return
                case "NOMBRE":
                    setShowedUserList(showedUserList.filter((item=>item.name.toUpperCase().includes(selected.title.toUpperCase()))));   
                    setInactiveShowedUserList(inactiveShowedUserList.filter((item=>item.name.toUpperCase().includes(selected.title.toUpperCase()))));   
                    return
                case "CANCER":
                    setShowedUserList(showedUserList.filter((item=>item.cancer.toUpperCase().includes(selected.title.toUpperCase()))));  
                    setInactiveShowedUserList(inactiveShowedUserList.filter((item=>item.cancer.toUpperCase().includes(selected.title.toUpperCase()))));  
                    return
                default:
                    return;
            }
        })}
        

    }
    

    useEffect(()=>{
        setShowedUserList(userList)
        setInactiveShowedUserList(inactiveUserList)
    },[userList,inactiveUserList])

    const handleRefresh=()=>{
        const db = getFirestore()

        const itemCollectionAvatar = db.collection("avatars")
        
        itemCollectionAvatar.get().then((querySnapshot) => {
            
            let avatars = querySnapshot.docs.map(doc => {
                    return(
                        {...doc.data()}
                        )
                    }
                )
            setImageList(avatars)
        })
        setShowedUserList(userList)
        setInactiveShowedUserList(inactiveUserList)
        setRefresh(true)
    }

    useEffect(()=>{
        setRefresh(false)
    },[refresh])
    // Eliminar


  const handleEliminate = () =>{
    const db = getFirestore()
    const thisUser = db.collection("users").doc(`${user.id}`)
    thisUser.update({
      status:"Inactivo",
    })
    handleRefresh()
    setOpenModal(false);
    handleOpensnackBar()
  }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(()=>{
        const db = getFirestore()
        const usersActive = db.collection('users').where("status","==","Activo").where("medic","==",medicData.id)
        usersActive.get().then((querySnapshot)=>{
            let activeuser = querySnapshot.docs.map(doc =>{
                return(
                    {
                        docid:doc.id,...doc.data()
                    }
                )
            })
            setUserList(activeuser)
        })

        const usersInactive = db.collection('users').where("status","==","Inactivo").where("medic","==",medicData.id)
        usersInactive.get().then((querySnapshot)=>{
            let inactiveUSer = querySnapshot.docs.map(doc =>{
                return(
                    {
                        id:doc.id,...doc.data()
                    }
                )
            })
            setInactiveUserList(inactiveUSer)
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
        })

        startTimer();

    },[medicData])

    const startTimer = () =>{
        setTimeout(function(){
            setLoading(false)
        }.bind(this),1000)
    }

    useEffect(()=>{
        setMedic(medicData)
      },[medicData, setMedic])

    return(
        <div className="userall-cont-background">

            <div className="userall-head">
                <ButtonGoBack text="VOLVER AL INICIO" color="purple"/>
                <ButtonRefresh handleClick={handleRefresh} text="VOLVER AL INICIO" color="purple"/>
            </div>

            <div className="userall-cont-cont">
                <SearchTab elCAt={handleElCat} warnBar={handleWarnBar} reTitle={reTitle} refresh={refresh} categories={["N PACIENTE","NOMBRE","CANCER","ACTIVOS","INACTIVOS"]} handleClick={handleSearch}/>


            {loading ?
                <Skeleton className="userall-cont-info-allUsers" variant="rect" animation="wave" width={"81.5vw"} height={"37vw"} />
            :
                <div className="userall-cont-info-allUsers">
                    <table class="userall-big-table">
                        <thead className="userall-thead-allUsers">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">N PACIENTE</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">TIPO DE CANCER</th>
                            <th scope="col">ESTADO</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (showedUserList.length > 0) && showedUserList.map((item,key) => <ItemUser image={images.find(element =>element.id===item.avatar)} key={key} user={item} type="seeAllUsers" handleClick={handleClick} />)
                            }

                            {
                                
                                (inactiveShowedUserList.length > 0) && inactiveShowedUserList.map((item,key) => <ItemUser image={images.find(element =>element.id===item.avatar)} key={key} user={item} type="seeAllUsers" handleClick={handleClick} />)
                            }
                            <Menu className="menu-see-all-users"
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                                }}
                                transformOrigin={{
                                vertical: 'left',
                                horizontal: 'left',
                                }}>
                                <MenuItem onClick={()=>switchToProfle()}>VER PERFIL</MenuItem>
                                <MenuItem onClick={handleClose}>VER SINTOMAS</MenuItem>
                                <MenuItem onClick={handleClose}>VER REGISTRO DIARIO</MenuItem>
                                {bool && <MenuItem className="menu-item-eliminar-profile" onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>}
                            </Menu>
                            <ModalPopOverEliminate
                                id={user.id} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                                displayModal={openModal}
                                closeModal={handleCloseModal}
                                handleEliminate={handleEliminate}
                            />     

                        </tbody>
                    </table>
                </div>}
                <MySnackbar
                        severity={severity}
                        message={message}
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={handleCloseSnackBar}
                />
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        medicData: state.user_data
    }
}

export default connect(mapStateToProps)(UserTabAllUsers)