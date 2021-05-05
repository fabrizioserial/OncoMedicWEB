import {SET_MEDIC_USER} from '../actions/loginAction.js'

const default_user ={
    name:"Miguel Rizzo",
    email:"aa@aa.com",
    id:"123456",
    admin:"true"
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
        
        default: return default_user;
    }
}

export default user_data