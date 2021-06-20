import {combineReducers} from 'redux'
import user_data from './registerReducer.js'
import storage from 'redux-persist/lib/storage'


const appReducer = combineReducers({
    user_data
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root')

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export default rootReducer
