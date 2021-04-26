import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';
import { UserContext } from '../UserContext.js';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Campgrounds() {

  let history = useHistory();
  let location = useLocation();
  let [isDataLoaded, setDataLoaded] = useState('false');
  const [user, setUser] = useContext(UserContext);
  //console.log('From campgrounds', user, setUser);

  const [campgroundState, setCampgroundState] = useState([]);

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch('http://localhost:5000/campgrounds', {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Credentials': true
          }
        });
        const json = await response.json();
        setCampgroundState(json);
      } catch (error) {}
    }
    if (campgroundState.length === 0) {
      fetchData();
      setDataLoaded(true);
    }  
  }, [campgroundState, isDataLoaded]);

  useEffect(() => {
    setDataLoaded(false);
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
    <div className="Campgrounds">
      <ToastContainer />
      <h1>Campgrounds!</h1>
      { isDataLoaded ? (
        <>
        { campgroundState.map((camp) => (
          <Campground
            key={camp.id}
            campground={camp}
          />))}
        </>
        ) : (<Spinner animation="border" />)
      }
    </div>
  );
}


