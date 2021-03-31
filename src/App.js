import logo from './logo.svg';
import {Home} from '../src/component/home/Home'
import './App.css';
import { Login } from './component/login/Login';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { TimeStatus } from './component/timestatus/TimeStatus';
import { UserTabAllUsers } from 'src/component/home/seeAllUsers/UserTabAllUsers.js'
import {CompleteProfile} from './component/home/profile/CompleteProfile'
import 'fontsource-roboto';
import { Component } from 'react';



const App = () => {
  return (
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

            <Route exact path="/profile">
              <CompleteProfile/>
            </Route>

            <Route exact path="/profile/:id">
              <CompleteProfile/>
            </Route>

          </HashRouter>
        </Switch>
      </HashRouter>
      
    </div>
  );
}


export default App;
