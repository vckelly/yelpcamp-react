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
import { faSun } from '@fortawesome/free-solid-svg-icons';
library.add(faSun);



function App() {
  const contextHook = useState(useContext(UserContext));
  const [newUserValue, updateUserValue] = useState(null);
  const location = useLocation();
  

  useEffect(() => {
    updateUserValue(sessionStorage.getItem('user'))
  }, [newUserValue])
 
  
  //Tyler McGinnis' protected route component
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) => {
        console.log("from private route", newUserValue, newUserValue !== null)
        return newUserValue !== null ? children
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
        <CustomNav user={newUserValue}
                   updateUserValue={updateUserValue} />
        <Switch>
          <PrivateRoute exact path="/campgrounds/:id/edit">
            <EditCampground />
          </PrivateRoute>

          <PrivateRoute exact path="/campgrounds/new">
            <NewCampground />
          </PrivateRoute>

          <Route exact path="/campgrounds/:id">
            <ShowCampground user={newUserValue}/>
          </Route>

          <Route exact path="/campgrounds" >
            <Campgrounds />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login updateUserValue={updateUserValue} />
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
