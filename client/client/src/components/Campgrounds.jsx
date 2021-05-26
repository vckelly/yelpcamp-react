import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';
import MapboxGLMap from './MapboxGLMap.jsx';
import { UserContext } from '../UserContext.js';
import { FixedSizeList as List } from "react-window";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Campgrounds.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Campgrounds() {

  let history = useHistory();
  let location = useLocation();
  let [isDataLoaded, setDataLoaded] = useState('false');
  const [user, setUser] = useContext(UserContext);
  
  //console.log('From campgrounds', user, setUser);

  const [campgroundState, setCampgroundState] = useState([]);

  let campList = [];


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
        setDataLoaded(true);
      } catch (error) {}
    };

    if (campgroundState.length === 0) {
      //fetchData().then(() => setDataLoaded(true));
      fetchData();
    }  
    //TODO: check if this is correct way to load data with useEffect
    if (isDataLoaded) {
      campList = campgroundState.map((camp) => (
        <Campground
          key={camp.id}
          campground={camp}
        />  
      ));

      console.log(campList);
      console.log("CAMPGROUND STATE", campgroundState);
    }
  }, [campgroundState, isDataLoaded]);

  useEffect(() => {
    setDataLoaded(false);
    if (location.state) {
      const toastObj = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };
      if (location.state.from === 'login') {
        toast.success('Welcome Back!', toastObj);
      }
      if (location.state.from === 'show') {
        toast.success('Campground successfully deleted!', toastObj);
      }
      location.state = {};
    }
  }, []);

  // const style = {
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   height: 130, /* itemSize × index */
  //   width:"100%"
  // };
  // {campList[index]}
  //{campgroundState[index].title}
  const Row = ({ index, style }) => (
    <div style={style}>
      <Campground
        key={campgroundState[index].id}
        camp={campgroundState[index]}
      />
    </div>
  );

  return (
    <>
      <div className="campgrounds">
        <ToastContainer />        
        { isDataLoaded ? (
          <>
            <MapboxGLMap campgrounds={campgroundState} />
            <List
              className="List"
              height={350}
              itemCount={campgroundState.length}
              itemSize={50}
              width={800}
            >
              {Row}
            </List>
          </>
          ) : ( <span>
                  <FontAwesomeIcon className="icon" icon="sun" size="7x" spin />
                </span>                              
              )
        }
      </div>
    </>
  );
}


// { campgroundState.map((camp) => (
//   <Campground
//     key={camp.id}
//     campground={camp}
//   />))}