import { useState, useContext, useEffect } from "react";
import Home from "./components/Home.jsx";
import Campgrounds from "./components/Campgrounds.jsx";
import NewCampground from "./components/NewCampground.jsx";
import EditCampground from "./components/EditCampground.jsx";
import ShowCampground from "./components/ShowCampground.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import CustomNav from "./components/CustomNav.jsx";
import { UserContext } from "./UserContext.js";
import "./App.css";
import {
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";


function App() {
  const contextHook = useState(useContext(UserContext));
  
  useEffect(() => {
    console.log(contextHook, contextHook[0]);
    fetch("http://localhost:5000/users/logged_in", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/*",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((res) => {
      //console.log('********from logged_in fetch*******', res, contextHook)
      res.json().then((user) => {
        //console.log('user from res', user);
        contextHook[1](user);
      });
    });
  }, [contextHook[0].user]);

  return (
    <UserContext.Provider value={contextHook}>
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
