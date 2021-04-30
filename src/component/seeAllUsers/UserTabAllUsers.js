import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom';
import './UserTabAllUsers.css'
import { ButtonGoBack } from './ButtonGoBack'
import { ItemUser } from '../ItemUser/ItemUser';
import { SearchTab } from './searchTab/SearchTab';
import ModalPopOverEliminate from '../modals/ModalPopOverEliminate'
import {Menu,MenuItem,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {getFirestore} from '../../firebase'
import { ButtonRefresh } from './ButtonRefresh'
import { MySnackbar } from '../mySnackBar/MySnackbar';



const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

export const UserTabAllUsers = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [userList,setUserList] = useState([])
    const [images,setImageList] =useState([])
    const [user, setUser] = React.useState("");
    const [openSnackBar,setOpenSnackBar] = useState(false)

    const history = useHistory();
    const switchToProfle = () => history.push(`/profile/${user.id}`);
  
    const handleClick = (event,item) => {
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
        setOpenSnackBar(!openSnackBar)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };



const handleSearch = (e,title) => {
        title === "" ? handleRefresh() :
        title = title.toUpperCase()
        setUserList(userList.filter((item=>item.id.toUpperCase().includes(title)||
                                    item.name.toUpperCase().includes(title)||
                                    item.cancer.toUpperCase().includes(title))))
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
    }
    // Eliminar


  const handleEliminate = () =>{
    const db = getFirestore()
    db.collection("users").doc(`${user.id}`).delete().then(() => {
      console.log("Document successfully deleted!");
    })
    handleRefresh()
    setOpenModal(false);
    handleOpensnackBar()
  }


    const i = [1,2,3,4,5,6,7,8,9]

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                                (userList.length > 0) && userList.map((item,key) => <ItemUser image={images.find(element =>element.id==item.avatar)} key={key} user={item} type="seeAllUsers" handleClick={handleClick} />)
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
                                <MenuItem className="menu-item-eliminar-profile" onClick={handleCloseAndOpenModal} >ELIMINAR</MenuItem>
                            </Menu>
                            <ModalPopOverEliminate
                                id={user.id} // Numero de paciente, lo settea cunado apretas el boton al lado del nombre
                                displayModal={openModal}
                                closeModal={handleCloseModal}
                                handleEliminate={handleEliminate}
                            />     

                        </tbody>
                    </table>
                    {userList&& <button className="userall-btn-load-more">Cargar mas</button>}
                </div>
                <MySnackbar
                        severity="success"
                        message="Usuario eliminado con exito!"
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={handleCloseSnackBar}
                />
            </div>
        </div>
    )
}