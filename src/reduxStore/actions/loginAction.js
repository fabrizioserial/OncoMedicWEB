export const SET_MEDIC_USER = "SET_MEDIC_USER";
export const USER_LOGOUT = "USER_LOGOUT"

export const setMedicUserAction = (userData) =>{
    return{
        type: SET_MEDIC_USER,
        payload: userData
    }
}

export const setLogout = () =>{
    return{
        type: USER_LOGOUT
    }
}

