export const SET_MEDIC_USER = "SET_MEDIC_USER";

export const setMedicUserAction = (userData) =>{
    return{
        type: SET_MEDIC_USER,
        payload: userData
    }
}


