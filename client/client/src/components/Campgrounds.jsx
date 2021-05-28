import React, { useEffect, useState, useContext, forwardRef } from 'react';
import { useHistory, useLocation } from "react-router-dom"; 
import Campground from './Campground.jsx';
import MapboxGLMap from './MapboxGLMap.jsx';
import { UserContext } from '../UserContext.js';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Campgrounds.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Campgrounds() {

  const GUTTER_SIZE = 25;
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

        // campList = campgroundState.map((camp) => (
        //   <Campground
        //     key={camp.id}
        //     campground={camp}
        //   />  
        // ));
      } catch (error) {}
    };

    if (campgroundState.length === 0) {
      //fetchData().then(() => setDataLoaded(true));
      fetchData();
    }  
    //TODO: check if this is correct way to load data with useEffect
    // if (isDataLoaded) {
    //   campList = campgroundState.map((camp) => (
    //     <Campground
    //       key={camp.id}
    //       campground={camp}
    //     />  
    //   ));

    // campList = campgroundState.map((camp) => (
    //   <Campground
    //     key={camp.id}
    //     campground={camp}
    //   />  
    // ));
    //console.log("CAMPLIST", campList);
    console.log("CAMPGROUND STATE", campgroundState);
    
  // }, [campgroundState, isDataLoaded]);
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

  //{campgroundState[index].title}
  const Row = ({ index, style }) => {
    // /console.log(data[index]);
    //console.log(campgroundState[index]);

    return (
     
      <div className="virtualized-campground">
        <Campground
          key={campgroundState[index].id}
          campground={campgroundState[index]}
        />
      </div>

    )
  };

  const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + GUTTER_SIZE * 2}px`,
        padding: '10px'
      }}
      {...rest}
    />
  ));

  return (
    <>
      <div className="campgrounds">
        <ToastContainer />        
        { isDataLoaded ? (
          <>
            <MapboxGLMap campgrounds={campgroundState} />
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="list"
                  height={height}
                  itemCount={campgroundState.length}
                  itemSize={50}
                  width={width}
                  innerElementType={innerElementType}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
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