export const SET_MEDIC_USER = "SET_MEDIC_USER";

export const setMedicUserAction = (userData) =>{
    console.log(userData)
    return{
        type: SET_MEDIC_USER,
        payload: userData
    }
}


