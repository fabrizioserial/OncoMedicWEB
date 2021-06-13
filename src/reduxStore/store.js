import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer.js';

const store = createStore(rootReducer)

store.subscribe(()=>{

})

export default store