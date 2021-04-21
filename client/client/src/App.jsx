import { useState, useContext } from 'react';
import Home from './components/Home.jsx';
import Campgrounds from './components/Campgrounds.jsx';
import NewCampground from './components/NewCampground.jsx';
import EditCampground from './components/EditCampground.jsx';
import ShowCampground from './components/ShowCampground.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import CustomNav from './components/CustomNav.jsx';
import { UserContext } from './UserContext.js';
import './App.css';
import { Route, Router, Switch } from "react-router-dom";

function App() {

  //const user = useContext(UserContext);
  const contextHook = useState(null);

  //console.log("From app", user, setUser)

  return (
    <UserContext.Provider value = {contextHook}>
      <div className="App">
          <CustomNav />
          <Switch>

            <Route path="/campgrounds/:id/edit">
              <EditCampground />
            </Route>

            <Route path="/campgrounds/new">
              <NewCampground />
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

            <Route path="/logout">
              <Logout />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
      </div>
    </UserContext.Provider>
  );
}


export default App;
