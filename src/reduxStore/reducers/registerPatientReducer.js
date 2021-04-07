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
avatar:"1",
status:"Pendiente"
}
