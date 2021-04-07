import { useState } from 'react';
import Home from './components/Home.jsx';
import Campgrounds from './components/Campgrounds.jsx';
import EditCampground from './components/EditCampground.jsx';
import ShowCampground from './components/ShowCampground.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import CustomNav from './components/CustomNav.jsx';
import { UserContext } from './UserContext.js';
import './App.css';
import { Route, Switch } from "react-router-dom";

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={ user, setUser }>
        <CustomNav></CustomNav>
        <Switch>

          <Route path="/campgrounds/:id/edit">
            <EditCampground />
          </Route>

          <Route path="/campgrounds/:id">
            <ShowCampground />
          </Route>

          <Route path="/campgrounds">
            <Campgrounds />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}


export default App;
