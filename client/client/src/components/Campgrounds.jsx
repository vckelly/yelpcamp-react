import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../UserContext.js';

function Campgrounds() {

  let history = useHistory();
  let location = useLocation();
  let user = useContext(UserContext);
  console.log(user);

  const [campgroundState, setCampgroundState] = useState([]);

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch('http://localhost:5000/campgrounds');
        const json = await response.json();

        setCampgroundState(json)

      } catch (error) {}
    }
    if (campgroundState.length === 0) {
      fetchData();
    }
  }, [campgroundState]);

  useEffect(() => {

    if (location.state && location.state.from === 'login') {
      toast.success('Welcome Back!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }, []);

  return (
    <div className="Campground">
      <ToastContainer />
      <h1>Campgrounds!</h1>
      { campgroundState.map((camp) => (
        <Campground
          key={camp.id}
          campground={camp}
        />
      ))}
    </div>
  );
}
export default Campgrounds;

