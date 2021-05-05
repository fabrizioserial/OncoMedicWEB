import Home from '../src/component/home/Home'
import './App.css';
import Login  from './component/login/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { TimeStatus } from './component/timestatus/TimeStatus';
import UserTabAllUsers from './component/seeAllUsers/UserTabAllUsers'
import {CompleteProfile} from './component/profile/CompleteProfile.js'
import 'fontsource-roboto';
import store from './reduxStore/store';
import {Provider} from 'react-redux'
import PatientSymptoms from './component/patientSymptoms/PatientSymptoms';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SeeAllDiaryRegs from './component/seeAllDiaryRegs/SeeAllDiaryRegs';
import './Variables.css'

const App = () => {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <HashRouter>
            <Switch>
              <Route exact path="/">
                <Login/>
              </Route> 

              <HashRouter>

                <TimeStatus/>

                <Route exact path="/home">
                  <Home/>
                </Route>

                <Route exact path="/seeAllUsers">
                  <UserTabAllUsers/>
                </Route>

                <Route exact path="/seeSymptoms">
                  <PatientSymptoms/>
                </Route>

                <Route exact path="/profile/:id">
                  <CompleteProfile/>
                </Route>

                <Route exact path="/seeAllDiaryRegs/:id">
                  <SeeAllDiaryRegs/>
                </Route>


              </HashRouter>
            </Switch>
          </HashRouter>
          
        </div>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}


export default App;
