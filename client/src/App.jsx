import { useState, useContext, useEffect } from "react";
import Home from "./components/Home.jsx";
import Campgrounds from "./components/Campgrounds.jsx";
import NewCampground from "./components/NewCampground.jsx";
import EditCampground from "./components/EditCampground.jsx";
import ShowCampground from "./components/ShowCampground.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Error from "./components/Error.jsx";
import CustomNav from "./components/CustomNav.jsx";
import { UserContext } from "./UserContext.js";
import { ToastContainer, toast } from 'react-toastify';
import "./App.css";
import {
  Redirect,
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
library.add(faSun);


function App() {
  const contextHook = useState(useContext(UserContext));
  const location = useLocation();
  
  const user = window.localStorage.getItem('user');
  console.log("From app", contextHook[0], user);
  
  //Tyler McGinnis' protected route component
  function PrivateRoute({ children, ...rest }) {
    console.log("Form privateRoute", user);
    return (
      <Route {...rest} render={({ location }) => {
        return user.length > 0 
          ? children
          : <Redirect to={{
              pathname: '/login',
              state: { from: 'unauthorized' }
            }} />
      }} />
    )
  }

  return (
    
    <UserContext.Provider value={contextHook}>
      <ToastContainer />
      <div className="App">
        <CustomNav />
        <Switch>
          <PrivateRoute exact path="/campgrounds/:id/edit">
            <EditCampground />
          </PrivateRoute>

          <PrivateRoute exact path="/campgrounds/new">
            <NewCampground />
          </PrivateRoute>

          <Route exact path="/campgrounds/:id">
            <ShowCampground />
          </Route>

          <Route exact path="/campgrounds" >
            <Campgrounds />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="*">
            <Error />
          </Route>
          
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
