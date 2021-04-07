import {SET_PERSONAL_INFORMATION,SET_MEDICAL_INFORMATION,SET_SMOKE_INFORMATION,SET_DBT_INFORMATION,
    SET_DBT_OPTION,SET_SMOKE_OPTION,SET_MED_OPTION} from '../actions/registerAction.js'

const default_user ={
name:"",
email:"",
gender:"",
birth:"",
medic:"",
place:"",
etnia:"",
id:"",
smoke:{
    smoke:false,
    time:"",
    qnt:"",
},
dbt:{
    dbt:false,
    med:""
},
med:{
    hip:false,
    epoc:false,
    acv:false,
    inf:false
},
avatar:""
}

const user_data = (state=default_user , action) =>{
switch (action.type) {
    case SET_PERSONAL_INFORMATION:{
        return{
            ...state,
            name : action.payload.name,
            email: action.payload.email,
            gender: action.payload.gender,
            birth: action.payload.birth
        }
    }
    case SET_MEDICAL_INFORMATION:{
        return{
            ...state,
            medic: action.payload.medic,
            place: action.payload.place,
            etnia: action.payload.etnia,
            id: action.payload.id
        }
    }
    case SET_SMOKE_INFORMATION:{
        return{
            ...state,
            smoke:{
                ...state.smoke,
                smoke: action.payload
            }
        }
    }
    case SET_DBT_INFORMATION:{
        return{
            ...state,
            dbt:{
                ...state.dbt,
                dbt: action.payload
            }
        }
    }
    case SET_DBT_OPTION:{
        return{
            ...state,
            dbt:{
                ...state.dbt,
                med: action.payload
            }
        }
    }
    case SET_SMOKE_OPTION:{
        return{
            ...state,
            smoke:{
                ...state.smoke,
                time: action.payload.time,
                qnt: action.payload.qnt,
            }
        }
    }
    case SET_MED_OPTION:{
        return{
            ...state,
            med:{
                ...state.med,
                hip: action.payload.hip,
                epoc: action.payload.epoc,
                acv: action.payload.acv,
                inf: action.payload.inf,
            }
        }
    }
    default: return default_user;
}
}

export default user_data