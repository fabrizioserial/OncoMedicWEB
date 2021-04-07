export const SET_PERSONAL_INFORMATION = "SET_PERSONAL_INFORMATION";

export const SET_MEDICAL_INFORMATION = "SET_MEDICAL_INFORMATION";

export const SET_REGISTER_INFORMATION = "SET_REGISTER_INFORMATION";

export const SET_SMOKE_INFORMATION = "SET_SMOKE_INFORMATION";
export const SET_SMOKE_OPTION = "SET_SMOKE_OPTION";

export const SET_DBT_INFORMATION = "SET_DBT_INFORMATION";
export const SET_DBT_OPTION = "SET_DBT_OPTION";

export const SET_MED_OPTION = "SET_MED_OPTION";

export const SET_DAILYREGISTER_INFORMATION = "SET_DAILYREGISTER_INFORMATION";
export const REGISTER_USER = "REGISTER_USER";
export const ADD_DAILYREGISTER = "ADD_DAILYREGISTER";

export const setPersonalInformationAction = (userData) =>{
    return{
        type: SET_PERSONAL_INFORMATION,
        payload: userData
    }
}

export const setMedicalInformationAction = (userDataMedical) =>{
    return{
        type: SET_MEDICAL_INFORMATION,
        payload: userDataMedical
    }
}
export const setSmokeInformationAction = (userSmoke) =>{
    return{
        type: SET_SMOKE_INFORMATION,
        payload: userSmoke
    }
}
export const setDbtInformationAction = (userDbt) =>{
    return{
        type: SET_DBT_INFORMATION,
        payload: userDbt
    }
}
export const setDbtOptionAction = (userDbtOption) =>{
    return{
        type: SET_DBT_OPTION,
        payload: userDbtOption
    }
}
export const setSmokeOptionAction = (userSmokeOption) =>{
    return{ 
        type: SET_SMOKE_OPTION,
        payload:userSmokeOption
    }

    
}
export const setMedOptionAction = (userMed) =>{

    return{
        type: SET_MED_OPTION,
        payload: userMed
    }
}
