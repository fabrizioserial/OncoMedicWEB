import Home from '../src/component/home/Home'
import './App.css';
import Login  from './component/login/Login';
import { BrowserRouter, HashRouter, Route, StaticRouter, Switch } from 'react-router-dom';
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
import AllUserSympts from './component/allUserSympts/AllUserSympts';
import { useLayoutEffect, useState } from 'react';
import sorry from './img/working.png'

const App = () => {

  const [width] = useWindowSize();

  function useWindowSize() {
      const [size, setSize] = useState([0, 0]);
      useLayoutEffect(() => {
          function updateSize() {
          setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
      }, []);
      return size;
  }

  return (
    <Provider store={store}>
    {width>910 ?
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

                <Route exact path="/userSympts/:id">
                  <AllUserSympts/>
                </Route>


              </HashRouter>
            </Switch>
          </HashRouter>
          
        </div>
      </MuiPickersUtilsProvider>
      :   
        <div className="working-cont">
        <h1 className="working-text">Estamos trabajando para usar la web en celulares, por ahora solo se puede usar desde la computadora!</h1>
        <img className="working-img" alt="" src={sorry}/>
        </div>
    }
    </Provider>
  );
}


export default App;
