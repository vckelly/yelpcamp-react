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

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { library } from '@fortawesome/fontawesome-svg-core';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
library.add(faSun);

function App() {
  const contextHook = useState(useContext(UserContext));
  const location = useLocation();
  //const queryClient = useQueryClient();
  let authenticated = false;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    }
  });

  const { isLoading, isError, data } = useQuery('user', async () => {
      const res = await fetch("http://localhost:5000/users/logged_in", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/*",
          "Access-Control-Allow-Credentials": true,
        }
      })
      return res.json();
    }
  );

  console.log(data);

  
  // useEffect(() => {
  //   //console.log(contextHook, contextHook[0]);
  //   fetch("http://localhost:5000/users/logged_in", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       "Access-Control-Allow-Origin": "http://localhost:3000/*",
  //       "Access-Control-Allow-Credentials": true,
  //     }
  //   }).then((res) => {
  //     //console.log('********from logged_in fetch*******', res, contextHook)
  //     res.json().then((user) => {
  //       console.log('user from res', user);
  //       authenticated = user.length > 0;
  //       if (user.user !== contextHook[0].user) { 
  //         contextHook[1](user);
  //       }
  //     });
  //   });
  //   authenticated = contextHook[0].user.length > 0;
  //   console.log("AUTHENTICATED", authenticated);
  // }, [contextHook[0].user]);


  //Tyler McGinnis' protected route component
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) => {
        return authenticated === true
          ? children
          : <Redirect to={{
              pathname: '/login',
              state: { from: location }
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
