import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer.js';

const store = createStore(rootReducer)

store.subscribe(()=>{
    console.log("Cambio de estado",store.getState())
})

export default store