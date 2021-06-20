import {SET_MEDIC_USER, USER_LOGOUT} from '../actions/loginAction.js'


const default_user ={
    name:"",
    email:"",
    id:"",
    admin:""
}

const user_data = (state=default_user , action) =>{
    switch (action.type) {
        case SET_MEDIC_USER:{
            return{
                name : action.payload.name,
                email: action.payload.email,
                id: action.payload.id,
                admin: action.payload.admin
            }
        }
        case USER_LOGOUT:{
            return{
                    name:"",
                    email:"",
                    id:"",
                    admin:""
            }
        }
        
        default: return default_user;
    }
}

export default user_data